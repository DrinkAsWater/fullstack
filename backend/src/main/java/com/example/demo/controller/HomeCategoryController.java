package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Home;
import com.example.demo.model.HomeCategory;
import com.example.demo.service.HomeCategoryService;
import com.example.demo.service.HomeService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class HomeCategoryController {
	private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;
	
	@PostMapping("/home/categories")
	public ResponseEntity<Home>createHomeCategories(@RequestBody List<HomeCategory>homeCategories) {
		List<HomeCategory>categories = homeCategoryService.createCategories(homeCategories);
		Home home  = homeService.createHomePageData(categories);
		
		return new ResponseEntity<>(home,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/admin/home-category")
	public ResponseEntity<List<HomeCategory>>getHomeCateGory() {
		
		List<HomeCategory>categories = homeCategoryService.getAllHomeCategorise();
		 return  ResponseEntity.ok(categories);
	}
	
	@PatchMapping("/admin/home-category/{id}")
	public ResponseEntity<HomeCategory>updateHomeCategory(
			@PathVariable Long id,
			@RequestBody HomeCategory homeCategory) throws Exception{
		
		HomeCategory updateCategory =  homeCategoryService.updateHomeCategory(homeCategory, id);
		return ResponseEntity.ok(updateCategory);
		
		
	}
	
	

}
