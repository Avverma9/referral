import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css"
export default function Admin() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
        const response = await axios.post(
          "https://refferal-zvlf.onrender.com/getData/user/data",{
            
                email: email,
                password: password,
              
          }
        );

        if (response.data.status) {
            const filteredData= response.data.allData.filter(filtered=>filtered.email !=="admin@gmail.com")
          setAllData(filteredData);
          
        } else {
          console.error("Error in API response:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="shared-container">
      <h2>Welcome Admin !</h2>
      <hr />
      <h5>All application user data</h5>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Shared Count</th>
            <th>Success Referral</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((data, index) => (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.mobile}</td>
              <td>{data.sharedCount}</td>
              <td>{data.successRefferal}</td>
              <td>{data.createdAt.substring(0,10)}</td>
              <td>{data.updatedAt.substring(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
