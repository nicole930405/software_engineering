package org.example.service;
import org.example.entity.OrderInfoEntity;
import org.example.entity.StoreInfoEntity;
import org.example.entity.MenuInfoEntity;
import org.example.entity.UserInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.repository.UserInfoRepo;
import org.example.repository.StoreInfoRepo;
import org.example.repository.MenuInfoRepo;
import org.example.dto.orderRequest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.example.repository.OrderRepo;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private UserInfoRepo userInfoRepo;

    @Autowired
    private StoreInfoRepo storeInfoRepo;

    @Autowired
    private MenuInfoRepo menuInfoRepo;

    public List<OrderInfoEntity> saveOrder(orderRequest orderRequest) {
        // 查找關聯的 User 和 Store
        UserInfoEntity user = userInfoRepo.findById(orderRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        StoreInfoEntity store = storeInfoRepo.findById(orderRequest.getStoreId())
                .orElseThrow(() -> new RuntimeException("Store not found"));



        // 創建新的訂單列表
        List<OrderInfoEntity> orders = new ArrayList<>();

        // 迭代 meal_id，為每個 meal_id 創建新的訂單

            // 創建新的 OrderInfoEntity 並設置資料
            OrderInfoEntity order = new OrderInfoEntity();
            order.setState(orderRequest.getState());
            order.setTime(orderRequest.getTime());
            order.setPayment_method(orderRequest.getPayment_method());
            order.setName(orderRequest.getName());
            order.setPhone(orderRequest.getPhone());
            order.setAddress(orderRequest.getAddress());
            order.setHow_to_take(orderRequest.getHow_to_take());
            order.setTips(orderRequest.getTips());
            order.setMeal_content(orderRequest.getMeal_content());
            order.setUser(user);
            order.setStore(store);

            // 添加至訂單列表
            orders.add(order);


        // 保存訂單列表
        return orderRepo.saveAll(orders);
    }

}