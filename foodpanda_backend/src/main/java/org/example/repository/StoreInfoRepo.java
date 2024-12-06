package org.example.repository;
import org.example.entity.StoreInfoEntity;
import org.example.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface StoreInfoRepo extends JpaRepository<StoreInfoEntity, Integer> {
    List<StoreInfoEntity> findByCity_Name(String cityName);
    List<StoreInfoEntity> findByCityId(String cityId); // 按照城市 ID 查询店家
    List<StoreInfoEntity> findByCityIdAndStoreId(String cityId, int storeId);

}
