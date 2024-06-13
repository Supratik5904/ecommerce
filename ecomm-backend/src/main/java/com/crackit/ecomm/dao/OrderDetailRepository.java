package com.crackit.ecomm.dao;

import com.crackit.ecomm.entity.OrderDetail;
import com.crackit.ecomm.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
    List<OrderDetail> findByUser(User user);
}
