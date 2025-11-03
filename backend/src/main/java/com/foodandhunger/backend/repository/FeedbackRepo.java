package com.foodandhunger.backend.repository;

import com.foodandhunger.backend.models.FeedbackModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedbackRepo extends JpaRepository<FeedbackModel, Integer> {

}
