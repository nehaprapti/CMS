import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    admissionNumber: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    department: "",
    phoneNumber: "",
    email: "",
    yearOfGraduation: ""
  });

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  useEffect(() => {
    let filtered = [...students];

    if (selectedDepartment) {
      filtered = filtered.filter(student => student.department === selectedDepartment);
    }

    if (selectedYear) {
      filtered = filtered.filter(student => student.yearOfGraduation === parseInt(selectedYear));
    }

    setFilteredStudents(filtered);
  }, [selectedDepartment, selectedYear, students]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      admissionNumber: "",
      name: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      department: "",
      phoneNumber: "",
      email: "",
      yearOfGraduation: ""
    });
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setFormData({ ...student });
    setShowModal(true);
  };

  const handleDeleteStudent = (admissionNumber) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`http://localhost:8080/students/${admissionNumber}`, {
        method: "DELETE"
      })
        .then(() => {
          setStudents(students.filter((s) => s.admissionNumber !== admissionNumber));
        })
        .catch((err) => console.error("Error deleting student:", err));
    }
  };

  const handleSaveStudent = () => {
    const method = editingStudent ? "PUT" : "POST";
    const url = editingStudent
      ? `http://localhost:8080/students/${editingStudent.admissionNumber}`
      : "http://localhost:8080/students";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((savedStudent) => {
        if (editingStudent) {
          setStudents(
            students.map((s) =>
              s.admissionNumber === savedStudent.admissionNumber ? savedStudent : s
            )
          );
        } else {
          setStudents([...students, savedStudent]);
        }
        setShowModal(false);
      })
      .catch((err) => console.error("Error saving student:", err));
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "Times New Roman, serif" }}>
      <h2 className="text-center mb-4">Student List</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <label>Filter by Department:</label>
          <select className="form-control" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="">Select Department</option>
                <option value="Aeronautical Engineering">Aeronautical Engineering</option>
                <option value="Architecture">Architecture</option>
                <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                <option value="Biomedical Engineering">Biomedical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Computer Applications">Computer Applications</option>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Mathematics and Computing">Mathematics and Computing</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Robotics and Automation">Robotics and Automation</option>
                <option value="Software Engineering">Software Engineering</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Filter by Year of Graduation:</label>
          <select className="form-control" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">All</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={handleAddStudent}>
          + Add Student
        </button>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Admission No.</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.admissionNumber}>
                <td>{student.admissionNumber}</td>
                <td>{student.name}</td>
                <td>{formatDate(student.dateOfBirth)}</td>
                <td>{student.gender}</td>
                <td>{student.address}</td>
                <td>{student.department}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>{student.yearOfGraduation}</td>
                <td>
                  <button className="btn btn-sm btn-warning mb-2" onClick={() => handleEditStudent(student)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteStudent(student.admissionNumber)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingStudent ? "Edit Student" : "Add Student"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
              <div className="mb-3">
  <label className="form-label">Admission Number</label>
  <input
    type="text"
    className="form-control"
    value={formData.admissionNumber}
    onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-control"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <select
                    className="form-control"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="">Select Department</option>
                    <option value="Aeronautical Engineering">Aeronautical Engineering</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                    <option value="Biomedical Engineering">Biomedical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Computer Applications">Computer Applications</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                    <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Mathematics and Computing">Mathematics and Computing</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Robotics and Automation">Robotics and Automation</option>
                    <option value="Software Engineering">Software Engineering</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Year of Graduation</label>
                  <select
                    className="form-control"
                    value={formData.yearOfGraduation}
                    onChange={(e) => setFormData({ ...formData, yearOfGraduation: e.target.value })}
                  >
                    <option value="">Select Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>

              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSaveStudent}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
