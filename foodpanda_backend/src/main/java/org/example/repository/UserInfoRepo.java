package org.example.repository;
import org.example.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserInfoRepo extends JpaRepository<UserInfoEntity, Integer> {

    Optional<UserInfoEntity> findByMail(String mail); // 根據 mail 查找使用者
}

