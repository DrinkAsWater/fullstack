package com.example.demo.service;

import java.util.List;
import java.util.Set;

import com.example.demo.domain.OrderStatus;
import com.example.demo.model.Address;
import com.example.demo.model.Cart;
import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.model.User;

public interface OrderService {
	Set<Order>createOrder(User user,Address shippingAddress,Cart cart);
	Order findOrderById(Long id) throws Exception;
	List<Order>userOrderHistory(long userId);
	List<Order>sellersOrder(Long sellerId);
	Order updateOrderStatus(Long orderId,OrderStatus orderStatus) throws Exception;
	Order cancelOrder(Long orderId,User user) throws Exception;
	OrderItem getItemById(Long id) throws Exception;

}
