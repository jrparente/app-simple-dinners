import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";

function Register() {
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      await axios.post(`${origin}/auth/register`, {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      setSuccessMessage("Registration completed! Now you have to login.");
      setError(null);
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      {successMessage ? null : (
        <Form
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          label="Register"
          onSubmit={onSubmit}
          error={error}
          successMessage={successMessage}
        />
      )}
    </>
  );
}

export default Register;
