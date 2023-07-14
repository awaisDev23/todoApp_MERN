import React, { useState } from "react";
import { AppBar, Toolbar, Button, Modal } from "@material-ui/core";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./Header.css";
const Header = ({ handleLogin, handleSignUp }) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);

  const handleOpenLoginForm = () => {
    setOpenLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setOpenLoginForm(false);
  };
  const handleOpenSignUpForm = () => {
    setOpenSignUpForm(true);
  };
  const handleCloseSignupForm = () => {
    setOpenLoginForm(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <Button color="inherit">Todo App</Button>
          </div>
          <Button className="button_login" onClick={handleOpenLoginForm}>
            Login
          </Button>
          <Button className="button_signup" onClick={handleOpenSignUpForm}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>

      <Modal open={openLoginForm} onClose={handleCloseLoginForm}>
        <LoginForm handleLogin={handleLogin} />
      </Modal>

      <Modal open={openSignUpForm} onClose={handleCloseSignupForm}>
        <SignupForm handleSignUp={handleSignUp} />
      </Modal>
    </>
  );
};

export default Header;
