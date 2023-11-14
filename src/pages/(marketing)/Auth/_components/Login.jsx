import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post(`${origin}/auth/login`, {
        username,
        password,
      });
      if (response.data.token && response.data.userID) {
        setUsername("");
        setPassword("");
        setError(null);

        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default Login;
