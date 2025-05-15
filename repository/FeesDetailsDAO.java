package com.example.collegemanagement.repository;
import com.example.collegemanagement.model.FeesDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public class FeesDetailsDAO 
{   @Autowired
    private JdbcTemplate jdbcTemplate;
    // Get all fees details
    public List<FeesDetails> getAllFees() 
    {   String sql = "SELECT * FROM FeesDetails";
        return jdbcTemplate.query(sql, new FeesDetailsRow());
    }
    // Get fees by Department Name and Semester
    public FeesDetails getFeesByDepartmentAndSemester(String departmentName, int semester) 
    {   String sql = "SELECT * FROM FeesDetails WHERE DepartmentName = ? AND Semester = ?";
        return jdbcTemplate.queryForObject(sql, new FeesDetailsRow(), departmentName, semester);
    }
    // Get fees by Department Name
    public List<FeesDetails> getFeesByDepartment(String departmentName) 
    {   String sql = "SELECT * FROM FeesDetails WHERE DepartmentName = ?";
        return jdbcTemplate.query(sql, new FeesDetailsRow(), departmentName);
    }
    // Get fees by Semester
    public List<FeesDetails> getFeesBySemester(int semester) 
    {   String sql = "SELECT * FROM FeesDetails WHERE Semester = ?";
        return jdbcTemplate.query(sql, new FeesDetailsRow(), semester);
    }
    // Insert fees details
    public int saveFees(FeesDetails fees) 
    {   String sql = "INSERT INTO FeesDetails (DepartmentName, Fees, Semester) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, fees.getDepartmentName(), fees.getFees(), fees.getSemester());
    }
    // Delete fees by Department Name and Semester
    public int deleteFees(String departmentName, int semester) 
    {   String sql = "DELETE FROM FeesDetails WHERE DepartmentName = ? AND Semester = ?";
        return jdbcTemplate.update(sql, departmentName, semester);
    }
}
