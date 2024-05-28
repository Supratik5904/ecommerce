package com.crackit.SpringSecurityJWT.dao;

import com.crackit.SpringSecurityJWT.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product,Long> {
}
