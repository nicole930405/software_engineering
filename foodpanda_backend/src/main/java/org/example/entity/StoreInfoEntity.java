package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;

@Entity
@Table(name = "store_info")
@Data
public class StoreInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private int storeId;

    @Column(name = "store_name")
    private String store_name;

    @Column(name = "store_address")
    private String store_address;

    @Column(name = "store_type")
    private String store_type;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false) // 外鍵名稱與資料庫一致
    private CityEntity city;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // 避免循環引用
    private List<OrderInfoEntity> orders;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // 避免循環引用
    private List<MenuInfoEntity> menu;

}
