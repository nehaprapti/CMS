package com.example.collegemanagement.service;
import com.example.collegemanagement.model.FeesDetails;
import com.example.collegemanagement.repository.FeesDetailsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class FeesDetailsService 
{   @Autowired
    private FeesDetailsDAO feesDetailsDAO;
    public List<FeesDetails> getAllFees() 
    {   return feesDetailsDAO.getAllFees();}
    public Optional<FeesDetails> getFeesById(String departmentName, int semester) 
    {   return Optional.ofNullable(feesDetailsDAO.getFeesByDepartmentAndSemester(departmentName, semester));}
    public List<FeesDetails> getFeesByDepartment(String departmentName) 
    {   return feesDetailsDAO.getFeesByDepartment(departmentName);}
    public List<FeesDetails> getFeesBySemester(int semester) 
    {   return feesDetailsDAO.getFeesBySemester(semester);}
    public int saveFeesDetails(FeesDetails feesDetails) 
    {   return feesDetailsDAO.saveFees(feesDetails);}
    public boolean deleteFeesDetails(String departmentName, int semester) 
    {   return feesDetailsDAO.deleteFees(departmentName, semester) > 0;}
}
