import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});

  console.log(user);
  useEffect(() => {
    const validateLogin = async (e) => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
        const currentUserRequest = await axios.get(
          "https://backend-laras.up.railway.app/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentUserResponse = currentUserRequest.data;
        console.log(currentUserResponse);

        if (currentUserResponse.status) {
          setUser(currentUserResponse.data.user);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    validateLogin();
  }, []);
  return (
    <>
      {user.role ? (
        <div>
          <div className="dashboard-box">
            <p className="m-0 text-white">Room {user.room}</p>
            <h1 className="headline text-center text-uppercase fw-bold">
              {" "}
              Welcome to Laras Kost
            </h1>
            <div className=" d-flex flex-column gap-3 dash-button">
              <Button
                href=""
                className="w-100 p-5 align-self-center fw-bold"
                variant="outline-success"
              >
                Open
              </Button>
              <Button
                href=""
                className=" w-100 p-5 align-self-center fw-bold"
                variant="outline-danger"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/Register" />
      )}
    </>
  );
}
