package com.example.demo.service.impl;




import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.CartitemRepository;
import com.example.demo.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepository;
	private final CartitemRepository cartitemRepository;

	@Override
	public CartItem addCartItem(User user, Product product, String size, int quantity) {

		Cart cart = findUserCart(user);

		CartItem isPresent = cartitemRepository.findByCartAndProductAndSize(cart, product, size);

		if (isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setQuantity(quantity);
			cartItem.setUserId(user.getId());
			cartItem.setSize(size);

			int totalPrice = quantity * product.getSellingPrice();
			cartItem.setSellingPrice(totalPrice);
			cartItem.setMrpPrice(quantity*product.getMrpPrice());

			cart.getCartItems().add(cartItem);
			cartItem.setCart(cart);

			return cartitemRepository.save(cartItem);
		}
		return isPresent;
	};

	@Override
	public Cart findUserCart(User user) {

		Cart cart = cartRepository.findByUserId(user.getId());
//		 if (cart == null) {
//		        cart = new Cart();
//		        cart.setUser(user);
//		        cartRepository.save(cart);
//		    }
		    
		    // 使用安全的集合複製
//		    List<CartItem> cartItems = new ArrayList<>(cart.getCartItems());
//		
//		  cart.getCartItems().size();

		int totalPrice = 0;
		int totalDiscountedPrice = 0;
		int totalItem = 0;

		for (CartItem cartItem : cart.getCartItems()) {
			totalPrice += cartItem.getMrpPrice();
			totalDiscountedPrice += cartItem.getSellingPrice();
			totalItem += cartItem.getQuantity();
		}
		cart.setTotalMrpPrice(totalPrice);
		cart.setTotalItem(totalItem);
		cart.setTotalSellingPrice(totalDiscountedPrice);
		cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
		cart.setTotalItem(totalItem);
		return cart;
	};

	private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {

		if (mrpPrice <= 0) {
			return 0;
		}
		double discount = mrpPrice - sellingPrice;
		double discoutPercentage = (discount / mrpPrice) * 100;
		return (int) discoutPercentage;
	}
}
