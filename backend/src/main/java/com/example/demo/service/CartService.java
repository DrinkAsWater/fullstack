package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.User;

public interface CartService {

	public CartItem addCartItem(
		User user,
		Product product,
		String size,
		int quantity);
	public Cart findUserCart(User user);

}
