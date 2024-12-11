package org.example.dto;
import lombok.Data;
import org.example.entity.OrderInfoEntity;
import org.example.entity.MenuInfoEntity;
import org.example.entity.UserInfoEntity;
import org.example.entity.StoreInfoEntity;

import java.util.List;

@Data
public class orderRequest {
    private String state;
    private String time;
    private String payment_method;
    private String name;
    private String phone;
    private String address;
    private String how_to_take;
    private String tips;
    private String meal_content;
    private int userId;
    private int storeId;


    public OrderInfoEntity toEntity(List<MenuInfoEntity> meals, UserInfoEntity user, StoreInfoEntity store) {
        OrderInfoEntity order = new OrderInfoEntity();
        order.setState(this.state);
        order.setTime(this.time);
        order.setPayment_method(this.payment_method);
        order.setName(this.name);
        order.setPhone(this.phone);
        order.setAddress(this.address);
        order.setHow_to_take(this.how_to_take);
        order.setTips(this.tips);
        order.setUser(user);
        order.setStore(store);

        return order;
    }
}

