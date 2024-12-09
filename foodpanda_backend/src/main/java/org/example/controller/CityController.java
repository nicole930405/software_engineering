package org.example.controller;
import org.example.entity.SiteEntity;
import org.example.service.CityService;
import org.example.service.MenuInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/city")
public class CityController {
    @Autowired
    private CityService cityService;

    @PostMapping("/getSite")
    public ResponseEntity<List<SiteEntity>> getSiteByCityId(@RequestBody Map<String,String> request){
        String cityId = request.get("cityId");
        if(cityId == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        List<SiteEntity> site = cityService.getSiteByCityId(cityId);
        return ResponseEntity.ok(site);
    }
}
