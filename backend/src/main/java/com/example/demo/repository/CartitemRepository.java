package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;

public interface CartitemRepository extends JpaRepository<CartItem, Long> {
	
	CartItem findByCartAndProductAndSize(Cart cart,Product product,String size);

}
