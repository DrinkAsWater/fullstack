package com.example.demo.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.ProductException;
import com.example.demo.model.Product;
import com.example.demo.response.ProductResponse;
import com.example.demo.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
	private final ProductService productService;

	@GetMapping("/{productId}")
	public ResponseEntity<ProductResponse> getProductById(@PathVariable Long productId) throws ProductException {
		Product product = productService.findProductById(productId);
		return new ResponseEntity<>(ProductResponse.from(product), HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<List<ProductResponse>> searchProduct(@RequestParam(required = false) String query) {
		List<ProductResponse> products = productService.searchProducts(query).stream()
				.map(ProductResponse::from)
				.toList();
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<Page<ProductResponse>> getAllProducts(@RequestParam(required = false) String category,
			@RequestParam(required = false) String brand, @RequestParam(required = false) String color,
			@RequestParam(required = false) String size, @RequestParam(required = false) Integer minPrice,
			@RequestParam(required = false) Integer maxPrice, @RequestParam(required = false) Integer minDiscount,
			@RequestParam(required = false) String sort, @RequestParam(required = false) String stock,
			@RequestParam(defaultValue = "0") Integer pageNumber) {

		Page<Product> products = productService.getAllProducts(category, brand, color, size, minPrice, maxPrice,
				minDiscount, sort, stock, pageNumber);

		Page<ProductResponse> response = new PageImpl<>(
				products.getContent().stream().map(ProductResponse::from).toList(),
				products.getPageable(),
				products.getTotalElements());

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
