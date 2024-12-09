package org.example.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import org.example.repository.StoreInfoRepo;
import org.example.entity.StoreInfoEntity;

@Service
public class StoreInfoService {

    @Autowired
    private StoreInfoRepo storeInfoRepo;


    public List<StoreInfoEntity> getAllStore() {
        return storeInfoRepo.findAll();
    }

    /**
     * 根据城市 ID 获取所有店家信息
     * @param city_id 城市 ID
     * @return 店家列表
     */
    public List<StoreInfoEntity> getStoresByCityId(String city_id) {
        return storeInfoRepo.findByCity_CityId(city_id);
    }

    public List<StoreInfoEntity> getStoreByCityAndSite(String city_id, String site_id) {
        return storeInfoRepo.findByCityCityIdAndSiteId(city_id,site_id);
    }

}
