package com.example.demo.service;

import com.example.demo.model.Seller;
import com.example.demo.model.SellerReport;

public interface SellerReportService {
	
	SellerReport getSellerReport(Seller seller);
	SellerReport updateSellerReport(SellerReport sellerReport);
	

}
