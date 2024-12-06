package org.example.service;
import org.example.entity.StoreInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import org.example.repository.MenuInfoRepo;
import org.example.entity.MenuInfoEntity;

@Service
public class MenuInfoService {

    @Autowired
    private MenuInfoRepo menuInfoRepo;

    /**
     * 根据店家 ID 获取所有菜單信息
     * @param storeId 城市 ID
     * @return 店家列表
     */
    public List<MenuInfoEntity> getMenuByStoreId(int storeId) {
        return menuInfoRepo.findByStore_StoreId(storeId);
    }

}
