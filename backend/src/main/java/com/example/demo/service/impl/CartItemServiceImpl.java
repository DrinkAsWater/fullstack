package com.example.demo.service.impl;

import org.springframework.stereotype.Service;

import com.example.demo.model.CartItem;
import com.example.demo.model.User;
import com.example.demo.repository.CartitemRepository;
import com.example.demo.service.CartItemService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

	private final CartitemRepository cartitemRepository;

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {

		CartItem item = findCartItemBy(id);

		User cartItemUser = item.getCart().getUser();

		if (cartItemUser.getId().equals(userId)) {
			item.setQuantity(cartItem.getQuantity());
			item.setMrpPrice(item.getQuantity() * item.getProduct().getMrpPrice());
			item.setSellingPrice(item.getQuantity() * item.getProduct().getSellingPrice());
			return cartitemRepository.save(item);
		}
		throw new Exception("you can't update this cartItem");
	}

	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws Exception {
		CartItem item = findCartItemBy(cartItemId);

		User cartItemUser = item.getCart().getUser();
		
		if (cartItemUser.getId().equals(userId)) {
			cartitemRepository.delete(item);
		}
		else throw new Exception("you aren't delete this item");

	}

	@Override
	public CartItem findCartItemBy(Long id) throws Exception {
		
		return cartitemRepository.findById(id).orElseThrow(()->
		new Exception("cart item not found with id"+id));
	}

}
