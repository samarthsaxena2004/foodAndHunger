package com.foodandhunger.backend.repository;

import com.foodandhunger.backend.models.DonationModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DonationRepo extends JpaRepository<DonationModel, Integer> {
    boolean existsByDonorId(int donorId);
    Optional<DonationModel> findByDonorId(int donorId);
}
