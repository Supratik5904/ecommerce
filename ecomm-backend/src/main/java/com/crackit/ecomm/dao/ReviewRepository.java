package com.crackit.ecomm.dao;

import com.crackit.ecomm.entity.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findReviewByProduct_ProductId(Long productId);
}
