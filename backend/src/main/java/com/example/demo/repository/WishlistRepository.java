package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
	
	Wishlist findByUserId(Long userId);
	
	

}
