import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [isLocked, setIsLocked] = useState(true);

  console.log(user);

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Check user login status
        const token = localStorage.getItem("token");

        const currentUserRequest = await axios.get(
          "https://backend-production-7ed6.up.railway.app/auth/me",
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
    fetchDoorStatus();
  }, []);

  const fetchDoorStatus = async () => {
    try {
      const response = await axios.get("https://192.168.43.221/door/status");
      setIsLocked(response.data.isLocked);
    } catch (error) {
      console.error("Failed to fetch door status: ", error);
    }
  };
  console.log(fetchDoorStatus);

  const toggleLock = async () => {
    try {
      const response = await axios.post("https://192.168.43.221/door/toggle");
      setIsLocked(!isLocked); // Memperbarui status terbalik
      console.log(response);
    } catch (error) {
      console.error("Failed to toggle door lock: ", error);
    }
  };
  console.log(toggleLock);

  return (
    <>
      <div>
        <div className="dashboard-box">
          <p className="m-0 text-white">Room {user.room}</p>
          <h1 className="headline text-center text-uppercase fw-bold">
            {" "}
            Welcome to Laras Kost
          </h1>
          <p className="text-white">
            Door is {isLocked ? "Locked" : "Unlocked"}
          </p>
          <div className="d-flex flex-column gap-3 dash-button">
            {isLocked ? (
              <Button
                onClick={toggleLock}
                className="w-100 p-5 align-self-center fw-bold"
                variant="outline-success"
              >
                Unlock the Door
              </Button>
            ) : (
              <Button
                onClick={toggleLock}
                className="w-100 p-5 align-self-center fw-bold"
                variant="outline-danger"
              >
                Lock the Door
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
