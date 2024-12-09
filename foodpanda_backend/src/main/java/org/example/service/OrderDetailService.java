package org.example.service;
import org.example.entity.OrderDetailEntity;
import org.example.entity.MenuInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.example.repository.OrderDetailRepo;
import org.example.repository.MenuInfoRepo;
import java.util.NoSuchElementException;

@Service
public class OrderDetailService {
    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Autowired
    private MenuInfoRepo menuInfoRepo;

    public OrderDetailEntity createOrderDetail(List<Integer> mealIds, String mealOption,String quantity){
        if (mealIds == null || mealIds.isEmpty()) {
            throw new IllegalArgumentException("Meal IDs cannot be null or empty");
        }

        List<MenuInfoEntity> meals = menuInfoRepo.findAllById(mealIds);
        if (meals.isEmpty()) {
            throw new NoSuchElementException("No meals found for the provided IDs");
        }
        OrderDetailEntity orderDetail = new OrderDetailEntity();
        orderDetail.setMealOption(mealOption);
        orderDetail.setMeals(meals);
        orderDetail.setQuantity(quantity);
        return orderDetailRepo.save(orderDetail);
    }

}
