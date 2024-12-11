//package org.example.controller;
//import org.example.entity.OrderDetailEntity;
//import org.example.service.OrderDetailService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.example.dto.OrderDetailRequest;
//import java.util.List;
//import java.util.Map;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/orderdetail")
//public class OrderDetailController {
//
//    @Autowired
//    private OrderDetailService orderDetailService;
//
//    @PostMapping("/create")
//    public ResponseEntity<OrderDetailEntity> createOrderDetail(@RequestBody Map<String, Object> payload) {
//        // 確保 mealId 是 List<Integer>，並轉換數據
//        List<Integer> mealIds = (List<Integer>) payload.get("mealId");
//        String mealOption = (String) payload.get("mealOption");
//        String quantity = (String) payload.get("quantity");
//
//        if (mealIds == null || mealIds.isEmpty() || mealOption == null || quantity == null) {
//            return ResponseEntity.badRequest().body(null); // 請求數據不完整
//        }
//
//        // 調用服務邏輯
//        OrderDetailEntity orderDetail = orderDetailService.createOrderDetail(mealIds, mealOption, quantity);
//        return ResponseEntity.ok(orderDetail);
//    }
//}
