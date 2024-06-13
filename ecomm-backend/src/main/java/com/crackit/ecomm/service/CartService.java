package com.crackit.ecomm.service;

import com.crackit.ecomm.config.JwtAuthFilter;
import com.crackit.ecomm.dao.CartProductEntityRepository;
import com.crackit.ecomm.dao.CartRepository;
import com.crackit.ecomm.dao.ProductRepository;
import com.crackit.ecomm.entity.Cart;
import com.crackit.ecomm.entity.CartProductEntity;
import com.crackit.ecomm.entity.CartProductInput;
import com.crackit.ecomm.entity.Product;
import com.crackit.ecomm.user.User;
import com.crackit.ecomm.user.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CartService {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartProductEntityRepository cartProductEntityRepository;

    public Cart addProductsToCart(Long productId, Long quantity) {
        User user = userRepository.findUserByUserName(JwtAuthFilter.CURR_USER).get();
        Optional<Product> productEntity  = productRepository.findById(productId);
        Optional<Cart> existingCartEntity = getCartDetails();
        if(!existingCartEntity.isPresent()){
            Cart cart = new Cart();
            cart.setUser(user);
            List<CartProductEntity> cartProductEntities = new ArrayList<>();
            if(productEntity.isPresent()){
                CartProductEntity cartProductEntity = new CartProductEntity();
                cartProductEntity.setProduct(productEntity.get());
                cartProductEntity.setQuantity(quantity);
                cartProductEntities.add(cartProductEntityRepository.save(cartProductEntity));
            }
            cart.setCartProductQuantities(cartProductEntities);
            return cartRepository.save(cart);
        }else{
            List<CartProductEntity> cartProductEntities = existingCartEntity.get().getCartProductQuantities();
            if(productEntity.isPresent()){
                Optional<CartProductEntity> exisitingItems = cartProductEntities.stream()
                        .filter(item-> Objects.equals(item.getProduct().getProductId(), productId))
                        .findAny();
                if(exisitingItems.isPresent()){
                    if(quantity == 0){
                        cartProductEntities.remove(exisitingItems.get());
                    }else {
                        exisitingItems.get().setQuantity(quantity);
                    }
                }else {
                    CartProductEntity cartProductEntity = new CartProductEntity();
                    cartProductEntity.setProduct(productEntity.get());
                    cartProductEntity.setQuantity(quantity);
                    cartProductEntities.add(cartProductEntityRepository.save(cartProductEntity));
                }
            }
            return cartRepository.save(existingCartEntity.get());
        }

    }


    public Optional<Cart> getCartDetails() {
        User user = userRepository.findUserByUserName(JwtAuthFilter.CURR_USER).get();
        return cartRepository.findCartByUser(user);
    }

}
