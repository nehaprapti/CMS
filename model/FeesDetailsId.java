package com.example.collegemanagement.model;
import java.io.Serializable;
import java.util.Objects;
public class FeesDetailsId implements Serializable 
{   private String departmentName;
    private int semester;
    public FeesDetailsId() {}
    public FeesDetailsId(String departmentName, int semester) 
    {   this.departmentName = departmentName;
        this.semester = semester;
    }
    @Override
    public boolean equals(Object o) 
    {   if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FeesDetailsId that = (FeesDetailsId) o;
        return semester == that.semester && Objects.equals(departmentName, that.departmentName);
    }
    @Override
    public int hashCode() 
    {   return Objects.hash(departmentName, semester);}
}
