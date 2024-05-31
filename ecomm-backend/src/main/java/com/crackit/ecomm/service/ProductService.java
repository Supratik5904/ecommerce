package com.crackit.ecomm.service;

import com.crackit.ecomm.dao.CategoryRepository;
import com.crackit.ecomm.dao.ProductRepository;
import com.crackit.ecomm.entity.Category;
import com.crackit.ecomm.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public Product addProduct(Product product){
        Category category = product.getCategory();
        Optional<Category> categoryEntity = categoryRepository.findCategoriesByCategoryName(category.getCategoryName());
        product.setCategory(categoryEntity.get());
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long productId){
        productRepository.deleteById(productId);
    }
}
