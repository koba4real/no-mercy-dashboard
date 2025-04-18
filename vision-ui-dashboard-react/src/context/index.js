/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// The Vision UI Dashboard  Material main context
const VisionUI = createContext();

// Setting custom name for the context which is visible on react dev tools
VisionUI.displayName = "VisionUIContext";

// Vision UI Dashboard React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "LOGIN_SUCCESS":
    localStorage.setItem('token', action.payload.token); // Store token on login
    return {
      ...state,
      isAuthenticated: true,
      loading: false,
      user: action.payload.user,
      token: action.payload.token,
    };

    case "REGISTER_SUCCESS": // Maybe useful after registration success, before login
        return {
          ...state,
          loading: false, // Can stop loading after successful registration
        };


    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem('token'); // Remove token on error/logout
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: null,
      };

    case "USER_LOADED": // If we implement token validation later
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload, // Payload would be user object {id, username, email}
        // token might already be in state or loaded from localStorage elsewhere
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload, // Set loading true/false
      };
    // ^^^^^ ADD AUTH CASES ^^^^^
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Vision UI Dashboard React context provider
function VisionUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    isAuthenticated: false, // Is the user logged in?
    user: null,          // Stores user data (id, username, email) if logged in
    token: null,           // Stores the JWT token
    loading: true          // Are we still checking auth status on initial app load?
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  return <VisionUI.Provider value={[controller, dispatch]}>{children}</VisionUI.Provider>;
}

// Vision UI Dashboard React custom hook for using context
function useVisionUIController() {
  const context = useContext(VisionUI);

  if (!context) {
    throw new Error("useVisionUIController should be used inside the VisionUIControllerProvider.");
  }

  return context;
}

// Typechecking props for the VisionUIControllerProvider
VisionUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
// VVVVV ADD AUTH ACTION FUNCTIONS VVVVV
const loginSuccess = (dispatch, payload) => { // payload = { token, user }
dispatch({ type: "LOGIN_SUCCESS", payload });
};

const registerSuccess = (dispatch) => { // No payload needed typically
    dispatch({ type: "REGISTER_SUCCESS" });
};
const authError = (dispatch) => {dispatch({ type: "AUTH_ERROR" });};
const logoutUser = (dispatch) => {dispatch({ type: "LOGOUT" });};
const loadUser = (dispatch, user) => { // If loading user from token
  dispatch({ type: "USER_LOADED", payload: user });
};

const setLoading = (dispatch, value) => { // value = true or false
   dispatch({ type: "SET_LOADING", payload: value });
};
// ^^^^^ ADD AUTH ACTION FUNCTIONS ^^^^^

export {
  VisionUIControllerProvider,
  useVisionUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  loginSuccess,
  registerSuccess,
  authError,
  logoutUser,
  loadUser,
  setLoading,
};
