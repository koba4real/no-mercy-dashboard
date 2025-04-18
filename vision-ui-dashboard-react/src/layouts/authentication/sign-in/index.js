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

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // VVVVV ADD THESE STATE VARIABLES VVVVV
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
        setError('Please enter both email and password.');
        setIsLoading(false);
        return;
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });

    try {
        // Send POST request to the backend login endpoint
        const res = await axios.post('http://localhost:5001/api/auth/login', body, config);

        // ---- Login Successful ----
        console.log('Login successful:', res.data);
        setError(''); // Clear any previous errors

        // !!! IMPORTANT: Store the token (e.g., in localStorage)
        // We will add state management (Context/Zustand) later to handle this more robustly
        // For now, just store the token simply:
        if (res.data.token) {
          localStorage.setItem('token', res.data.token); // Store token
          // For now, just log success, redirect later
          console.log("Token stored in localStorage");
          alert("Login Successful! Token stored. (Redirection logic will be added later)");
          // Later: Update global auth state, redirect user to dashboard:
          // history.push('/dashboard'); // Requires useHistory hook
        } else {
           setError("Login successful, but no token received."); // Should not happen
        }


    } catch (err) {
        // ---- Login Failed ----
        console.error('Login error:', err.response ? err.response.data : err.message);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message); // Show error from backend (e.g., "Invalid credentials")
        } else {
          setError('Login failed. Please check your connection or credentials.'); // Generic error
        }
    } finally {
         setIsLoading(false);
    }

};

  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE VISION UI DASHBOARD"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="email"
              placeholder="Your email..."
              fontWeight="500"
              value={email} // <<< ADD THIS
              onChange={(e) => { setEmail(e.target.value); setError(''); }} // <<< ADD THIS
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
              placeholder="Your password..."
              sx={({ typography: { size } }) => ({ fontSize: size.sm, })}
              value={password} // <<< ADD THIS
              onChange={(e) => { setPassword(e.target.value); setError(''); }} // <<< ADD THIS
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
        {/* ==== INSERT FEEDBACK MESSAGE HERE ==== */}
        {error && (
          <VuiBox mt={2} mb={2} p={1} sx={{ border: '1px solid', borderColor: palette.error.main, borderRadius: '5px', backgroundColor: 'rgba(244, 67, 54, 0.1)' }}>
            <VuiTypography variant="caption" color="error" fontWeight="medium">
              {error}
            </VuiTypography>
          </VuiBox>
        )}
        {/* ==== END FEEDBACK MESSAGE ==== */}
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'SIGN IN'}
          </VuiButton>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
