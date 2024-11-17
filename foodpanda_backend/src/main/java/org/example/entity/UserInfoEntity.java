package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_info")
@Data
public class UserInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;

    @Column(name = "user_name")
    private String user_name;

    @Column(name = "phone_number")
    private String phone_number;

    @Column(name = "mail")
    private String mail;

    @Column(name = "password")
    private String password;

    @Column(name = "address")
    private String address;

}
