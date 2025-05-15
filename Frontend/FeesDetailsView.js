import React, { useState, useEffect } from "react";

const FeesDetails = () => {
  const [fees, setFees] = useState([]); // State to store fee details
  const [department, setDepartment] = useState(""); // State to store department input for filter
  const [semester, setSemester] = useState(""); // State to store semester input for filter

  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all fee records on component load
  useEffect(() => {
    fetch("http://localhost:8080/fees")
      .then((response) => response.json())
      .then((data) => {
        setFees(data); // Populate fee data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching fees:", error);
        setLoading(false); // Stop loading on error
      });
  }, []);


  // Handle Fee Filter logic (by department or semester)
  const handleFilter = () => {
    setLoading(true); // Set loading before API call
    let url = "http://localhost:8080/fees";
    if (department && semester) {
      url = `http://localhost:8080/fees/${department}/${semester}`;
    } else if (department) {
      url = `http://localhost:8080/fees/department/${department}`;
    } else if (semester) {
      url = `http://localhost:8080/fees/semester/${semester}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFees(data); // Populate fee data based on filter
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching filtered fees:", error);
        setLoading(false); // Stop loading on error
      });
  };

  // Table styles for better presentation
  const containerStyles = {
    backgroundColor: "#130178",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "1000px",
    margin: "auto",
  };

  const tableStyles = {
    border: "1px solid white",
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "20px",
    textAlign: "left",
  };

  const thTdStyles = {
    border: "1px solid white",
    padding: "12px",
    textAlign: "center",
  };

  const inputStyles = {
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "200px",
  };

  const buttonStyles = {
    backgroundColor: "rgb(13, 121, 237)",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyles = {
    backgroundColor: "rgb(13, 121, 237)",
  };

 

  const headingStyles = {
    textAlign: "center",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Fees Details</h1>

      {/* Filter Section */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department (e.g., IT)"
          style={inputStyles}
        />
        <input
          type="number"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="Semester (e.g., 4)"
          style={inputStyles}
        />
        <button
          onClick={handleFilter}
          style={buttonStyles}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(4, 31, 128)")}
        >
          Filter Fees
        </button>
      </div>

     

      {/* Fee Table */}
      {loading ? (
        <p>Loading fees...</p> // Show loading message while data is being fetched
      ) : (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thTdStyles}>Department</th>
              <th style={thTdStyles}>Semester</th>
              <th style={thTdStyles}>Fees</th>
            </tr>
          </thead>
          <tbody>
            {fees.length > 0 ? (
              fees.map((fee, index) => (
                <tr key={index}>
                  <td style={thTdStyles}>{fee.departmentName}</td>
                  <td style={thTdStyles}>{fee.semester}</td>
                  <td style={thTdStyles}>{fee.fees}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={thTdStyles}>
                  No fee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeesDetails;
