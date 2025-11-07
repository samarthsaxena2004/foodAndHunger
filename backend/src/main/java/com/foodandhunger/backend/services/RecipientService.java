package com.foodandhunger.backend.services;

import com.foodandhunger.backend.models.DonorModel;
import com.foodandhunger.backend.models.RecipientModel;
import com.foodandhunger.backend.repository.RecipientRepo;
import com.foodandhunger.backend.structures.ServicesStruct;
import com.foodandhunger.backend.utils.LLogging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipientService implements ServicesStruct<RecipientModel> {
    @Autowired
    RecipientRepo recipientRepo ;
    @Override
    public Optional<RecipientModel> getById(int id) {
        LLogging.info("getDonorById()");
        try {
            Optional<RecipientModel> recipient = recipientRepo.findById(id);
            recipient.ifPresentOrElse(
                    d -> LLogging.info("Donor found: " + d.getName()),
                    () -> LLogging.warn("Donor not found, id: " + id)
            );
            return recipient;
        } catch (Exception e) {
            LLogging.error(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public List<RecipientModel> getAll() {
        LLogging.info("getAllDonors()");
        try {
            List<RecipientModel> recipient = recipientRepo.findAll();
            if (recipient.isEmpty()) {
                LLogging.warn("No donors found");
            } else {
                LLogging.info("Fetched " + recipient.size() + " donors");
            }
            return recipient;
        } catch (Exception e) {
            LLogging.error(e.getMessage());
            return List.of();
        }
    }

    @Override
    public boolean updateById(int id, RecipientModel entity) {
        LLogging.info("updateDonorById()");
        try {
            RecipientModel existing = recipientRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Donor not found"));
            existing.setAadhaar(entity.getAadhaar());
            existing.setName(entity.getName());
            existing.setAge(entity.getAge());
            existing.setAddress(entity.getAddress());
            existing.setOrganization_certificate_id(entity.getOrganization_certificate_id());
            existing.setOrganizationName(entity.getOrganizationName());
            existing.setPan(entity.getPan());
            existing.setPhone(entity.getPhone());
            existing.setEmail(entity.getEmail());
            existing.setUserId(entity.getUserId());
            existing.setPhoto(entity.getPhoto());
            recipientRepo.save(existing); // ✅ Save after update
            LLogging.info("Donor updated with id: " + id);
            return true;
        } catch (Exception e) {
            LLogging.error(e.getMessage());
            return false;
        }
    }


    @Override
    public boolean create(RecipientModel entity) {
        LLogging.info("create()");
        try {
            recipientRepo.save(entity);
            LLogging.info("Donor saved: " + entity.getName());
            return true;
        } catch (Exception e) {
            LLogging.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(int id) {
        LLogging.info("deleteDonor()");
        try {
            recipientRepo.deleteById(id);
            LLogging.info("Donor deleted with id: " + id);
            return true;
        } catch (Exception e) {
            LLogging.error(e.getMessage());
            return false;
        }
    }

    @Override
    public ResponseEntity<List<RecipientModel>> search(String query) {
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
