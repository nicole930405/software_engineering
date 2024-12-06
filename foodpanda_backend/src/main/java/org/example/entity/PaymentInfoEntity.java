package org.example.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.util.List;

@Entity
@Table(name = "payment_info")
@Data
public class PaymentInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;

    @Id
    @Column(name = "payment_id")
    private int payment_id;

    @Column(name = "payment_way")
    private String payment_way;

    @Column(name = "card_number")
    private String card_number;

    @Column(name = "payment_status")
    private int payment_status;

//    @OneToMany(mappedBy = "paymentInfo", cascade = CascadeType.ALL, orphanRemoval = true)
//    @ToString.Exclude // 避免循環引用
//    private List<OrderInfoEntity> orders;
}
