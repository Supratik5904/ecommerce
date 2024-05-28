package com.crackit.SpringSecurityJWT.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name="product_image")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="productimage_id")
    private Long imageId;
    private String name;
    private String type;
    private byte[] picture;

    @ManyToMany(mappedBy = "productImages")
    private Set<Product> products;

}
