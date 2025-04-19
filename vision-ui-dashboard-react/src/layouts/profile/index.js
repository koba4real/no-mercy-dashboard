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

import React, { useState, useEffect } from 'react'; // Base React hooks
import axios from 'axios'; // For API calls

// @mui material components
import Grid from "@mui/material/Grid"; // Keep needed MUI components

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography"; // Keep this if used in loading/error

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar"; // Navbar for layout
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header"; // Your profile header
import CarInformations from "./components/CarInformations"; // Keep other sections if used
// import Welcome from "../profile/components/Welcome/index"; // Keep if used
// import PlatformSettings from "layouts/profile/components/PlatformSettings"; // Keep if used
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard"; // Keep if used
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard"; // Keep if used

// Import context hook and actions
import { useVisionUIController, authError } from 'context'; // Keep needed context items

function Overview() {
  // State for fetched player profile
  const [playerProfile, setPlayerProfile] = useState(null); // Use 'playerProfile' consistently
  const [profileError, setProfileError] = useState(''); // Use '' for string errors
  const [isProfileLoading, setIsProfileLoading] = useState(true); // Consistent naming

  // Get context state (controller) and dispatch function
  const [controller, dispatch] = useVisionUIController();
  // Get user object (contains username, email, id) and token from context
  const { user, token } = controller;

  useEffect(() => {
    const fetchProfile = async () => {
       // Check if token exists from context *before* trying to fetch
       if (token) {
          console.log("Profile Page: Fetching player profile...");
          setProfileError(''); // Reset error
          setIsProfileLoading(true); // Set loading
          try {
             const config = {
                headers: {
                   'Authorization': `Bearer ${token}`, // Use token from context
                }
             };
             // Use the correct endpoint URL
             const response = await axios.get('http://localhost:5001/api/player/me', config);

             console.log("Profile Page: Profile data received:", response.data);
             setPlayerProfile(response.data); // Set the profile data state

          } catch (err) {
             console.error("Profile Page: Error fetching profile:", err.response ? err.response.data : err.message);
             setProfileError('Could not load player profile.');
             // Log out if token is bad (401)
             if (err.response && err.response.status === 401) {
                authError(dispatch);
             }
          } finally {
              setIsProfileLoading(false); // Always set loading false after attempt
          }
       } else {
           // No token means user is not authenticated or context hasn't updated yet
           console.log("Profile Page: No token, cannot fetch profile.");
           setPlayerProfile(null); // Ensure profile is null
           setIsProfileLoading(false); // Not loading if no token
           // setError("You must be logged in to view this page."); // Optional: set error
       }
    };

    fetchProfile(); // Run the fetch function

 // Rerun this effect ONLY if the 'token' or 'dispatch' changes
 }, [token, dispatch]); // Added controller.user dependency to get user info
  return (

    <DashboardLayout>
      <Header
            username={user ? user.username : undefined}       // Use user from context
            email={user ? user.email : undefined}         // Use user from context
            score={playerProfile ? playerProfile.cumulativeScore : null} // Use score from state
         />
         {isProfileLoading && <VuiBox p={3}><VuiTypography color="text">Loading profile...</VuiTypography></VuiBox>}
         {profileError && <VuiBox p={3}><VuiTypography color="error">{profileError}</VuiTypography></VuiBox>}
      <VuiBox mt={5} mb={3}>
        
        <Grid
          container
          spacing={3}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >{/*
          <Grid
            item
            xs={12}
            xl={4}
            xxl={3}
            sx={({ breakpoints }) => ({
              minHeight: "400px",
              [breakpoints.only("xl")]: {
                gridArea: "1 / 1 / 2 / 2",
              },
            })}
          >
            <Welcome />
          </Grid>*/}
          
          <Grid
            item
            xs={12}
            xl={5}
            xxl={6}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "2 / 1 / 3 / 3",
              },
            })}
          >
            <CarInformations />
          </Grid>
          {/*
          <Grid
            item
            xs={12}
            xl={3}
            xxl={3}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "1 / 2 / 2 / 3",
              },
            })}
          >
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Mark Johnson",
                mobile: "(44) 123 1234 123",
                email: "mark@simmmple.com",
                location: "United States",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
            />
          </Grid>*/}
        </Grid>
      </VuiBox>
      <Grid container spacing={3} mb="30px">
        {/*
        <Grid item xs={12} xl={3} height="100%">
          <PlatformSettings />
        </Grid>*/}
        {/*
        <Grid item xs={12} xl={9}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Projects
                </VuiTypography>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  Architects design houses
                </VuiTypography>
              </VuiBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile1}
                    label="project #2"
                    title="modern"
                    description="As Uber works through a huge amount of internal management turmoil."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile2}
                    label="project #1"
                    title="scandinavian"
                    description="Music is something that every person has his or her own specific opinion about."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile3}
                    label="project #3"
                    title="minimalist"
                    description="Different people have different taste, and various types of music."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team4, name: "Peterson" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team1, name: "Elena Morison" },
                    ]}
                  />
                </Grid>
              </Grid>
            </VuiBox>
          </Card>
        </Grid>*/}
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
