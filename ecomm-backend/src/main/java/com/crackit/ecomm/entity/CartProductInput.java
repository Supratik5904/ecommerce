package com.crackit.ecomm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartProductInput {
    private Long productId;
    private Long quantity;
}
