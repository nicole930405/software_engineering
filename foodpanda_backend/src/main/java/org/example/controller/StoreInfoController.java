package org.example.controller;
import org.example.entity.StoreInfoEntity;
import org.example.service.StoreInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/store")
public class StoreInfoController {

    @Autowired
    private StoreInfoService storeInfoService;

    //用縣市找店家
    @PostMapping("/byCity")
    public List<StoreInfoEntity> getStoreByCity(@RequestBody Map<String, String> request) {
        String cityId = request.get("city_id");
        return storeInfoService.getStoresByCityId(cityId);
    }

    //用縣市和區域找店家
    @PostMapping("/byCitySite")
    public List<StoreInfoEntity> getStoreByCitySite(@RequestBody Map<String, Object> request) {
        String cityId = (String) request.get("city_id");
        String siteId = (String) request.get("site_id");
        return storeInfoService.getStoreByCityAndSite(cityId, siteId);
    }
}

