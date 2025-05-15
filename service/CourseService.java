package com.example.collegemanagement.service;
import com.example.collegemanagement.repository.CourseDAO;
import com.example.collegemanagement.model.CourseDetails;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CourseService 
{   private CourseDAO courseDAO;
    public CourseService(CourseDAO courseDAO) 
    {   this.courseDAO = courseDAO;}
    public List<CourseDetails> getAllCourses() 
    {   return courseDAO.getAllCourses();}
    public List<CourseDetails> getCoursesByCode(String courseCode) 
    {   return courseDAO.getCoursesByCode(courseCode);}
    public int saveCourse(CourseDetails course) 
    {   return courseDAO.saveCourse(course);}
    public int deleteCourse(String courseCode) 
    {   return courseDAO.deleteCourse(courseCode);}
}
