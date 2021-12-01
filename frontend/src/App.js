import React from "react";
import "./styles/index.css";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route } from "react-router-dom";
import SignupButton from "./components/SignupButton";

function App() {
  const { isLoading } = useAuth0();
  const { isAuthenticated } = useAuth0();

  if (isLoading) return <div className="loading">Loading ...</div>;

  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? (
            <Homepage />
          ) : (
            <div className="signup">
              {" "}
              <div className="homepage-message">
                Play ♟ against the Computer
              </div>
              <SignupButton />
            </div>
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
