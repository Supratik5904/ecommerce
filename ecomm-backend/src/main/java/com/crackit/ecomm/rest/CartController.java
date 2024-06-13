package com.crackit.ecomm.rest;

import com.crackit.ecomm.entity.Cart;
import com.crackit.ecomm.entity.CartProductInput;
import com.crackit.ecomm.entity.Product;
import com.crackit.ecomm.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @PostMapping("/addToCart")
    public Cart addToCart(@RequestBody  CartProductInput cartProductInput){
        return cartService.addProductsToCart(cartProductInput.getProductId(),cartProductInput.getQuantity());
    }

    @GetMapping
    public Cart getCartDetails(){
        Optional<Cart> cart = cartService.getCartDetails();
        return cart.orElseGet(Cart::new);
    }

}
