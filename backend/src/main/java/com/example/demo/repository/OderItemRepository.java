package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.OrderItem;

public interface OderItemRepository extends JpaRepository<OrderItem, Long> {

	

}
