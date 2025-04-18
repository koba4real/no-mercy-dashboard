import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useVisionUIController } from 'context'; // Import our context hook

// This component takes another component as a prop, along with Route props
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [controller] = useVisionUIController(); // Get the controller state
  const { isAuthenticated, loading } = controller; // Destructure auth state

  return (
    <Route
      {...rest} // Pass down other route props like path, exact, etc.
      render={props => {
        // 1. If still loading the initial auth state, don't render anything yet
        //    (or show a loading spinner)
        if (loading) {
          return null; // Or <LoadingSpinner />;
        }
        // 2. If authenticated, render the requested component
        if (isAuthenticated) {
          return <Component {...props} />;
        }
        // 3. If not authenticated, redirect to the login page
        return <Redirect to="/authentication/sign-in" />;
      }}
    />
  );
};

export default ProtectedRoute;