package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;

@Entity
@Table(name = "city")
@Data
public class CityEntity {
    @Id
    @Column(name = "city_id")
    private String city_id;

    @Column(name = "city")
    private String city;

    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StoreInfoEntity> stores;

    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StoreInfoEntity> site;
}
