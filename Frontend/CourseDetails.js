import React, { useState, useEffect } from "react";

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseCode: "",
    credits: "",
  });

  const [editCourseCode, setEditCourseCode] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    courseName: "",
    courseCode: "",
    credits: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    fetch("http://localhost:8080/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditedInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    })
      .then((res) => {
        if (res.ok) {
          fetchCourses();
          setNewCourse({ courseName: "", courseCode: "", credits: "" });
        } else {
          console.error("Failed to add course");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleEditClick = (course) => {
    setEditCourseCode(course.courseCode);
    setEditedCourse(course);
  };

  const handleCancelEdit = () => {
    setEditCourseCode(null);
    setEditedCourse({ courseName: "", courseCode: "", credits: "" });
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:8080/courses/${editCourseCode}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedCourse),
    })
      .then((res) => {
        if (res.ok) {
          fetchCourses();
          handleCancelEdit();
        } else {
          console.error("Failed to update course");
        }
      })
      .catch((err) => console.error("Update error:", err));
  };

  const handleDeleteCourse = (code) => {
    fetch(`http://localhost:8080/courses/${code}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchCourses();
        } else {
          console.error("Failed to delete course");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  // Table styles
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    fontFamily: "Times New Roman, serif",
  };

  const thStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "Times New Roman, serif" }}>
      <h2 className="text-center mb-4">Course Details</h2>

      <form onSubmit={handleAddCourse} style={{ marginBottom: "30px" }}>
        <div className="mb-3">
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={newCourse.courseName}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Course Code:</label>
          <input
            type="text"
            name="courseCode"
            value={newCourse.courseCode}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Credits:</label>
          <input
            type="number"
            name="credits"
            value={newCourse.credits}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Course Name</th>
              <th style={thStyle}>Course Code</th>
              <th style={thStyle}>Credits</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseCode}>
                {editCourseCode === course.courseCode ? (
                  <>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        name="courseName"
                        value={editedCourse.courseName}
                        onChange={handleEditedInputChange}
                        className="form-control"
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        name="courseCode"
                        value={editedCourse.courseCode}
                        onChange={handleEditedInputChange}
                        className="form-control"
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        name="credits"
                        value={editedCourse.credits}
                        onChange={handleEditedInputChange}
                        className="form-control"
                      />
                    </td>
                    <td style={tdStyle}>
                      <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={tdStyle}>{course.courseName}</td>
                    <td style={tdStyle}>{course.courseCode}</td>
                    <td style={tdStyle}>{course.credits}</td>
                    <td style={tdStyle}>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEditClick(course)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteCourse(course.courseCode)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseDetails;
