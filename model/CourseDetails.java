package com.example.collegemanagement.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
@Entity
@Table(name = "CourseDetails")
public class CourseDetails 
{   @Id
    @Column(name = "CourseCode", length = 10)
    private String courseCode;
    @Column(name = "CourseName", length = 100, nullable = false)
    private String courseName;
    @Column(name = "Credits", nullable = false)
    private int credits;
    // Constructors
    public CourseDetails() {}
    public CourseDetails(String courseCode, String courseName, int credits) 
    {   this.courseCode = courseCode;
        this.courseName = courseName;
        this.credits = credits;
    }
    // Getters and Setters
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public int getCredits() { return credits; }
    public void setCredits(int credits) { this.credits = credits; }
}
