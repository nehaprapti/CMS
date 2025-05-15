package com.example.collegemanagement;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;  // <-- NEW IMPORT
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {  // <-- ADD @NonNull HERE
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("*");
    }
}
