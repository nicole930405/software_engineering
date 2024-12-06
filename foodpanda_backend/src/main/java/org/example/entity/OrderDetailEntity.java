package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;
import java.io.Serializable;
import org.example.compositeKey.ordermealKey;

@Entity
@Table(name = "order_detail")
@Data
public class OrderDetailEntity {
    @EmbeddedId
    private ordermealKey id;

    @Column(name = "meal_option")
    private String meal_option;
}
