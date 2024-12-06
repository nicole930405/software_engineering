package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.ToString;
import java.util.List;
import java.io.Serializable;
import org.example.compositeKey.storemealKey;

@Entity
@Table(name = "menu_info")
@Data
public class MenuInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id")
    private int meal_id;

    @Column(name = "meal_name")
    private String meal_name;

    @Column(name = "meal_price")
    private int meal_price;

    @Column(name = "meal_label")
    private String meal_label;

    @Column(name = "meal_option")
    private String meal_option;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "storeId", nullable = false)
    @JsonIgnore
    private StoreInfoEntity store;


}
