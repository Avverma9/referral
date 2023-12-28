import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Shared.css";
export default function Shared() {
  const [data, setData] = useState("");
  const email = localStorage.getItem("email");

  const fetchData = async () => {
    try {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (!email || !password) {
        console.error("Email or password is missing");
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopyToClipboard = async () => {
    try {
      const referralLink = `${window.location.origin}/${data.refferalLink}`;
      await axios.post("https://refferal-zvlf.onrender.com/share-refferal-link", {
        email,
      });

      navigator.clipboard.writeText(referralLink);
      alert("Referral link copied to clipboard!");
      fetchData();
    } catch (error) {
      console.error("Error sharing data:", error.message);
    }
  };

  const handleShareByEmail = async () => {
    try {
      const referralLink = `${window.location.origin}/${data.refferalLink}`;
      await axios.post("https://refferal-zvlf.onrender.com/share-refferal-link", {
        email,
      });

      const subject = "Check out this referral link!";
      const body = `Hey, I wanted to share this referral link with you: ${referralLink}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      fetchData();
    } catch (error) {
      console.error("Error sharing data:", error.message);
    }
  };

  return (
    <div className="shared-container">
      Referral Link - <u>{data.refferalLink}</u>
      <br />
      <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
      <button onClick={handleShareByEmail}>Share via Email</button>
      <br />
      Shared - {data.sharedCount}
      <br />
      Joined - {data.successRefferal}
      <div><h4>People who joined</h4>
      <div>
  {data.userNameArray && data.userNameArray.length > 0 && data.userNameArray.map((user, index) => (
    <p key={index}>{index + 1}. {user}</p>
  ))}
</div>



      </div>
    </div>
  );
}
