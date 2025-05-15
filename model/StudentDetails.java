package com.example.collegemanagement.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
@Entity
@Table(name = "StudentDetails")
public class StudentDetails 
{   @Id
    private int admissionNumber;
    private String name;
    private Date dateOfBirth;
    private String gender;
    private String address;
    private String department;
    private String phoneNumber;
    private String email;
    private int yearOfGraduation;
    // Default Constructor
    public StudentDetails() {}
    // Getters and Setters
    public int getAdmissionNumber() 
    {   return admissionNumber;}
    public void setAdmissionNumber(int admissionNumber) 
    {   this.admissionNumber = admissionNumber;}
    public String getName() 
    {   return name;}
    public void setName(String name) 
    {   this.name = name;}
    public Date getDateOfBirth() 
    {   return dateOfBirth;}
    public void setDateOfBirth(Date dateOfBirth) 
    {   this.dateOfBirth = dateOfBirth;}
    public String getGender() 
    {   return gender;}
    public void setGender(String gender) 
    {   this.gender = gender;}
    public String getAddress() 
    {   return address;}
    public void setAddress(String address) 
    {   this.address = address;}
    public String getDepartment() 
    {   return department;}
    public void setDepartment(String department) 
    {    this.department = department;}
    public String getPhoneNumber() 
    {   return phoneNumber;}
    public void setPhoneNumber(String phoneNumber) 
    {   this.phoneNumber = phoneNumber;}
    public String getEmail() 
    {   return email;}
    public void setEmail(String email) 
    {   this.email = email;}
    public int getYearOfGraduation() 
    {   return yearOfGraduation;}
    public void setYearOfGraduation(int yearOfGraduation) 
    {   this.yearOfGraduation = yearOfGraduation;}
}
