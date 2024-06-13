package com.crackit.ecomm.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
public class OrderProductQuantity {
    private Long productId;
    private Long quantity;

    public OrderProductQuantity(Long productId, Long quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderProductQuantity that = (OrderProductQuantity) o;
        return Objects.equals(productId, that.productId) && Objects.equals(quantity, that.quantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, quantity);
    }

    @Override
    public String toString() {
        return "OrderProductQuantity{" +
                "productId=" + productId +
                ", quantity=" + quantity +
                '}';
    }
}
