package com.crackit.ecomm.rest;

import com.crackit.ecomm.entity.OrderDetail;
import com.crackit.ecomm.entity.OrderInput;
import com.crackit.ecomm.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping("/placeOrder")
    @PreAuthorize("hasRole('MEMBER')")
    public OrderDetail placeOrder(@RequestBody OrderInput orderInput , @RequestParam(name ="cartCheckOut",defaultValue = "false") boolean cartCheckout){
        return orderDetailService.placeOrder(orderInput,cartCheckout);
    }

    @GetMapping
    @PreAuthorize("hasRole('MEMBER')")
    public List<OrderDetail> getOrdersByUser(){
      return orderDetailService.getOrdersByLoggedInUser();
    }

    @GetMapping("/{id}")
    public OrderDetail getOrderById(@PathVariable("id") Long orderId){
        return orderDetailService.getOrderDetailsById(orderId);
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderDetail> getAllOrders(){
        return orderDetailService.getALlOrders();
    }

    @PutMapping("/{orderId}")
    public void changeOrderStatus (@PathVariable("orderId") Long orderId,@RequestBody String status){
        orderDetailService.changeOrderStatus(orderId,status);
    }
}
