package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Deal;

public interface DealRepository extends JpaRepository<Deal, Long> {

}
