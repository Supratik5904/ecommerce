package com.crackit.ecomm.dao;

import com.crackit.ecomm.entity.Category;
import com.crackit.ecomm.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory,Long> {
    List<SubCategory> findSubCategoriesByCategory(Category category);
    SubCategory findSubCategoriesBySubCategoryName(String name);
}
