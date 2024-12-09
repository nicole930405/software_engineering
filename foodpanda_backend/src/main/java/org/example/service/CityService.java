package org.example.service;
import org.example.entity.CityEntity;
import org.example.entity.SiteEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import org.example.repository.CityRepo;

@Service
public class CityService {
    @Autowired
    private CityRepo cityRepo;

    public List<SiteEntity> getSiteByCityId(String cityId) {
        CityEntity city = cityRepo.findByCityId((cityId));
        if(city == null) {
            throw new IllegalArgumentException("City with id " + cityId + " not found");
        }
        return city.getSite();
    }
}
