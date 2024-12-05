package org.example.controller;
import org.example.entity.StoreInfoEntity;
import org.example.service.StoreInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/store")
public class StoreInfoController {

    @Autowired
    private StoreInfoService storeInfoService;

    @GetMapping("/byCity/{city_id}")
    public List<StoreInfoEntity> geyStoreByCity(@PathVariable int city_id) {
        return storeInfoService.getStoresByCityId(city_id);
    }
}
