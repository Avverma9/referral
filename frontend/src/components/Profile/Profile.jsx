import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        if (!email || !password) {
          console.error("Email or password is missing");
          return;
        }

        const response = await axios.post("http://localhost:3000/getData", {
          email: email,
          password: password,
        });

        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
    console.log(data)  ;
  return (
    <div className="profile-container">
      <br /><br />
      <div className="profile-image">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" width="20%" height="20%" />

      </div>
      <br />
      <center>
      <table>
        <tr>
          <td><b>Name: </b></td>
          <td>{data.name}</td>
        </tr>
        <tr>
          <td><b>Email: </b></td>
          <td>{data.email}</td>
        </tr>
        <tr>
          <td><b>Phone: </b></td>
          <td>{data.mobile}</td>
        </tr>
      </table>
      </center>
      
      <br /><br />
    </div>
  );
}
