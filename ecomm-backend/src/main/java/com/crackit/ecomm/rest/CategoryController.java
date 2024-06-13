package com.crackit.ecomm.rest;

import com.crackit.ecomm.entity.Category;
import com.crackit.ecomm.entity.SubCategory;
import com.crackit.ecomm.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getCategories(){
        return categoryService.getAllCategories();
    }

    @PostMapping(value = "/addCategory")
    @PreAuthorize("hasAuthority('admin:create')")
    public Category addCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

    @PostMapping(value = "/addSubCategory")
    @PreAuthorize("hasAuthority('admin:create')")
    public SubCategory addSubCategory(@RequestBody SubCategory category){
        return categoryService.addSubCategory(category);
    }
    @GetMapping(value = "/subCategoryByParent")
    public List<SubCategory> findSubCategoriesByParentCategory(@RequestParam("parentCategory") String parentCategory){
        return categoryService.findSubCategoriesForParent(parentCategory);
    }

    @GetMapping(value = "/subCategory")
    public List<SubCategory> findSubCategories(){
        return categoryService.findSubCategories();
    }
}
