package org.example.controller;
import org.example.entity.StoreInfoEntity;
import org.example.service.StoreInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import org.example.dto.StoreRequest;

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
    public List<StoreInfoEntity> getStoreByCitySite(@RequestBody StoreRequest request) {
        String cityId = request.getCity_id();
        String siteId = request.getSite_id();

        return storeInfoService.getStoreByCityAndSite(cityId, siteId);
    }

}

