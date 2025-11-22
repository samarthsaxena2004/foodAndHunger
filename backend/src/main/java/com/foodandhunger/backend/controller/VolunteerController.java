package com.foodandhunger.backend.controller;

import com.foodandhunger.backend.models.VolunteerModel;
import com.foodandhunger.backend.services.VolunteerService;
import com.foodandhunger.backend.structures.ControllerStruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/volunteer")
public class VolunteerController implements ControllerStruct<VolunteerModel> {

    @Autowired
    private VolunteerService volunteerService;

    @PostMapping(value = "/add", consumes = { "multipart/form-data" })
    public ResponseEntity<VolunteerModel> create(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("location") String location,
            @RequestParam(value = "latitude", required = false) Double latitude,
            @RequestParam(value = "longitude", required = false) Double longitude,
            @RequestParam("aadhaarCard") String aadhaarCard,
            @RequestParam("panCard") String panCard,
            @RequestParam("availability") String availability,
            @RequestParam("skills") String skills,
            @RequestParam("reason") String reason,
            @RequestParam("emergencyContactPhone") String emergencyContactPhone,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {
        try {
            VolunteerModel volunteer = new VolunteerModel(name, email, phone, address, location, latitude, longitude,
                    aadhaarCard, panCard,
                    availability, skills, reason, emergencyContactPhone);

            if (!volunteerService.create(volunteer)) {
                return ResponseEntity.status(400).build();
            }

            if (photo != null) {
                return volunteerService.uploadProfilePhoto(volunteer.getId(), photo);
            }

            return ResponseEntity.ok(volunteer);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<VolunteerModel> get(@PathVariable int id) {
        return volunteerService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Override
    @GetMapping("/all")
    public ResponseEntity<List<VolunteerModel>> getAll() {
        return ResponseEntity.ok(volunteerService.getAll());
    }

    @Override
    @PutMapping("/update/{id}")
    public ResponseEntity<VolunteerModel> update(@PathVariable int id,
            @RequestBody VolunteerModel entity) {
        boolean updated = volunteerService.updateById(id, entity);
        return updated ? ResponseEntity.ok(entity)
                : ResponseEntity.status(404).build();
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        return volunteerService.delete(id)
                ? ResponseEntity.ok("Volunteer deleted successfully")
                : ResponseEntity.status(404).body("Volunteer not found");
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<List<VolunteerModel>> search(@RequestParam String query) {
        return volunteerService.search(query);
    }

    @Override
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return volunteerService.count();
    }

    @Override
    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> exists(@PathVariable int id) {
        return volunteerService.exists(id);
    }

    // Filter by location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<VolunteerModel>> getByLocation(@PathVariable String location) {
        return volunteerService.getByLocation(location);
    }

    // Upload volunteer profile photo
    @PostMapping(value = "/{id}/photo", consumes = { "multipart/form-data" })
    public ResponseEntity<VolunteerModel> uploadPhoto(@PathVariable int id,
            @RequestParam("photo") MultipartFile file) {
        return volunteerService.uploadProfilePhoto(id, file);
    }
}
