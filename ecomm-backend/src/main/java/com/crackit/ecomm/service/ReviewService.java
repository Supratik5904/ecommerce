package com.crackit.ecomm.service;

import com.crackit.ecomm.dao.ProductRepository;
import com.crackit.ecomm.dao.ReviewRepository;
import com.crackit.ecomm.entity.Product;
import com.crackit.ecomm.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ProductRepository productRepository;
    public List<Review> findReviewsByProduct(Long productId) {
        return reviewRepository.findReviewByProduct_ProductId(productId);
    }

    public Review addReviewComment(Review review,Long productId){
        Optional<Product> product = productRepository.findById(productId);
        if(product.isPresent()) {
            review.setProduct(product.get());
            return reviewRepository.save(review);
        }else{
            return null;
        }
    }
}
