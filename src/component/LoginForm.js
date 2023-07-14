import "./LoginForm.css";

import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

const LoginForm = () => {
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Typography variant="h6">Login</Typography>
      <TextField
        label="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={LoginForm}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
