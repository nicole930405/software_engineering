package org.example.repository;
import org.example.entity.StoreInfoEntity;
import org.example.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface StoreInfoRepo extends JpaRepository<StoreInfoEntity, Integer> {
    List<UserInfoEntity> findByCity(String city);
    List<StoreInfoEntity> findByCityId(int cityId); // 按照城市 ID 查询店家

}
