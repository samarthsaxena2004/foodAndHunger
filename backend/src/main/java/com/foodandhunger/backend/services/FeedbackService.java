package com.foodandhunger.backend.services;

import com.foodandhunger.backend.models.FeedbackModel;
import com.foodandhunger.backend.models.RequestModel;
import com.foodandhunger.backend.repository.FeedbackRepo;
import com.foodandhunger.backend.structures.ServicesStruct;
import com.foodandhunger.backend.utils.LLogging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService implements ServicesStruct<FeedbackModel> {
    @Autowired
    FeedbackRepo feedbackRepo ;
    @Override
    public Optional<FeedbackModel> getById(int id) {
        LLogging.info("getById()");
        try {
            Optional<FeedbackModel> existing = feedbackRepo.findById(id);
            existing.ifPresentOrElse(
                    d -> LLogging.info("Donation found " + d.getMessage()),
                    () -> LLogging.warn("Donation not found, id: " + id));
            return existing;
        }catch (Exception e){
            LLogging.error(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public List<FeedbackModel> getAll() {
        LLogging.info("getAll()");
        try{
            List<FeedbackModel> allRequests = feedbackRepo.findAll();
            if (allRequests.isEmpty()){
                LLogging.warn("No Donors found");
            }else {
                LLogging.info("Fetched " + allRequests.size() + " donations");
            }
            return allRequests;
        }catch (Exception e){
            return List.of();
        }
    }

    @Override
    public boolean updateById(int id, FeedbackModel entity) {
        LLogging.info("updateById()");
        try{
            FeedbackModel existing = feedbackRepo.findById(id)
                    .orElseThrow(()->new RuntimeException("Donation not found"));
            existing.setUserId(entity.getUserId());
            existing.setMessage(entity.getMessage());
            existing.setStar(entity.getStar());
            return true;
        }catch (Exception e){
            LLogging.error(e.getMessage());
            return false;
        }
    }


    @Override
    public boolean create(FeedbackModel entity) {
        LLogging.info("create()");
        try {
            feedbackRepo.save(entity);
            LLogging.info("Donation saved " + entity.getMessage());
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean delete(int id) {
        LLogging.info("delete()");
        try {
            feedbackRepo.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public ResponseEntity<List<FeedbackModel>> search(String query) {
        return null;
    }

    @Override
    public ResponseEntity<Long> count() {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> exists(int id) {
        return null;
    }
}
