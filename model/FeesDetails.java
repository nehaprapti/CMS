package com.example.collegemanagement.model;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "FeesDetails")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeesDetails 
{   @Id
    private String departmentName;
    private int semester;
    private double fees;
}
