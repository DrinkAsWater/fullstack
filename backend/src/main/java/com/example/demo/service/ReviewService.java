package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Product;
import com.example.demo.model.Review;
import com.example.demo.model.User;
import com.example.demo.request.CreateReviewRequest;

public interface ReviewService {

	Review createReview(CreateReviewRequest req, User user, Product product);

	List<Review> getReviewByProductId(Long productId);

	Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception;
	
	void deleteReview(Long reviewId,Long userId) throws Exception;
	
	Review getReviewById(Long reviewId) throws Exception;

}
