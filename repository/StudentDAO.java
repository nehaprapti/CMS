package com.example.collegemanagement.repository;
import com.example.collegemanagement.model.StudentDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public class StudentDAO 
{   @Autowired
    private JdbcTemplate jdbcTemplate;
    // Get all students
    public List<StudentDetails> getAllStudents() 
    {   String sql = "SELECT * FROM StudentDetails";
        return jdbcTemplate.query(sql, new StudentRow());
    }
    // Get student by Admission Number
    public StudentDetails getStudentById(int id) 
    {   String sql = "SELECT * FROM StudentDetails WHERE admissionNumber = ?";
        return jdbcTemplate.queryForObject(sql, new StudentRow(), id);
    }
    // Get students by Department
    public List<StudentDetails> getStudentsByDepartment(String department) 
    {   String sql = "SELECT * FROM StudentDetails WHERE department = ?";
        return jdbcTemplate.query(sql, new StudentRow(), department);
    }
    // Get students by Year of Graduation
    public List<StudentDetails> getStudentsByYearOfGraduation(int year) 
    {   String sql = "SELECT * FROM StudentDetails WHERE yearOfGraduation = ?";
        return jdbcTemplate.query(sql, new StudentRow(), year);
    }
    // Save student details
    public int saveStudent(StudentDetails student) 
    {   String sql = "INSERT INTO StudentDetails (admissionNumber, name, dateOfBirth, gender, address, department, phoneNumber, email, yearOfGraduation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, student.getAdmissionNumber(), student.getName(), student.getDateOfBirth(), student.getGender(),
                student.getAddress(), student.getDepartment(), student.getPhoneNumber(), student.getEmail(), student.getYearOfGraduation());
    }
    // Delete student by Admission Number
    public int deleteStudent(int id) 
    {   String sql = "DELETE FROM StudentDetails WHERE admissionNumber = ?";
        return jdbcTemplate.update(sql, id);
    }
}