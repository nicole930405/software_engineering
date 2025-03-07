package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "store_info")
@Data
@ToString(onlyExplicitlyIncluded = true)
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
    @JsonIgnore
    private CityEntity city;

    @ManyToOne
    @JoinColumn(name = "site_id", nullable = false) // 外鍵名稱與資料庫一致
    @JsonIgnore
    private SiteEntity site;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Include // 避免循環引用
    @JsonIgnore
    private List<OrderInfoEntity> orders;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Include // 避免循環引用
    @JsonIgnore
    private List<MenuInfoEntity> menu;

    @Override
    public String toString() {
        return "StoreInfoEntity{" +
                "storeId=" + storeId +
                ", store_name='" + store_name + '\'' +
                ", store_address='" + store_address + '\'' +
                ", store_type='" + store_type + '\'' +
                ", orders_count=" + (orders != null ? orders.size() : 0) +
                ", menu_count=" + (menu != null ? menu.size() : 0) +
                '}';
    }

}
