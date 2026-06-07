package com.example.demo.service.impl;

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

		CartItem savedCartItem;
		if (isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(quantity);
			cartItem.setUserId(user.getId());
			cartItem.setSize(size);
			cartItem.setSellingPrice(quantity * product.getSellingPrice());
			cartItem.setMrpPrice(quantity * product.getMrpPrice());

			cart.getCartItems().add(cartItem);
			savedCartItem = cartitemRepository.save(cartItem);
		} else {
			// 同一購物車中已存在相同 product+size 的項目：累加數量，而不是忽略本次請求
			isPresent.setQuantity(isPresent.getQuantity() + quantity);
			isPresent.setSellingPrice(isPresent.getQuantity() * product.getSellingPrice());
			isPresent.setMrpPrice(isPresent.getQuantity() * product.getMrpPrice());
			savedCartItem = cartitemRepository.save(isPresent);
		}

		updateCartTotals(cart);
		return savedCartItem;
	};

	@Override
	public Cart findUserCart(User user) {
		return cartRepository.findByUserId(user.getId());
	};

	@Override
	public void updateCartTotals(Cart cart) {

		int totalMrpPrice = 0;
		int totalSellingPrice = 0;
		int totalItem = 0;

		for (CartItem cartItem : cart.getCartItems()) {
			totalMrpPrice += cartItem.getMrpPrice();
			totalSellingPrice += cartItem.getSellingPrice();
			totalItem += cartItem.getQuantity();
		}

		cart.setTotalMrpPrice(totalMrpPrice);
		cart.setTotalSellingPrice(totalSellingPrice);
		cart.setTotalItem(totalItem);
		cart.setDiscount(calculateDiscountPercentage(totalMrpPrice, totalSellingPrice));

		cartRepository.save(cart);
	}

	private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {

		if (mrpPrice <= 0) {
			return 0;
		}
		double discount = mrpPrice - sellingPrice;
		double discoutPercentage = (discount / mrpPrice) * 100;
		return (int) discoutPercentage;
	}
}
