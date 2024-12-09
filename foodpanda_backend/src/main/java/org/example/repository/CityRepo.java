package org.example.repository;
import org.example.entity.CityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepo extends JpaRepository<CityEntity, String> {
    CityEntity findByCityId(String cityId);
}
