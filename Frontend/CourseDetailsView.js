import React, { useState, useEffect } from "react";

const CourseDetailsView = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/courses")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Unexpected response format:", data);
          setCourses([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5" style={{ fontFamily: "Times New Roman, serif" }}>
      <h2 className="text-center mb-4">Course Details</h2>
      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-secondary">
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseName}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsView;
