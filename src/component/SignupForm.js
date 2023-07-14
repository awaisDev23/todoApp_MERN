import "./SignupForm.css";
import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

const SignupForm = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignUp(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <Typography variant="h6">SignUp</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Email"
        value={email}
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
      <Button type="submit" variant="contained" color="primary">
        SignUp
      </Button>
    </form>
  );
};

export default SignupForm;
