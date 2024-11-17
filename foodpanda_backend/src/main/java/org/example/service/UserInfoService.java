package org.example.service;
import org.example.entity.UserInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.example.repository.UserInfoRepo;
import org.example.entity.UserInfoEntity;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepo userInfoRepo;

    public UserInfoEntity addUser(UserInfoEntity user) {
        return userInfoRepo.save(user);
    }

    public List<UserInfoEntity> getAllUsers() {
        return userInfoRepo.findAll();
    }

    public Optional<UserInfoEntity> getUserById(int id) {
        return userInfoRepo.findById(id);
    }

    public Optional<UserInfoEntity> getUserByMail(String mail) {
        return userInfoRepo.findByMail(mail);
    }

    public UserInfoEntity updateUser(int userId, UserInfoEntity userDetails) {
        return userInfoRepo.findById(userId).map(user -> {
            user.setUser_name(userDetails.getUser_name());
            user.setPassword(userDetails.getPassword());
            user.setMail(userDetails.getMail());
            user.setPhone_number(userDetails.getPhone_number());
            user.setAddress(userDetails.getAddress());
            return userInfoRepo.save(user);
        }).orElseGet(() -> {
            userDetails.setUser_id(userId);
            return userInfoRepo.save(userDetails);
        });
    }

    public void deleteUser(int userId) {
        userInfoRepo.deleteById(userId);
    }


}
