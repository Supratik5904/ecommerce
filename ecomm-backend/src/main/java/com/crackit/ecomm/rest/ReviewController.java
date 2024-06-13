package com.crackit.ecomm.rest;

import com.crackit.ecomm.entity.Review;
import com.crackit.ecomm.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/")
    public List<Review> productReview(@RequestParam("productId") Long productId){
        return reviewService.findReviewsByProduct(productId);
    }

    @PostMapping("/productReviews")
    public Review addReview(@RequestBody Review review,@RequestParam("productId") Long productId){
        if(review.getReview().isEmpty() && Objects.isNull(review.getRating())){
            System.out.println("Please Enter Some review");
            return null;
        }
        return reviewService.addReviewComment(review,productId);
    }
}



