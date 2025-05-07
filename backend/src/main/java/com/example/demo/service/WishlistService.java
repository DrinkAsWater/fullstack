package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.model.Wishlist;

public interface  WishlistService {
	Wishlist createWishlist(User user);
	
	Wishlist getWishlistByUserId(User user);
	
	Wishlist addProductToWishlist(User user,Product product );
	

}
