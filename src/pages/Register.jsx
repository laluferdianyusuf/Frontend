import React, { useRef, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/All.css";

export default function Register() {
  const navigate = useNavigate();

  const nameField = useRef("");
  const emailField = useRef("");
  const roleField = useRef("");
  const roomField = useRef("");
  const passwordField = useRef("");

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      const userToRegisterPayload = {
        name: nameField.current.value,
        email: emailField.current.value,
        role: roleField.current.value,
        room: roomField.current.value,
        password: passwordField.current.value,
      };

      const registerRequest = await axios.post(
        "https://backend-laras.up.railway.app/auth/registerUser",
        userToRegisterPayload
      );

      const registerResponse = registerRequest.data;
      console.log(registerRequest);

      if (registerResponse.status) navigate("/");
    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  return (
    <div className="register-box">
      <h2 className="fw-bold">Sign Up</h2>

      <form onSubmit={onRegister}>
        <div className="signup-box">
          <input
            type="text"
            ref={roleField}
            // style={buttonBorder}
            value="penghuni"
          />
          <label>Role</label>
        </div>

        <div className="signup-box">
          <input type="text" ref={nameField} required />
          <label>Name</label>
        </div>

        <div className="signup-box">
          <input type="text" ref={emailField} required />
          <label>Email</label>
        </div>

        <div className="signup-box">
          <input type="password" ref={passwordField} required />
          <label>Password</label>
        </div>

        <div className="signup-box">
          <input type="text" ref={roomField} required />
          <label>Room</label>
        </div>

        <p className="text-secondary"></p>
        {errorResponse.isError && (
          <Alert variant="danger">{errorResponse.message}</Alert>
        )}
        <div>
          <Button className="button-submit" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
