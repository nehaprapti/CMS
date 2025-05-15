import React, { useState, useEffect } from "react";

const FeesDetails = () => {
  const [fees, setFees] = useState([]); // State to store fee details
  const [department, setDepartment] = useState(""); // State to store department input for filter
  const [semester, setSemester] = useState(""); // State to store semester input for filter
  const [newFee, setNewFee] = useState({
    departmentName: "",
    semester: "",
    fees: "",
  }); // State to store new fee details for adding
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

  // Handle Add Fee logic
  const handleAddFee = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!newFee.departmentName || !newFee.semester || !newFee.fees) {
      alert("All fields must be filled.");
      return;
    }

    setLoading(true); // Set loading before API call
    fetch("http://localhost:8080/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFee),
    })
      .then((response) => response.json())
      .then((data) => {
        setFees([...fees, data]); // Add the new fee record to the state
        setNewFee({
          departmentName: "",
          semester: "",
          fees: "",
        }); // Reset the input fields
        setLoading(false); // Stop loading
        alert("Fee record added successfully!");
      })
      .catch((error) => {
        console.error("Error adding fee:", error);
        setLoading(false); // Stop loading on error
      });
  };

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

  const formStyles = {
    marginBottom: "20px",
    backgroundColor: "rgb(13, 121, 237)",
    padding: "15px",
    borderRadius: "10px",
  };

  const headingStyles = {
    textAlign: "center",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyles} >
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

      {/* Add Fee Form */}
      <form onSubmit={handleAddFee} style={formStyles}>
        <h2>Add New Fee Record</h2>
        <input
          type="text"
          value={newFee.departmentName}
          onChange={(e) =>
            setNewFee({ ...newFee, departmentName: e.target.value })
          }
          placeholder="Department Name"
          style={inputStyles}
        />
        <input
          type="number"
          value={newFee.semester}
          onChange={(e) => setNewFee({ ...newFee, semester: e.target.value })}
          placeholder="Semester"
          style={inputStyles}
        />
        <input
          type="number"
          value={newFee.fees}
          onChange={(e) => setNewFee({ ...newFee, fees: e.target.value })}
          placeholder="Fee Amount"
          style={inputStyles}
        />
        <button
          type="submit"
          style={buttonStyles}
          disabled={loading}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0963C7")}
        >
          {loading ? "Adding..." : "Add Fee"}
        </button>
      </form>

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
