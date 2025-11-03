package com.foodandhunger.backend.repository;

import com.foodandhunger.backend.models.DonorModel;
import com.foodandhunger.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 2. repository
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    // Spring Data JPA automatically provides: save, findAll, findById, deleteById, etc.
    boolean existsByEmail(String email);
    boolean existsByUsername(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}

