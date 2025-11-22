package com.foodandhunger.backend.controller;

import com.foodandhunger.backend.models.DonorModel;
import com.foodandhunger.backend.services.DonorService;
import com.foodandhunger.backend.structures.ControllerStruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/donor")
public class DonorController implements ControllerStruct<DonorModel> {

    @Autowired
    private DonorService donorService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/add", consumes = { "multipart/form-data" })
    public ResponseEntity<DonorModel> createDonor(
            @RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("address") String address,
            @RequestParam("organizationName") String organizationName,
            @RequestParam("pan") String pan,
            @RequestParam("aadhaar") String aadhaar,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("location") String location,
            @RequestParam(value = "latitude", required = false) Double latitude,
            @RequestParam(value = "longitude", required = false) Double longitude,
            @RequestParam("organizationCertificate") MultipartFile organizationCertificate,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("signature") MultipartFile signature) {
        try {
            DonorModel donor = new DonorModel();
            donor.setName(name);
            donor.setAge(age);
            donor.setAddress(address);
            donor.setOrganizationName(organizationName);
            donor.setPan(pan);
            donor.setAadhaar(aadhaar);
            donor.setPhone(phone);
            donor.setEmail(email);
            donor.setLocation(location);
            donor.setLatitude(latitude);
            donor.setLongitude(longitude);
            donor.setStatus("pending");

            if (!donorService.create(donor)) {
                return ResponseEntity.status(400).body(null); // Or appropriate error message
            }

            // Upload files and return the updated donor from the service
            return donorService.uploadFiles(donor.getId(), photo, organizationCertificate, signature);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    //    public ResponseEntity<String> create(@RequestBody DonorModel entity) {
    //        return donorService.create(entity)
    //                ? ResponseEntity.ok("Donor added successfully")
    //                : ResponseEntity.status(400).body("Failed to add donor");
    //    }

    @GetMapping("/{id}")
    public ResponseEntity<DonorModel> get(@PathVariable int id) {
        return donorService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<DonorModel>> getAll() {
        return ResponseEntity.ok(donorService.getAll());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DonorModel> update(@PathVariable int id, @RequestBody DonorModel entity) {
        boolean updated = donorService.updateById(id, entity);
        return updated ? ResponseEntity.ok(entity) : ResponseEntity.status(404).build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        return donorService.delete(id)
                ? ResponseEntity.ok("Donor deleted successfully")
                : ResponseEntity.status(404).body("Donor not found");
    }

    @GetMapping("/search")
    public ResponseEntity<List<DonorModel>> search(@RequestParam String query) {
        return donorService.search(query);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return donorService.count();
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> exists(@PathVariable int id) {
        return donorService.exists(id);
    }

    //  Upload files (photo, certificate, signature)
    @PostMapping(value = "/{id}/upload", consumes = { "multipart/form-data" })
    public ResponseEntity<DonorModel> uploadFiles(
            @PathVariable int id,
            @RequestParam(required = false) MultipartFile photo,
            @RequestParam(required = false) MultipartFile certificate,
            @RequestParam(required = false) MultipartFile signature) {
        return donorService.uploadFiles(id, photo, certificate, signature);
    }

    //  Update profile photo specifically
    @PostMapping(value = "/{id}/photo", consumes = { "multipart/form-data" })
    public ResponseEntity<DonorModel> updateProfilePhoto(
            @PathVariable int id,
            @RequestParam("photo") MultipartFile photo) {
        return donorService.uploadFiles(id, photo, null, null);
    }

    //  Get by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<DonorModel> getByUser(@PathVariable int userId) {
        return donorService.getByUserId(userId);
    }

    //  Filter by location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<DonorModel>> getByLocation(@PathVariable String location) {
        return donorService.getByLocation(location);
    }

    //  Filter by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<DonorModel>> getByStatus(@PathVariable String status) {
        return donorService.getByStatus(status);
    }

    //  Approve / Reject donor
    @PatchMapping("/{id}/status")
    public ResponseEntity<DonorModel> updateStatus(
            @PathVariable int id,
            @RequestParam String status,
            @RequestParam(required = false) String remarks) {
        return donorService.updateStatus(id, status, remarks);
    }

    //  Count verified donors
    @GetMapping("/count/verified")
    public ResponseEntity<Long> countVerified() {
        return donorService.countVerified();
    }
}
