package com.example.collegemanagement.repository;
import com.example.collegemanagement.model.FeesDetails;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.lang.NonNull;
public class FeesDetailsRow implements RowMapper<FeesDetails> 
{   @Override
    public FeesDetails mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        FeesDetails fees = new FeesDetails();
        fees.setDepartmentName(rs.getString("DepartmentName"));
        fees.setFees(rs.getBigDecimal("Fees").doubleValue()); // Convert BigDecimal to double
        fees.setSemester(rs.getInt("Semester"));
        return fees;
    }
}
