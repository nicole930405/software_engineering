package org.example.repository;
import org.example.entity.OrderInfoEntity;
import org.example.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<OrderInfoEntity, Integer> {
    List<OrderInfoEntity> findByUser_UserId(int userId);
}
