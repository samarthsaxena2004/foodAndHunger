package com.foodandhunger.backend.controller;

import com.foodandhunger.backend.models.DonorModel;
import com.foodandhunger.backend.services.DonorService;
import com.foodandhunger.backend.structures.ControllerStruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/donor")
public class DonorController implements ControllerStruct<DonorModel> {
    @Autowired
    DonorService donorService ;

    @Override
    @RequestMapping("/add")
    public ResponseEntity<String> create(@RequestBody DonorModel entity) {
        return null;
    }

    @Override
    @RequestMapping("/get")
    public ResponseEntity<DonorModel> get(@RequestBody int id) {
        return null;
    }

    @Override
    @RequestMapping("/get_all")
    public ResponseEntity<List<DonorModel>> getAll() {
        return null;
    }

    @Override
    @RequestMapping("/update")
    public ResponseEntity<DonorModel> update(@RequestBody DonorModel entity) {
        return null;
    }

    @Override
    @RequestMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody int id) {
        return null;
    }

    @Override
    @RequestMapping("/search")
    public ResponseEntity<List<DonorModel>> search(@RequestBody String query) {
        return null;
    }

    @Override
    @RequestMapping("/count")
    public ResponseEntity<Long> count() {
        return null;
    }

    @Override
    @RequestMapping("/isExists")
    public ResponseEntity<Boolean> exists(@RequestBody int id) {
        return null;
    }

}
