package org.example.controller;
import org.example.entity.MenuInfoEntity;
import org.example.service.MenuInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/menu")
public class MenuInfoController {
    @Autowired
    private MenuInfoService menuInfoService;

    /**
     * 根据店家 ID 获取菜单列表
     * @param request 包含店家 ID 的请求体
     * @return 菜单列表
     */
    @PostMapping("/byStoreId")
    public List<MenuInfoEntity> getMenuByStoreId(@RequestBody Map<String, Integer> request) {
        Integer storeId = request.get("storeId");
        return menuInfoService.getMenuByStoreId(storeId);
    }
}
