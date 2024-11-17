package org.example.model;
import lombok.Data;

@Data
public class UserInfoModel {
    private int user_id;
    private String user_name;
    private String password;
    private String mail;
    private String phone_number;
    private String address;
}
