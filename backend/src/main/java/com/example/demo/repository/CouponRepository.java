package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long>{
	
	Coupon findByCode(String code);

}
