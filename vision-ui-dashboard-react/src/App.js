/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.

*/

import { useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";


// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Vision UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Vision UI Dashboard React routes
import routes from "routes";

// Vision UI Dashboard React contexts
import {
  useVisionUIController,
  setMiniSidenav, // keep existing ones needed
  setOpenConfigurator,
  // VVVVV IMPORT AUTH ACTIONS VVVVV
  setLoading,
  loginSuccess, // We can reuse loginSuccess to set the initial state
  logoutUser // Or use logoutUser / authError if token is invalid/missing
  // ^^^^^ IMPORT AUTH ACTIONS ^^^^^
} from "context";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

   // VVVVV ADD THIS useEffect FOR INITIAL AUTH CHECK VVVVV
   useEffect(() => {
    console.log("Checking for token on initial load...");
    setLoading(dispatch, true); // Start loading

    const token = localStorage.getItem('token');

    if (token) {
      try {
         // Decode the token
         const decoded = jwtDecode(token);
         console.log("Decoded Token:", decoded);

         // Check if token is expired (jwtDecode adds 'exp' field)
         // Date.now() is in milliseconds, decoded.exp is in seconds
         if (decoded.exp * 1000 < Date.now()) {
           console.log("Token expired.");
           // Token is expired, treat as logged out
           localStorage.removeItem('token');
           logoutUser(dispatch); // Dispatch logout action
         } else {
           console.log("Token valid, setting auth state.");
           // Token is valid, set auth state
           // Assume payload has { user: { id: '...', username: '...' } } structure
           // Adjust if your payload structure in handleLogin was different
           if (decoded.user) {
             // We need to reconstruct the payload structure expected by loginSuccess
             const payload = {
                token: token, // Pass the original token
                user: decoded.user // Pass the decoded user object
             };
             loginSuccess(dispatch, payload); // Dispatch login action
           } else {
              // Payload structure unexpected
              console.error("Token payload structure unexpected", decoded)
              logoutUser(dispatch)
           }
         }
      } catch (error) {
         // Error decoding token (it might be invalid/corrupted)
         console.error("Error decoding token:", error);
         localStorage.removeItem('token');
         logoutUser(dispatch); // Treat as logged out
      }
    } else {
      // No token found
      console.log("No token found in localStorage.");
      logoutUser(dispatch); // Ensure state is logged out
    }

    // Intentionally not setting loading to false here;
    // loginSuccess or logoutUser actions handle that within the reducer.

  }, [dispatch]); // Depend on dispatch - should not change often

  // ^^^^^ ADD THIS useEffect FOR INITIAL AUTH CHECK ^^^^^

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="info"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </VuiBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand=""
              brandName="NO MERCY UNO"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand=""
            brandName="NO MERCY UNO"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </ThemeProvider>
  );
}
