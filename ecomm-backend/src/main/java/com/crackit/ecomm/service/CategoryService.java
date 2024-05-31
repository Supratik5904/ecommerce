package com.crackit.ecomm.service;

import com.crackit.ecomm.dao.CategoryRepository;
import com.crackit.ecomm.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }
}
