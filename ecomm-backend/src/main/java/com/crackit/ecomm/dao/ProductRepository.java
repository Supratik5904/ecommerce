package com.crackit.ecomm.dao;

import com.crackit.ecomm.entity.Product;
import com.crackit.ecomm.entity.SubCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> getProductsByProductNameContainsIgnoreCaseOrProductDescriptionContainingIgnoreCase(@Param ("productName") String productName, @Param("productDescription") String productDescription);

    List<Product> getProductsByProductNameContainsIgnoreCaseOrProductDescriptionContainingIgnoreCase(Pageable pageable, @Param ("productName") String productName, @Param("productDescription") String productDescription);
    List<Product> getProductsByCategory_SubCategoryNameContainingIgnoreCase(Pageable pageable,String name);

    @Query(value = "SELECT * FROM products where category_id = :categoryId ORDER BY RAND() LIMIT 5 ",nativeQuery = true)
    List<Product> getRandomProductsByCategory(Long categoryId);
}
