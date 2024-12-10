package org.example.controller;
import org.example.entity.SiteEntity;
import org.example.service.CityService;
import org.example.service.MenuInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/city")
public class CityController {
    @Autowired
    private CityService cityService;

    @GetMapping("/getSite")
    public ResponseEntity<List<Map<String, String>>> getSiteByCityId(@RequestParam("cityId") String cityId) {
        if (cityId == null || cityId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        List<SiteEntity> sites = cityService.getSiteByCityId(cityId);
        List<Map<String, String>> response = sites.stream()
                .map(site -> {
                    Map<String, String> siteData = new HashMap<>();
                    siteData.put("siteId", site.getId());
                    siteData.put("siteName", site.getSite());
                    return siteData;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

}
