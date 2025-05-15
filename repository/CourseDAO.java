package com.example.collegemanagement.repository;
import com.example.collegemanagement.model.CourseDetails;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public class CourseDAO 
{   private final JdbcTemplate jdbcTemplate;
    public CourseDAO(JdbcTemplate jdbcTemplate) 
    {   this.jdbcTemplate = jdbcTemplate;}
    public int saveCourse(CourseDetails course) 
    {   String sql = "INSERT INTO CourseDetails (CourseCode, CourseName, Credits) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, course.getCourseCode(), course.getCourseName(), course.getCredits());
    }
    public List<CourseDetails> getAllCourses() 
    {   String sql = "SELECT * FROM CourseDetails";
        return jdbcTemplate.query(sql, new CourseRow());
    }
    public List<CourseDetails> getCoursesByCode(String courseCode) 
    {   String sql = "SELECT * FROM CourseDetails WHERE CourseCode LIKE ?";
        return jdbcTemplate.query(sql, new CourseRow(), courseCode + "%");
    }
    public int deleteCourse(String courseCode) 
    {   String sql = "DELETE FROM CourseDetails WHERE CourseCode = ?";
        return jdbcTemplate.update(sql, courseCode);
    }
}
