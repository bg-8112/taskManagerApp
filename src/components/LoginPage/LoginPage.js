import React from "react";
import { useNavigate } from "react-router-dom";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import "./LoginPage.css";
import { app } from "../../utils/firebase";

const auth = getAuth(app);

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSuccess = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); // Open Google Sign-In popup
      const token = await result.user.getIdToken(); // Get the ID token after successful sign-in
      console.log(token);

      // Send the toaken to the backend for further authentication
      await onLogin(true);
      navigate("/dashboard");

     
    } catch (error) {
      console.error("Google sign-in error:", error); // Log any errors during the sign-in process
    }
  };

  const handleFailure = (error) => {
    console.error(error);
    alert("Failed to login with Google");
  };

  const handleSkip = () => {
    // Set the login state to true for development purposes
    onLogin(true);
    navigate("/dashboard");
  };

  return (
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <button className="skip-button" onClick={handleSuccess}>
            SignIn with Google
          </button>
        </div>
      </div>
  );
};

export default LoginPage;
