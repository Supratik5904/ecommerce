package com.crackit.ecomm.service;

import com.crackit.ecomm.config.JwtAuthFilter;
import com.crackit.ecomm.dao.CartRepository;
import com.crackit.ecomm.dao.OrderDetailRepository;
import com.crackit.ecomm.dao.ProductRepository;
import com.crackit.ecomm.entity.*;
import com.crackit.ecomm.user.User;
import com.crackit.ecomm.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;

    public OrderDetail placeOrder(OrderInput orderInput,boolean cartCheckout){
        List<OrderProductQuantityMapping> orderProductQuantityMappings = new ArrayList<>();
        OrderDetail orderDetail =  new OrderDetail();
        orderDetail.setOrderContactNumber(orderInput.getContactNumber());
        orderDetail.setOrderAlternateContactNumber(orderInput.getAlternateContactNumber());
        orderDetail.setOrderFullOrder(orderInput.getFullAddress());
        List<OrderProductQuantity> orderProductQuantities = orderInput.getOrderProductQuantityList();
        double amount = 0d;
        for(OrderProductQuantity p: orderProductQuantities){
            Product product = productRepository.findById(p.getProductId()).get();
            OrderProductQuantityMapping orderProductQuantityMapping = new OrderProductQuantityMapping();
            orderProductQuantityMapping.setProduct(product);
            orderProductQuantityMapping.setQuantity(p.getQuantity());
            orderProductQuantityMapping.setOrderDetail(orderDetail);
            orderProductQuantityMappings.add(orderProductQuantityMapping);
            amount = amount+ (product.getProductDiscountPrice()*p.getQuantity());
        }
        orderDetail.setOrderAmount(amount);
        orderDetail.setProduct(orderProductQuantityMappings);
        orderDetail.setOrderStatus("PLACED");
        User loggedInuser = userRepository.findUserByUserName(JwtAuthFilter.CURR_USER).get();
        orderDetail.setUser(loggedInuser);
        orderDetail.setOrderFullName(loggedInuser.getFirstName() +" "+ loggedInuser.getFirstName());
        if(cartCheckout){
            Optional<Cart> cart = cartRepository.findCartByUser(loggedInuser);
            cart.ifPresent(value -> cartRepository.deleteById(value.getCartId()));
        }
        return orderDetailRepository.save(orderDetail);
    }

    public List<OrderDetail> getOrdersByLoggedInUser() {
        User loggedInUser = userRepository.findUserByUserName(JwtAuthFilter.CURR_USER).get();
        return orderDetailRepository.findByUser(loggedInUser);
    }

    public OrderDetail getOrderDetailsById(Long orderId) {
        return orderDetailRepository.findById(orderId).get();
    }

    public List<OrderDetail> getALlOrders() {
        return orderDetailRepository.findAll();
    }

    public void changeOrderStatus(Long orderId, String status) {
        Optional<OrderDetail> orderDetail = orderDetailRepository.findById(orderId);
        if(orderDetail.isPresent()){
            orderDetail.get().setOrderStatus(status.toUpperCase());
            orderDetailRepository.save(orderDetail.get());
        }
    }
}
