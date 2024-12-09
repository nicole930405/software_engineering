package org.example.dto;
import lombok.Data;
import java.util.List;

/**
 * DTO 用於接收前端發送的訂單詳情請求
 */
@Data
public class OrderDetailRequest {
    private List<Integer> mealId;
    private String mealOption;
    private String quantity;
}
