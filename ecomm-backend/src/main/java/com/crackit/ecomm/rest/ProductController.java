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
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    @RequestMapping(value = "/post")
    @PreAuthorize("hasAuthority('admin:create')")
    public String fromProduct(){
        return "From Product";
    }

    @PostMapping
    @RequestMapping(value = "/add",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAuthority('admin:create')")
    public Product addProduct(@RequestPart("product") Product product ,@RequestPart("image") MultipartFile[] file){
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

    @GetMapping("/allProducts")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable("productId") Long productId){
        return productService.getProductById(productId);
    }

    @PutMapping
    @RequestMapping(value = "/update",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product updateProductById(@RequestPart("product") Product product ,@RequestPart("image") MultipartFile[] file){
        Set<ProductImage> imageSet = null;
        try {
            imageSet = uploadImage(file);
            product.setProductImages(imageSet);
            return productService.editProduct(product);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/deleteProduct/{productId}")
    @PreAuthorize("hasAuthority('admin:create')")
    public void deleteProduct(@PathVariable("productId") Long productId){
        productService.deleteProduct(productId);
    }
}
