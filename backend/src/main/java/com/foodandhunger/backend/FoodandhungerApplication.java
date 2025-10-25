package com.foodandhunger.backend;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.time.LocalDateTime;
import java.util.Date;

@SpringBootApplication
public class FoodandhungerApplication {
	public static void main(String[] args) {
		SpringApplication.run(FoodandhungerApplication.class, args);
	}
}

// 1. model class
@Entity
@Table(name="user_donors")
class UserDonor{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    private int id;
    private String username;
    private String email;
    private String password;
    @CreationTimestamp
    @Column(name="created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name="updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // constructors
    public UserDonor(){}
    public UserDonor( String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
    public UserDonor( int id, String username, String email, String password){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /* getters and setters */

}

// 2. repository
@Repository
interface UserDonorRepository extends JpaRepository<UserDonor, Integer>{
    // Spring Data JPA automatically provides: save, findAll, findById, deleteById, etc.
}

// 3. controller
@RestController
@RequestMapping("/api/auth/donor/")
class UserDonorController{
    @Autowired
    private UserDonorRepository userDonorRepository;

    @PostMapping
    public UserDonor createStudent(@RequestBody UserDonor s) {
        // JPA will automatically save the new Student object and return the saved entity (with the new ID).
        return userDonorRepository.save(s);
    }
}