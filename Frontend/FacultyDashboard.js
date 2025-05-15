import React from 'react';
import { useNavigate } from 'react-router-dom';  // 🛣️ Import navigation

const FacultyDashboard = () => {
  const navigate = useNavigate();  // 🛣️ Initialize navigation

  return (
    <div>
      <style>
        {`
          body {
            font-family: 'Times New Roman', 'serif';
            background-color: #130178;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .dashboard-container {
             font-family: 'Times New Roman', 'serif';
            width: 80%;
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          h2 {
            font-size: 36px;
            color: #333;
            text-align: center;
          }

          h3 {
            font-size: 24px;
            color: #444;
            margin-bottom: 10px;
          }

          .dashboard-features ul {
            list-style-type: disc;
            margin-left: 20px;
          }

          .dashboard-features ul li {
            font-size: 18px;
            color: #555;
          }

          .dashboard-actions {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;
          }

          .action-button {
            padding: 12px 24px;
            background-color: rgb(13, 121, 237);
            color: white;
            font-size: 18px;
            text-align: center;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .action-button:hover {
            background-color:rgb(4, 31, 128);
          }

          .notifications {
            margin-top: 30px;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 5px;
          }

          .notifications p {
            font-size: 16px;
            color: #888;
          }
        `}
      </style>

      <div className="dashboard-container" style={{ fontFamily: "Times New Roman, serif" }}>
        <h2>Faculty Dashboard</h2>

        <section className="dashboard-features">
          <h3>Dashboard Features</h3>
          <ul>
            <li>View and manage student details</li>
            <li>View and manage Course details</li>
            <li>View and manage Fees details</li>

          </ul>
        </section>

        <section className="dashboard-actions">
          <button onClick={() => navigate('/StudentList')} className="action-button">
            View Student List
          </button>
          <button onClick={() => navigate('/CourseDetailsView')} className="action-button">
            Course Details
          </button>
          <button onClick={() => navigate('/FeesDetailsView')} className="action-button">
            FeesDetails
          </button>
        </section>

        <section className="notifications">
          <h3>Notifications</h3>
          <p>No new updates for now. Please check back later.</p>
        </section>
      </div>
    </div>
  );
};

export default FacultyDashboard;
