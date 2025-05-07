package com.example.demo.service;

import java.util.List;

import com.example.demo.model.HomeCategory;

public interface HomeCategoryService {

	HomeCategory createHomeCategory(HomeCategory homeCategory);

	List<HomeCategory> createCategories(List<HomeCategory> homeCategorises);

	HomeCategory updateHomeCategory(HomeCategory homecategory, Long id) throws Exception;

	List<HomeCategory> getAllHomeCategorise();

}
