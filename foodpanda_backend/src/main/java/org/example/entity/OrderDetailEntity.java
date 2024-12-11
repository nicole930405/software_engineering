//package org.example.entity;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.ToString;
//import java.util.List;
//import java.io.Serializable;
//import org.example.compositeKey.ordermealKey;
//
//@Entity
//@Table(name = "order_detail")
//@Data
//public class OrderDetailEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "detail_id")
//    private Integer detailId;
//
//    @Column(name = "meal_option")
//    private String mealOption;
//
//    @Column(name = "quantity")
//    private String quantity;
//
//    @ManyToMany
//    @JoinTable(
//            name = "order_detail_meal", // 中間表名稱
//            joinColumns = @JoinColumn(name = "detail_id"), // 關聯到本表的主鍵
//            inverseJoinColumns = @JoinColumn(name = "meal_id") // 關聯到 MenuInfoEntity 的主鍵
//    )
//    @JsonIgnore
//    private List<MenuInfoEntity> meals;
//
////    @OneToOne(mappedBy = "orderdetail", cascade = CascadeType.ALL, orphanRemoval = true)
////    @ToString.Exclude // 避免循環引用
////    private OrderInfoEntity order;
//}
