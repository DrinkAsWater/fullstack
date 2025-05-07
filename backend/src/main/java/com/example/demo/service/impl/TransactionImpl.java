package com.example.demo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Order;
import com.example.demo.model.Seller;
import com.example.demo.model.Transaction;
import com.example.demo.repository.SellerRepository;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.service.TransactionService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TransactionImpl implements TransactionService {
	
	private final TransactionRepository transactionRepository;
	private final SellerRepository sellertRepository;

    @Override
    @Transactional
    public Transaction createTransaction(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order 不能為 null");
        }

        // 確保 Seller 存在
        Seller seller = sellertRepository.findById(order.getSellerId())
            .orElseThrow(() -> new RuntimeException("找不到對應的 Seller，Seller ID: " + order.getSellerId()));

        // 確保 User 存在
        if (order.getUser() == null) {
            throw new RuntimeException("交易創建失敗，訂單沒有關聯的 User");
        }

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);

        return transactionRepository.save(transaction);
    }
	@Override
	public List<Transaction> getTransactionsBySellerId(Seller seller) {
		
		return transactionRepository.findBySellerId(seller.getId());
	}

	@Override
	public List<Transaction> getAllTransactions() {
	return transactionRepository.findAll();
	}

}
