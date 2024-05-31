package com.crackit.ecomm.rest;

import com.crackit.ecomm.entity.Product;
import com.crackit.ecomm.entity.ProductImage;
import com.crackit.ecomm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private ProductService productService;

    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public String getAdmin() {
        return "Secured Endpoint :: GET - Admin controller";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    public String post() {
        return "Secured Endpoint :: POST - Admin controller";
    }

}
