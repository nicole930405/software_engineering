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

    //用縣市找店家
    @GetMapping("/byCity/{city_id}")
    public List<StoreInfoEntity> geyStoreByCity(@PathVariable String city_id) {
        return storeInfoService.getStoresByCityId(city_id);
    }

    //用縣市和區域找店家
    @GetMapping("/byCitySite")
    public List<StoreInfoEntity> getStoreByCitySite(
            @RequestParam String city_id,
            @RequestParam int site_id) {
        return storeInfoService.getStoreByCityAndSite(city_id, site_id);
    }
}
