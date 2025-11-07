package com.foodandhunger.backend.services;

import com.foodandhunger.backend.models.DonationModel;
import com.foodandhunger.backend.models.RequestModel;
import com.foodandhunger.backend.repository.RequestRepo;
import com.foodandhunger.backend.structures.ServicesStruct;
import com.foodandhunger.backend.utils.LLogging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService implements ServicesStruct<RequestModel> {
    @Autowired
    RequestRepo requestRepo;

    @Override
    public Optional<RequestModel> getById(int id) {
        LLogging.info("getById()");
        try {
            Optional<RequestModel> existing = requestRepo.findById(id);
            existing.ifPresentOrElse(
                    d -> LLogging.info("Donation found " + d.getTitle()),
                    () -> LLogging.warn("Donation not found, id: " + id));
            return existing;
        }catch (Exception e){
            LLogging.error(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public List<RequestModel> getAll() {
        LLogging.info("getAll()");
        try{
            List<RequestModel> allRequests = requestRepo.findAll();
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
    public boolean updateById(int id, RequestModel entity) {
        LLogging.info("updateById()");
        try{
            RequestModel existing = requestRepo.findById(id)
                    .orElseThrow(()->new RuntimeException("Donation not found"));
            existing.setDescription(entity.getDescription());
            existing.setType(entity.getType());
            existing.setTitle(entity.getTitle());
            existing.setLocation(entity.getLocation());
            return true;
        }catch (Exception e){
            LLogging.error(e.getMessage());
            return false;
        }
    }


    @Override
    public boolean create(RequestModel entity) {
        LLogging.info("create()");
        try {
            requestRepo.save(entity);
            LLogging.info("Donation saved " + entity.getTitle());
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean delete(int id) {
        LLogging.info("delete()");
        try {
            requestRepo.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public ResponseEntity<List<RequestModel>> search(String query) {
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
