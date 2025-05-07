package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Order;
import com.example.demo.model.Seller;
import com.example.demo.model.Transaction;


public interface TransactionService {
	
	Transaction createTransaction(Order order);
	List<Transaction>getTransactionsBySellerId(Seller seller);
	List<Transaction>getAllTransactions();

}
