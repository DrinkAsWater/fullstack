package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Seller;
import com.example.demo.domain.AccountStatus;


public interface SellerRepository extends JpaRepository<Seller, Long> {
	Seller findByEmail(String email);
	List<Seller> findByAccountStatus(AccountStatus accountStatus);

}
