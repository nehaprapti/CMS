package com.example.collegemanagement.controller;
import com.example.collegemanagement.model.StudentDetails;
import com.example.collegemanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/students")
public class StudentController 
{   @Autowired
    private StudentService studentService;
    @GetMapping
    public List<StudentDetails> getAllStudents() 
    {   return studentService.getAllStudents();}
    @GetMapping("/{id}")
    public StudentDetails getStudentById(@PathVariable int id) 
    {   return studentService.getStudentById(id);}
    @PostMapping
    public String saveStudent(@RequestBody StudentDetails student) 
    {   int result = studentService.saveStudent(student);
        return result > 0 ? "Student saved successfully!" : "Error saving student.";
    }
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) 
    {   int result = studentService.deleteStudent(id);
        return result > 0 ? "Student deleted successfully!" : "Error deleting student.";
    }
    // Get students by department
    @GetMapping("/department/{department}")
    public List<StudentDetails> getStudentsByDepartment(@PathVariable String department) 
    {   return studentService.getStudentsByDepartment(department);}
    // Get students by year of graduation
    @GetMapping("/year/{year}")
    public List<StudentDetails> getStudentsByYear(@PathVariable int year) 
    {   return studentService.getStudentsByYearOfGraduation(year);}
}
