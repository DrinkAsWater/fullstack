package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Home;
import com.example.demo.model.HomeCategory;

public interface HomeService {
	public Home createHomePageData(List<HomeCategory>allCategories);

}
