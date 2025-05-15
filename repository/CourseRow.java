package com.example.collegemanagement.repository;
import com.example.collegemanagement.model.CourseDetails;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import java.sql.ResultSet;
import java.sql.SQLException;
public class CourseRow implements RowMapper<CourseDetails> 
{   @Override
    public CourseDetails mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        return new CourseDetails(
            rs.getString("CourseCode"),
            rs.getString("CourseName"),
            rs.getInt("Credits")
        );
    }
}
