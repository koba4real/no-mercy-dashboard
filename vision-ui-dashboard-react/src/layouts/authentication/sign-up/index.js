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

import { useState } from "react";
import axios from 'axios';
import { useVisionUIController, registerSuccess, authError } from "context"; // <<< ADD THIS (also add authError)
// ... maybe import useHistory if you want to redirect to login after register ...
//import { useHistory } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signUpImage.png";

function SignUp() {
  const [rememberMe, setRememberMe] = useState(true);
  const [controller, dispatch] = useVisionUIController(); // <<< ADD THIS
  // const history = useHistory(); // <<< ADD THIS IF REDIRECTING

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
    // State for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    // State for feedback messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Optional: for loading state

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default HTML form submission behavior
    setError(''); // Clear previous errors/success messages
    setSuccess('');
    setIsLoading(true); // Indicate loading started
  
    // Basic validation (can add more complex checks later)
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false); // Stop loading
      return; // Stop the function here
    }
  
    // Prepare the data for the backend
    const config = {
      headers: {
        'Content-Type': 'application/json', // Tell backend we're sending JSON
      },
    };
    const body = JSON.stringify({ username, email, password }); // Create JSON string from state
  
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', body, config);

      // Handle Success - UPDATED
      console.log('Registration successful:', res.data);
      dispatch({ type: "REGISTER_SUCCESS" }); // Dispatch simple success action
      // Or use the action creator: registerSuccess(dispatch);

      setSuccess('Registration successful! Please log in.');
      setUsername('');
      setEmail('');
      setPassword('');
      // Optionally redirect:
      // setTimeout(() => { history.push('/authentication/sign-in'); }, 2000);

    } catch (err) {
        // Handle Errors - UPDATED
        console.error('Registration error:', err.response ? err.response.data : err.message);
        dispatch({ type: "AUTH_ERROR" }); // Dispatch error action to clear any auth state
        // Or use the action creator: authError(dispatch);

        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Registration failed. Please try again.');
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgSignIn}
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE VISION UI DASHBOARD"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            Register with
          </VuiTypography>
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderradius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaFacebook}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderradius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaApple}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderradius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaGoogle}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
          </Stack>
          <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={({ typography: { size } }) => ({ fontSize: size.lg })}
          >
            or
          </VuiTypography>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Username {/* <<< Optionally change label from "Name" to "Username" */}
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                name="username" // <<< ADD THIS (if not already there)
                placeholder="Your username..." // <<< Optionally change placeholder
                sx={({ typography: { size } }) => ({ fontSize: size.sm, })}
                value={username} // <<< ADD THIS
                onChange={(e) => { setUsername(e.target.value); setError(''); setSuccess(''); }} // <<< ADD THIS
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="email"
                name="email" // <<< ADD THIS (if not already there)
                placeholder="Your email..."
                sx={({ typography: { size } }) => ({ fontSize: size.sm, })}
                value={email} // <<< ADD THIS
                onChange={(e) => { setEmail(e.target.value); setError(''); setSuccess(''); }} // <<< ADD THIS
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Password
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="password"
                name="password" // <<< ADD THIS (if not already there)
                placeholder="Your password..."
                sx={({ typography: { size } }) => ({ fontSize: size.sm, })}
                value={password} // <<< ADD THIS
                onChange={(e) => { setPassword(e.target.value); setError(''); setSuccess(''); }} // <<< ADD THIS
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Remember me
            </VuiTypography>
          </VuiBox>

          {/* ==== INSERT FEEDBACK MESSAGES HERE ==== */}
          {/* Display Success Message */}
          {success && (
            <VuiBox mt={2} mb={2} p={1} sx={{ border: '1px solid', borderColor: palette.success.main , borderRadius: '5px', backgroundColor: 'rgba(76, 175, 80, 0.1)'}}>
              <VuiTypography variant="caption" color="success" fontWeight="medium">
                {success}
              </VuiTypography>
            </VuiBox>
          )}

          {/* Display Error Message */}
          {error && (
            <VuiBox mt={2} mb={2} p={1} sx={{ border: '1px solid', borderColor: palette.error.main, borderRadius: '5px', backgroundColor: 'rgba(244, 67, 54, 0.1)' }}>
              <VuiTypography variant="caption" color="error" fontWeight="medium">
                {error}
              </VuiTypography>
            </VuiBox>
          )}
          {/* ==== END FEEDBACK MESSAGES ==== */}
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth onClick={handleRegister} disabled={isLoading}   >
              {isLoading ? 'Signing Up...' : 'SIGN UP'} {/* <<< CHANGE BUTTON TEXT based on isLoading */}
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignUp;
