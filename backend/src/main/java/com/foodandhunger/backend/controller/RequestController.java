package com.foodandhunger.backend.controller;

import com.foodandhunger.backend.models.RequestModel;
import com.foodandhunger.backend.services.RequestService;
import com.foodandhunger.backend.structures.ControllerStruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/request")
public class RequestController implements ControllerStruct<RequestModel> {

    @Autowired
    private RequestService requestService;

    @PostMapping(value = "/add", consumes = { "multipart/form-data" })
    public ResponseEntity<RequestModel> create(
            @RequestParam("userId") int userId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("amount") double amount,
            @RequestParam("location") String location,
            @RequestParam(value = "latitude", required = false) Double latitude,
            @RequestParam(value = "longitude", required = false) Double longitude,
            @RequestParam("address") String address,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {
        try {
            RequestModel request = new RequestModel();
            request.setUserId(userId);
            request.setTitle(title);
            request.setDescription(description);
            request.setAmount(amount);
            request.setLocation(location);
            request.setLatitude(latitude);
            request.setLongitude(longitude);
            request.setAddress(address);
            request.setType(type);

            if (!requestService.create(request)) {
                return ResponseEntity.status(400).build();
            }

            if (photo != null) {
                return requestService.uploadPhoto(request.getId(), photo);
            }

            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestModel> get(@PathVariable int id) {
        return requestService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<RequestModel>> getAll() {
        return ResponseEntity.ok(requestService.getAll());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RequestModel> update(@PathVariable int id, @RequestBody RequestModel entity) {
        boolean updated = requestService.updateById(id, entity);
        return updated ? ResponseEntity.ok(entity) : ResponseEntity.status(404).build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        return requestService.delete(id)
                ? ResponseEntity.ok("Request deleted successfully")
                : ResponseEntity.status(404).body("Request not found");
    }

    @GetMapping("/search")
    public ResponseEntity<List<RequestModel>> search(@RequestParam String query) {
        return requestService.search(query);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return requestService.count();
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> exists(@PathVariable int id) {
        return requestService.exists(id);
    }

    //  New: Requests by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RequestModel>> getByUser(@PathVariable int userId) {
        return requestService.getByUser(userId);
    }

    //  New: Requests by location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<RequestModel>> getByLocation(@PathVariable String location) {
        return requestService.getByLocation(location);
    }

    //  New: Requests by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<RequestModel>> getByStatus(@PathVariable String status) {
        return requestService.getByStatus(status);
    }

    //  New: Upload photo for request
    @PostMapping(value = "/{id}/photo", consumes = { "multipart/form-data" })
    public ResponseEntity<RequestModel> uploadPhoto(@PathVariable int id,
            @RequestParam("photo") MultipartFile photo) {
        return requestService.uploadPhoto(id, photo);
    }
}
