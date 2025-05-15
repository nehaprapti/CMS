package com.example.collegemanagement.repository;
import com.example.collegemanagement.model.StudentDetails;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.lang.NonNull;
public class StudentRow implements RowMapper<StudentDetails> 
{   @Override
    public StudentDetails mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        StudentDetails student = new StudentDetails();
        student.setAdmissionNumber(rs.getInt("admissionNumber"));
        student.setName(rs.getString("name"));
        student.setDateOfBirth(rs.getDate("dateOfBirth"));
        student.setGender(rs.getString("gender"));
        student.setAddress(rs.getString("address"));
        student.setDepartment(rs.getString("department"));
        student.setPhoneNumber(rs.getString("phoneNumber"));
        student.setEmail(rs.getString("email"));
        student.setYearOfGraduation(rs.getInt("yearOfGraduation"));
        return student;
    }
}
