package com.example.demo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.HomeCategory;
import com.example.demo.repository.HomeCategoryRepository;
import com.example.demo.service.HomeCategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {
	
	private final HomeCategoryRepository homeCategoryRepository;

	@Override
	public HomeCategory createHomeCategory(HomeCategory homeCategory) {
		
		return homeCategoryRepository.save(homeCategory);
	}

	@Override
	public List<HomeCategory> createCategories(List<HomeCategory> homeCategorises) {
		if (homeCategoryRepository.findAll().isEmpty()) {
			return homeCategoryRepository.saveAll(homeCategorises);
		}
	
		return homeCategoryRepository.findAll();
	}

	@Override
	public HomeCategory updateHomeCategory(HomeCategory category, Long id) throws Exception {
		HomeCategory existingCategory = homeCategoryRepository.findById(id)
				.orElseThrow(()-> new Exception("Category not foud"));
		if (category.getImage()!=null) {
			existingCategory.setImage(category.getImage());
		}
		if (category.getCategoryId()!=null) {
			existingCategory.setCategoryId(category.getCategoryId());
		}
		
		return homeCategoryRepository.save(existingCategory);
		
	}

	@Override
	public List<HomeCategory> getAllHomeCategorise() {
		
		return homeCategoryRepository.findAll();
	}

}
