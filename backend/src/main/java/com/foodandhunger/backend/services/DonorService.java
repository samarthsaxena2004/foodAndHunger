package com.foodandhunger.backend.services;

import com.foodandhunger.backend.models.DonorModel;
import com.foodandhunger.backend.repository.DonorRepo;
import com.foodandhunger.backend.utils.LLogging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonorService {
    @Autowired
    DonorRepo donorRepository;

    // get donor
    public Optional<DonorModel> getDonorById(int id){
        LLogging.info("getDonorById");
        try{
            Optional<DonorModel> donor = donorRepository.findById(id);
            if (donor.isPresent()){
                LLogging.info("Donor found: " + donor.get().getName());
            }else{
                LLogging.warn("Donor not found id: " + id);
            }
            return donor;
        }catch (Exception e){
            LLogging.error(String.valueOf(e));
            return Optional.empty();
        }
    }

    // get all donor
    public List<DonorModel> getAllDonors(int id){
        LLogging.info("get all donors");
        try{
            List<DonorModel> donors = donorRepository.findAll();
            if (!donors.isEmpty()){
                LLogging.info("Fetched donors");
            }else{
                LLogging.warn("No donor available");
            }
            return donors;
        }catch (Exception e){
            LLogging.error(String.valueOf(e));
        }
        return null;
    }
    // update donor
    // add donor
    // remove donor


}
