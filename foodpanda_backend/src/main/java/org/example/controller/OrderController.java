package org.example.controller;
import org.example.entity.OrderInfoEntity;
import org.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.dto.orderRequest;
import org.example.entity.MenuInfoEntity;
import org.example.repository.MenuInfoRepo;
import java.util.List;
import org.example.entity.UserInfoEntity;
import org.example.entity.StoreInfoEntity;
import org.example.repository.UserInfoRepo;
import org.example.repository.StoreInfoRepo;

import java.util.Map;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/orders")
public class OrderController {

   @Autowired
    private OrderService orderService;
    @Autowired
   private MenuInfoRepo menuInfoRepo;
    @Autowired
   private StoreInfoRepo storeInfoRepo;
    @Autowired
   private UserInfoRepo userInfoRepo;

    @PostMapping("/getbyuser")
    public List<OrderInfoEntity> getByUser(@RequestBody Map<String,Integer> request) {
        Integer userId = request.get("userId");
        List<OrderInfoEntity>  order = orderService.getOrderByUserId(userId);
        return orderService.getOrderByUserId(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody orderRequest orderRequest) {
        try {
            // 呼叫 OrderService 保存訂單
            List<OrderInfoEntity> savedOrders = orderService.saveOrder(orderRequest);
            return ResponseEntity.ok(savedOrders);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

}
