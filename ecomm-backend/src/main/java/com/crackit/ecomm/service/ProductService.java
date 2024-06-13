package com.crackit.ecomm.service;

import com.crackit.ecomm.dao.ProductRepository;
import com.crackit.ecomm.dao.SubCategoryRepository;
import com.crackit.ecomm.entity.Product;
import com.crackit.ecomm.entity.SubCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    public Product addProduct(Product product){
        SubCategory category = product.getCategory();
        SubCategory categoryEntity = subCategoryRepository.findSubCategoriesBySubCategoryName(category.getSubCategoryName());
        product.setCategory(categoryEntity);
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long productId){
        productRepository.deleteById(productId);
    }

    public Product getProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElse(null);
    }

    public Product editProduct(Product product){
        Product exisitngEntity = productRepository.findById(product.getProductId()).get();
        exisitngEntity.setCategory(product.getCategory());
        exisitngEntity.setProductName(product.getProductName());
        exisitngEntity.setProductDescription(product.getProductDescription());
        exisitngEntity.setProductDiscountPrice(product.getProductDiscountPrice());
        exisitngEntity.setProductPrice(product.getProductPrice());
        exisitngEntity.setProductImages(product.getProductImages());
        return productRepository.save(product);
    }

    public List<Product> getProductDetails(List<Long> productIdList) {
        return productRepository.findAllById(productIdList);
    }

    public List<Product> getAllProductsBySearchKeyPaginated(Pageable pageable, String key) {
        return  productRepository.getProductsByProductNameContainsIgnoreCaseOrProductDescriptionContainingIgnoreCase(pageable,key,key);
    }

    public List<Product> getAllProductsBySearchKey(String key) {
        return  productRepository.getProductsByProductNameContainsIgnoreCaseOrProductDescriptionContainingIgnoreCase(key,key);
    }

    public List<Product> getAllProductsByCategory(Pageable pageable, String categoryName) {
        return productRepository.getProductsByCategory_SubCategoryNameContainingIgnoreCase(pageable,categoryName);
    }

    public List<Product> getRandProducts(Long categoryId) {
        return productRepository.getRandomProductsByCategory(categoryId);
    }
}
