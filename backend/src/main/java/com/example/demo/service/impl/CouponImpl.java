package com.example.demo.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.example.demo.model.Cart;
import com.example.demo.model.Coupon;
import com.example.demo.model.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.CouponRepository;
import com.example.demo.repository.UserRespository;
import com.example.demo.service.CouponService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponImpl implements CouponService {
	
	private final CouponRepository couponRepository;
	private final CartRepository cartRepository;
	private final UserRespository userRespository;

	@Override
	public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
		Coupon coupon = couponRepository.findByCode(code);
		
		Cart cart = cartRepository.findByUserId(user.getId());
		
		if (coupon == null) {
			throw new Exception("Coupon not valid");
		}
		if (user.getUsedCoupons().contains(coupon)) {
			throw new Exception("Coupon already uesed");
		}
		if (orderValue<=coupon.getMinimumOrderValue()) {
			throw new Exception("valid less than minium order value"+coupon.getMinimumOrderValue());
		}
		if (coupon.isActive() && LocalDate.now().isAfter(coupon.getValidityStartDate())
				&& LocalDate.now().isBefore(coupon.getValidityEndtDate())) {
			user.getUsedCoupons().add(coupon);
			userRespository.save(user);
			
			double discountedPrice = ( cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;
			
			cart.setTotalSellingPrice(cart.getTotalSellingPrice()-discountedPrice);
			cart.setCouponCode(code);
			cartRepository.save(cart);
			return cart;
		}
		throw new Exception("coupon not valid");
	}

	@Override
	public Cart removeCoupon(String code, User user) throws Exception {
		Coupon coupon = couponRepository.findByCode(code);
		
		if (coupon== null ) {
			throw new Exception("coupon not found");
		}
		Cart cart = cartRepository.findByUserId(user.getId());
		
		double discountedPrice = ( cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;
		
		cart.setTotalSellingPrice(cart.getTotalSellingPrice()+discountedPrice);
		cart.setCouponCode(code);
		
		return cartRepository.save(cart);
	}

	@Override
	public Coupon findCouponById(Long id) throws Exception {
		
		return couponRepository.findById(id).orElseThrow(()->
		new Exception("Coupon not found"));
	}

	@Override
	@PreAuthorize("hasRole ('ADMIN')")
	public Coupon createCoupon(Coupon coupon) {
		
		return couponRepository.save(coupon);
	}

	@Override
	public List<Coupon> findAllCoupon() {
		
		return couponRepository.findAll();
	}

	@Override
	@PreAuthorize("hasRole ('ADMIN')")
	public void deleteCoupon(Long id) throws Exception {
		
		findCouponById(id);
		couponRepository.deleteById(id);
		

	}

}
