package com.crackit.ecomm.service;

import com.crackit.ecomm.dao.CategoryRepository;
import com.crackit.ecomm.dao.SubCategoryRepository;
import com.crackit.ecomm.entity.Category;
import com.crackit.ecomm.entity.SubCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public SubCategory addSubCategory(SubCategory subCategory) {
        Optional<Category> parentCategory=  categoryRepository.findCategoriesByCategoryNameContainingIgnoreCase(subCategory.getCategory().getCategoryName());
        if(parentCategory.isPresent()){
            subCategory.setCategory(parentCategory.get());
            return subCategoryRepository.save(subCategory);
        }
        return null;
    }

    public List<SubCategory> findSubCategoriesForParent(String parentCategoryName) {
        Optional<Category> parentCategory=  categoryRepository.findCategoriesByCategoryNameContainingIgnoreCase(parentCategoryName);
        if(parentCategory.isPresent()){
            return subCategoryRepository.findSubCategoriesByCategory(parentCategory.get());
        }else{
            return Collections.emptyList();
        }

    }

    public List<SubCategory> findSubCategories() {
        return subCategoryRepository.findAll();
    }
}
