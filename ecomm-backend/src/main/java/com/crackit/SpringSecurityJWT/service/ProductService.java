package com.crackit.SpringSecurityJWT.service;

import com.crackit.SpringSecurityJWT.dao.ProductRepository;
import com.crackit.SpringSecurityJWT.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product){
        return productRepository.save(product);
    }
}
