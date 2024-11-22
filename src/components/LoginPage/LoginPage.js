import React from "react";
import { useHistory } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const history = useHistory();

  const handleSuccess = (response) => {
    console.log(response);
    onLogin(true);
  };

  const handleFailure = (error) => {
    console.error(error);
    alert("Failed to login with Google");
  };

  const handleSkip = () => {
    // Set the login state to true for development purposes
    onLogin(true);
    history.push("/dashboard");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
          <button className="skip-button" onClick={handleSkip}>
            Skip (under construction)
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
