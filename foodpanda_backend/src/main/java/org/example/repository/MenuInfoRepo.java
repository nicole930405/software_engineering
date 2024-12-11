package org.example.repository;
import org.example.entity.MenuInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuInfoRepo extends JpaRepository<MenuInfoEntity, Integer> {
    List<MenuInfoEntity> findByStore_StoreId(int storeId);

    @Query("SELECT m FROM MenuInfoEntity m WHERE m.id IN :ids")
    List<MenuInfoEntity> findByMealIds(@Param("ids") List<Integer> ids);}
