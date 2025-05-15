package com.example.collegemanagement.controller;
import com.example.collegemanagement.model.CourseDetails;
import com.example.collegemanagement.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/courses")
public class CourseController 
{   private final CourseService courseService;
    public CourseController(CourseService courseService) 
    {   this.courseService = courseService;}
    @GetMapping
    public List<CourseDetails> getAllCourses() 
    {   return courseService.getAllCourses();}
    @GetMapping("/{courseCode}")
    public ResponseEntity<List<CourseDetails>> getCoursesByCode(@PathVariable String courseCode) 
    {   List<CourseDetails> courses = courseService.getCoursesByCode(courseCode);
        return courses.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(courses);
    }
    @PostMapping
    public ResponseEntity<String> saveCourse(@RequestBody CourseDetails course) 
    {   int result = courseService.saveCourse(course);
        return result > 0 ? ResponseEntity.ok("Course saved successfully") : ResponseEntity.badRequest().body("Failed to save course");
    }
    @DeleteMapping("/{courseCode}")
    public ResponseEntity<String> deleteCourse(@PathVariable String courseCode) 
    {   int result = courseService.deleteCourse(courseCode);
        return result > 0 ? ResponseEntity.ok("Course deleted successfully") : ResponseEntity.notFound().build();
    }
}
