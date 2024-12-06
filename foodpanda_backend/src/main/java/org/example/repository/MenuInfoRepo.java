package org.example.repository;
import org.example.entity.MenuInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuInfoRepo extends JpaRepository<MenuInfoEntity, Integer> {
    List<MenuInfoEntity> findByStore_StoreId(int storeId);
}
