package org.example.controller;
import org.example.entity.UserInfoEntity;
import org.example.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @PostMapping("/addUser")
    public ResponseEntity<UserInfoEntity> addUser(@RequestBody UserInfoEntity user) {
        UserInfoEntity createduser = userInfoService.addUser(user);
        return new ResponseEntity<>(createduser, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserInfoEntity> getUser(@PathVariable int id) {
        Optional<UserInfoEntity> user = userInfoService.getUserById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/byMail")
    public ResponseEntity<UserInfoEntity> getUserByMail(@RequestParam String mail) {
        Optional<UserInfoEntity> user = userInfoService.getUserByMail(mail);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserInfoEntity> updateUser(@PathVariable int id, @RequestBody UserInfoEntity userDetails) {
        UserInfoEntity updatedUser = userInfoService.updateUser(id, userDetails);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }


}
