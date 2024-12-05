package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;

@Entity
@Table(name = "menu_info")
@Data
public class MenuInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private int menu_id;

    @Column(name = "menu_name")
    private String menu_name;

    @Column(name = "menu_price")
    private int menu_price;

    @Column(name = "menu_label")
    private String menu_label;

    @Column(name = "menu_option")
    private String menu_option;
}
