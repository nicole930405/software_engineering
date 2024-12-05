package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;

@Entity
@Table(name = "delivery_info")
@Data
public class DeliveryInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private int delivery_id;

    @Column(name = "delivery_name")
    private String delivery_name;

    @Column(name = "phone_number")
    private String phone_number;

    @Column(name = "mail")
    private String mail;

    @Column(name = "password")
    private String password;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "delivery", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // 避免循環引用
    private List<OrderInfoEntity> orders;
}
