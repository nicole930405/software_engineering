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

    @OneToMany(mappedBy = "site", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CityEntity> city;

}
