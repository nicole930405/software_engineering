package org.example.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.example.entity.UserInfoEntity;

import java.util.List;

@Entity
@Table(name = "order_info")
@Data
public class OrderInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int order_id;

    @Column(name = "state")
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

    @Column(name = "meal_content")
    private String meal_content;
    @Column(name = "meal_id")
    private String meal_id; // 儲存 meal_id 列表的字串形式

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserInfoEntity user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "store_id", nullable = false)
    private StoreInfoEntity store;



    @Override
    public String toString() {
        return "OrderInfoEntity{" +
                "order_id=" + order_id +
                ", state='" + state + '\'' +
                ", time='" + time + '\'' +
                ", payment_method='" + payment_method + '\'' +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", how_to_take='" + how_to_take + '\'' +
                ", tips='" + tips + '\'' +
                ", meal_content='" + meal_content + '\'' +
                ", store='" + store + '\'' +
                '}';
    }




}
