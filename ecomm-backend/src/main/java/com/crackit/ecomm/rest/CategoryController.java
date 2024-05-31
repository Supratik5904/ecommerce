package com.crackit.ecomm.rest;

import com.crackit.ecomm.entity.Category;
import com.crackit.ecomm.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/category")
@PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping(value = "/addCategory")
    @PreAuthorize("hasAuthority('admin:create')")
    public Category addCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

}
