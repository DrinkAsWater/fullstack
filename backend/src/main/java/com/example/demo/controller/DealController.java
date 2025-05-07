package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Deal;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.DealService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealController {
	public final DealService dealService;
	
	@GetMapping
	public ResponseEntity<List<Deal>>getDeals() {
		
		List<Deal>createDeals = dealService.getDeal();
		
		return new ResponseEntity<>(createDeals,HttpStatus.ACCEPTED);
	}
	
	@PostMapping
	public ResponseEntity<Deal>createDeals(
			@RequestBody Deal deals) {
		
		Deal createDeals = dealService.createDeal(deals);
		
		return new ResponseEntity<>(createDeals,HttpStatus.ACCEPTED);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Deal>updateDeal(
			@PathVariable Long id,
			@RequestBody Deal deal) throws Exception{
	
		Deal updateDeal = dealService.updateDeal(deal, id);
		
		return  ResponseEntity.ok(updateDeal);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse>deleteDeals(
			@PathVariable Long id) throws Exception{
		
		dealService.deleteDeal(id);
		
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Deal deleted");
		
		return new ResponseEntity<>(apiResponse,HttpStatus.ACCEPTED);
	}

}
