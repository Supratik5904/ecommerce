package com.crackit.ecomm.dao;

import com.crackit.ecomm.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findCategoriesByCategoryName(@Param("categoryName") String categoryName);
}
