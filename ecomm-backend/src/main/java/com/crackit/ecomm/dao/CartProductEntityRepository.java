package com.crackit.ecomm.dao;

import com.crackit.ecomm.entity.CartProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartProductEntityRepository extends JpaRepository<CartProductEntity,Long> {
}
