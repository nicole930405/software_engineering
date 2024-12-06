package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;

@Entity
@Table(name = "site")
@Data
public class SiteEntity {
    @Id
    @Column(name = "site_id")
    private String site_id;

    @Column(name = "site")
    private String site;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)  // 這是外鍵，指向 CityEntity 的主鍵
    private CityEntity city;

}
