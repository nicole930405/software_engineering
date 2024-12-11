package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;

@Entity
@Table(name = "city")
@Data
@ToString(exclude = {"store", "site"})
public class CityEntity {
    @Id
    @Column(name = "city_id")
    private String cityId;

    @Column(name = "city")
    private String name;

    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StoreInfoEntity> store;

    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SiteEntity> site;
}
