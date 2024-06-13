package com.crackit.ecomm.dao;

import com.crackit.ecomm.entity.Cart;
import com.crackit.ecomm.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
    Optional<Cart> findCartByUser(User user);
}
