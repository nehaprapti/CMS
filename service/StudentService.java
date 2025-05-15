package com.example.collegemanagement.service;
import com.example.collegemanagement.model.StudentDetails;
import com.example.collegemanagement.repository.StudentDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class StudentService 
{   @Autowired
    private StudentDAO studentDAO;
    public List<StudentDetails> getAllStudents() 
    {   return studentDAO.getAllStudents();}
    public StudentDetails getStudentById(int id) 
    {   return studentDAO.getStudentById(id);}
    public List<StudentDetails> getStudentsByDepartment(String department) 
    {   return studentDAO.getStudentsByDepartment(department);  }
    public List<StudentDetails> getStudentsByYearOfGraduation(int year) 
    {   return studentDAO.getStudentsByYearOfGraduation(year);  }
    public int saveStudent(StudentDetails student) 
    {   return studentDAO.saveStudent(student);}
    public int deleteStudent(int id) 
    {   return studentDAO.deleteStudent(id);}
}
