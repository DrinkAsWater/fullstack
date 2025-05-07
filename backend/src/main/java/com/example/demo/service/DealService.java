package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Deal;

public interface DealService {
	List<Deal> getDeal();

	Deal createDeal(Deal deal);

	Deal updateDeal(Deal deal,Long id) throws Exception;

	void deleteDeal(Long id) throws Exception;

}
