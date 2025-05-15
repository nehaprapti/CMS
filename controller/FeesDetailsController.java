package com.example.collegemanagement.controller;
import com.example.collegemanagement.model.FeesDetails;
import com.example.collegemanagement.service.FeesDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/fees")
public class FeesDetailsController 
{   @Autowired
    private FeesDetailsService feesDetailsService;
    @GetMapping
    public List<FeesDetails> getAllFees() 
    {   return feesDetailsService.getAllFees();}
    @GetMapping("/{department}/{semester}")
    public ResponseEntity<FeesDetails> getFeesById(@PathVariable String department, @PathVariable int semester) 
    {   Optional<FeesDetails> fees = feesDetailsService.getFeesById(department, semester);
        return fees.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/department/{department}")
    public List<FeesDetails> getFeesByDepartment(@PathVariable String department) 
    {   return feesDetailsService.getFeesByDepartment(department);}
    @GetMapping("/semester/{semester}")
    public List<FeesDetails> getFeesBySemester(@PathVariable int semester) 
    {   return feesDetailsService.getFeesBySemester(semester);}
    @PostMapping
    public int addFees(@RequestBody FeesDetails feesDetails) 
    {   return feesDetailsService.saveFeesDetails(feesDetails);}
    @DeleteMapping("/{department}/{semester}")
    public ResponseEntity<String> deleteFees(@PathVariable String department, @PathVariable int semester) 
    {   feesDetailsService.deleteFeesDetails(department, semester);
        return ResponseEntity.ok("Deleted successfully");
    }
}

