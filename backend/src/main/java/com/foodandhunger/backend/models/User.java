package com.foodandhunger.backend.models;

// 1. model class
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name="users")
public class User{
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    private int id;

    @Setter
    @Getter
    private String username;

    @Setter
    @Getter
    private String email;

    @Setter
    @Getter
    private String password;

    @CreationTimestamp
    @Column(name="created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name="updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // constructors
    public User(){}
    public User( String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
