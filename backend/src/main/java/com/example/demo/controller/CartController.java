package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.ProductException;
import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.request.AddItemRequest;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.CartItemService;
import com.example.demo.service.CartService;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
	private final CartService cartService;
	private final CartItemService cartItemService;
	private final UserService userService;
	private final ProductService productService;

	@GetMapping
	public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws Exception {

		User user = userService.findUserByJwtToken(jwt);

		Cart cart = cartService.findUserCart(user);
		

//		System.out.println("cart -" + cart.getUser().getEmail());

		return new ResponseEntity<Cart>(cart, HttpStatus.OK);

	}

	@PutMapping("/add")
	public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,
			@RequestHeader("Authorization") String jwt) throws ProductException, Exception {

		User user = userService.findUserByJwtToken(jwt);
		Product product = productService.findProductById(req.getProductId());

		CartItem item = cartService.addCartItem(user, product, req.getSize(), req.getQuantity());

		ApiResponse res = new ApiResponse();
		res.setMessage("Item Add To Cart Successfully");

		return new ResponseEntity<>(item, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/item/{cartItemId}")
	public ResponseEntity<ApiResponse> deleteCartItemHandler(@PathVariable Long cartItemId,
			@RequestHeader("Authorization") String jwt) throws Exception {

		User user = userService.findUserByJwtToken(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);

		ApiResponse res = new ApiResponse();
		res.setMessage("Item Remove From Cart");

		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);

	}

	@PutMapping("/item/{cartItemId}")
	public ResponseEntity<CartItem> updateCartItemHandler(@PathVariable Long cartItemId,
			@RequestBody CartItem cartItem, 
			@RequestHeader("Authorization") String jwt) throws Exception {

		User user = userService.findUserByJwtToken(jwt);
		
		CartItem updatedCartItem = null;
		if (cartItem.getQuantity()>0) {
			updatedCartItem=cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
		}

		return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);
	}

}
