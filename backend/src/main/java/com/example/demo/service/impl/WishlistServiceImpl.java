package com.example.demo.service.impl;

import org.springframework.stereotype.Service;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.model.Wishlist;
import com.example.demo.repository.WishlistRepository;
import com.example.demo.service.WishlistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {
	private final WishlistRepository wishlistRepository;
	@Override
	public Wishlist createWishlist(User user) {
		Wishlist wishlist =new Wishlist();
		wishlist.setUser(user);
		
		return wishlistRepository.save(wishlist);
	}

	@Override
	public Wishlist getWishlistByUserId(User user) {
		Wishlist wishlist =  wishlistRepository.findByUserId(user.getId());
		if (wishlist == null) {
			wishlist = createWishlist(user);
		}
		return wishlist;
	}

	@Override
	public Wishlist addProductToWishlist(User user, Product product) {
		Wishlist wishlist = getWishlistByUserId(user);
		
		if (wishlist.getProducts().contains(product)) {
			wishlist.getProducts().remove(product);
		}
		else wishlist.getProducts().add(product);
		return wishlistRepository.save(wishlist);
	}

}
