package com.example.collegemanagement;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class CollegemanagementApplication 
{	public static void main(String[] args) 
	{	SpringApplication.run(CollegemanagementApplication.class, args);}
}
