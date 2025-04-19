/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

//import AppBar from "@mui/material/AppBar";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import PropTypes from 'prop-types'; 
//import Tab from "@mui/material/Tab";
//import Tabs from "@mui/material/Tabs";
// Images
import burceMars from "assets/images/avatar-simmmple.png";
// Vision UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";
import VuiAvatar from "components/VuiAvatar";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
// Vision UI Dashboard React icons
//import { IoCube } from "react-icons/io5";
//import { IoDocument } from "react-icons/io5";
//import { IoBuild } from "react-icons/io5";
// Vision UI Dashboard React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState, useEffect } from 'react'; // Make sure useState, useEffect are imported
import axios from 'axios'; // If not already imported
import { useVisionUIController, authError } from 'context'; // Import context 

function Header({ username, email, score }) {
  //const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  //const [tabValue, setTabValue] = useState(0);

  {/* useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.lg
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
    }, [tabsOrientation]);
  */}

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <VuiBox position="relative">
      <DashboardNavbar light />
      <Card
        sx={{
          px: 3,
          mt: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              gap: "16px",
            },
            [breakpoints.up("xs")]: {
              gap: "0px",
            },
            [breakpoints.up("xl")]: {
              gap: "0px",
            },
          })}
        >
          <Grid
            item
            xs={12}
            md={1.7}
            lg={1.5}
            xl={1.2}
            xxl={0.8}
            display="flex"
            sx={({ breakpoints }) => ({
              [breakpoints.only("sm")]: {
                justifyContent: "center",
                alignItems: "center",
              },
            })}
          >
            <VuiAvatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item xs={12} md={4.3} lg={4} xl={3.8} xxl={7}>
            <VuiBox
              height="100%"
              mt={0.5}
              lineHeight={1}
              display="flex"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                [breakpoints.only("sm")]: {
                  justifyContent: "center",
                  alignItems: "center",
                },
              })}
            >
              <VuiTypography variant="lg" color="white" fontWeight="bold">
                {/* Placeholder - User Name will go here */}
                {username || "Player Username"} {/* Use prop or default */}
              </VuiTypography>
              <VuiTypography variant="button" color="text" fontWeight="regular">
                {/* Placeholder - User Email will go here */}
                {email || "player@email.com"} {/* Use prop or default */}
              </VuiTypography>
            </VuiBox>
          </Grid>
          {/* === INSERT RANK/SCORE DISPLAY GRID ITEM === */}
        <Grid item xs={12} md={6} sx={{ ml: "auto", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <VuiBox sx={{ textAlign: 'center' }}> {/* Centering */}
            {/* Display the score/rank passed via props */}
            <VuiTypography
               variant="h1" // Use a large variant, maybe adjust later
               color="primary"
               fontWeight="bold"
               sx={{
                 fontSize: "7rem !important", // Custom large font size! Adjust as needed
                 lineHeight: 1 // Adjust line height for large font
               }}
             >
               {score !== null && score !== undefined ? score : "23"} {/* Use score prop or default '-' */}
             </VuiTypography>
             <VuiTypography variant="button" color="text" fontWeight="medium" mt={1}>
               SCORE {/* Label */}
             </VuiTypography>
           </VuiBox>
         </Grid>
        {/* === END RANK/SCORE DISPLAY GRID ITEM === */}
          {/*
          <Grid item xs={12} md={6} lg={6.5} xl={6} xxl={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent", display: "flex", justifyContent: "flex-end" }}
              >
                <Tab label="OVERVIEW" icon={<IoCube color="white" size="16px" />} />
                <Tab label="TEAMS" icon={<IoDocument color="white" size="16px" />} />
                <Tab label="PROJECTS" icon={<IoBuild color="white" size="16px" />} />
              </Tabs>
            </AppBar>
          </Grid>
        */}
        </Grid>
      </Card>
    </VuiBox>
  );
}
// Add prop types below the component function
Header.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
};

Header.defaultProps = { // Add default props
  username: "Player Username",
  email: "player@email.com",
  score: null,
};

export default Header;
