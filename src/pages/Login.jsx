import React, { useRef, useState } from "react";
import { Button, Alert, Image, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/All.css";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import doorImg from "../images/door-knob.png";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const emailField = useRef("");
  const passwordField = useRef("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const userToLoginPayload = {
        email: emailField.current.value,
        password: passwordField.current.value,
      };

      const loginRequest = await axios.post(
        "https://backend-laras.up.railway.app/auth/login",
        userToLoginPayload
      );

      const loginResponse = loginRequest.data;

      if (loginResponse.status) {
        localStorage.setItem("token", loginResponse.data.token);

        navigate("/Dashboard");
        setLoading(!loading);
      }
    } catch (err) {
      const response = err.response.data;
      console.log(response);

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  return (
    <div className="login-box">
      <h2 className="fw-bold">Sign In</h2>
      <Row className="d-flex flex-column">
        <Col>
          <div className="text-center">
            <Image src={doorImg} />
          </div>
        </Col>
        <Col>
          <form onSubmit={onLogin}>
            <div className="user-box">
              <input type="text" ref={emailField} required />
              <label>Email</label>
            </div>

            <div className="user-box d-flex position-relative">
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordField}
                required
              />
              <Button
                onClick={handleShowPassword}
                className="position-absolute button-show-password p-0"
                style={{
                  right: "0",
                  top: "15%",
                  backgroundColor: "transparent",
                  border: "transparent",
                  boxShadow: "0 0 0 0 transparent",
                }}
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} color="red" title="hide" />
                ) : (
                  <HiOutlineEye size={20} title="show" />
                )}
              </Button>
              <label>Password</label>
            </div>

            {errorResponse.isError && (
              <Alert variant="danger">{errorResponse.message}</Alert>
            )}

            <div className="d-flex gap-2 option-login justify-content-between">
              <Button className="button-submit" type="submit">
                Login
              </Button>

              <div
                className="d-flex gap-1 authentication"
                style={{ marginTop: "45px" }}
              ></div>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}
