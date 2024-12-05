package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import org.example.entity.UserInfoEntity;

@Entity
@Table(name = "order_info")
@Data
public class OrderInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int order_id;

    @Column(name = "stste")
    private String state;

    @Column(name = "time")
    private String time;

    @Column(name = "payment_method")
    private String payment_method;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "how_to_take")
    private String how_to_take;

    @Column(name = "tips")
    private String tips;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserInfoEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private StoreInfoEntity store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_id", nullable = false)
    private DeliveryInfoEntity delivery;
}
