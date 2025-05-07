package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Cart;
import com.example.demo.model.Coupon;
import com.example.demo.model.User;

public interface CouponService {
	Cart applyCoupon(String code, double orderValue, User user) throws Exception;

	Cart removeCoupon(String code, User user) throws Exception;

	Coupon findCouponById(Long id) throws Exception;
	
	Coupon createCoupon(Coupon coupon);
	
	List<Coupon>findAllCoupon();
	
	void deleteCoupon(Long id) throws Exception;

}
