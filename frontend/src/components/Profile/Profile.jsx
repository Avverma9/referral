import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(30); // 30-second timer
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        if (!email || !password) {
          console.error("Email or password is missing");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "https://refferal-zvlf.onrender.com/getData/user/data",
          {
            email: email,
            password: password,
          }
        );

        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Start the timer
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Stop the timer after 30 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn) {
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <br />
      <br />
      <div className="profile-image">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          width="20%"
          height="20%"
        />
      </div>
      <br />
      <center>
        <table>
          <tr>
            <td>
              <b>Name: </b>
            </td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td>
              <b>Email: </b>
            </td>
            <td>{data.email}</td>
          </tr>
          <tr>
            <td>
              <b>Phone: </b>
            </td>
            <td>{data.mobile}</td>
          </tr>
        </table>
      </center>

      <br />
      <br />

      {/* Display the timer only during the loading state */}
      {loading && <p> Data Loading and will reflect in {timer} seconds</p>}
    </div>
  );
}
