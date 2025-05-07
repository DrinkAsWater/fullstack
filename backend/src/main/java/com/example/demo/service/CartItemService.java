package com.example.demo.service;

import com.example.demo.model.CartItem;

public interface CartItemService {
	
	CartItem updateCartItem(Long userId, Long id,CartItem cartItem) throws Exception;
	void removeCartItem(Long userId, Long cartItemId) throws Exception;
	CartItem findCartItemBy(Long id) throws Exception;

}
