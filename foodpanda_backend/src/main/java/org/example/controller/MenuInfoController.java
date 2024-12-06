package org.example.controller;
import org.example.entity.MenuInfoEntity;
import org.example.service.MenuInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/menu")
public class MenuInfoController {
    @Autowired
    private MenuInfoService menuInfoService;

    @GetMapping("/byStoreId/{store_id}")
    public List<MenuInfoEntity> getMenuByStoreId(@PathVariable("store_id") int store_id) {
        return menuInfoService.getMenuByStoreId(store_id);
    }
}
