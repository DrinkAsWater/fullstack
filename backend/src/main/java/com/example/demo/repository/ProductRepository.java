package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Product;

public interface ProductRepository  extends JpaRepository<Product,Long>,JpaSpecificationExecutor<Product>{
	
	List<Product>findBySellerId(Long id);
	
	@Query("SELECT p FROM Product p where (:query IS NULL OR lower(p.title)"+
		       " LIKE lower(CONCAT('%', :query, '%'))) " +
		       "OR (:query IS NULL OR lower(p.category.name) " +
		        "LIKE lower(CONCAT('%', :query, '%')))")
	List<Product> searchProduct(@Param("query")String query);

	
	

}
