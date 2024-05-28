package com.crackit.SpringSecurityJWT.rest;

import com.crackit.SpringSecurityJWT.entity.Product;
import com.crackit.SpringSecurityJWT.entity.ProductImage;
import com.crackit.SpringSecurityJWT.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public String fromProduct(){
        return "From Product";
    }

    @PostMapping
    @RequestMapping(value = "/add",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasRole('ADMIN')")
    public Product addProduct(@RequestPart("product") Product product , @RequestPart("imageFile")MultipartFile[] file){
        try {
            Set<ProductImage> imageSet = uploadImage(file);
            product.setProductImages(imageSet);
            return productService.addProduct(product);
        }catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

    public Set<ProductImage> uploadImage(MultipartFile[] files) throws IOException {
        Set<ProductImage> imageSet = new HashSet<>();
        for(MultipartFile file: files){
            ProductImage image = ProductImage.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .picture(file.getBytes())
                    .build();
            imageSet.add(image);
        }
        return imageSet;
    }
}
