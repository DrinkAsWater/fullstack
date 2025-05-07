package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Cart;
import com.example.demo.model.Coupon;
import com.example.demo.model.User;
import com.example.demo.service.CartService;
import com.example.demo.service.CouponService;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupons")
public class AdminCouponController {
	public final CouponService couponService;
	public final UserService userService;
	private final CartService cartService;
	
	@PostMapping("/apply")
	public ResponseEntity<Cart>applyCoupon(
			@RequestParam String apply,
			@RequestParam String code,
			@RequestParam double orderValue,
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserByJwtToken(jwt);
		Cart cart;
		
		if (apply.equals(true)) {
			cart = couponService.applyCoupon(code, orderValue, user);
		}
		else {
			cart = couponService.removeCoupon(code, user);
		}
		
		
		return ResponseEntity.ok(cart);
	}
	
	//Admin operations
	
	@PostMapping("/admin/create")
	public ResponseEntity<Coupon>createCoupon(@RequestBody Coupon coupon) {
		Coupon createCoupon = couponService.createCoupon(coupon);
		
		return ResponseEntity.ok(createCoupon);
	}
	
	@DeleteMapping("/admin/delete/{id}")
	public ResponseEntity<?>deleteCoupon(@PathVariable Long id ) throws Exception{
		couponService.deleteCoupon(id);
		return ResponseEntity.ok("Coupon deleted successfully");
	}
	
	@GetMapping("/admin/all")
	public ResponseEntity<List<Coupon>>getAllCoupons() {
		List<Coupon>coupons = couponService.findAllCoupon();
		return ResponseEntity.ok(coupons);
	}
	
	
	
	

}
