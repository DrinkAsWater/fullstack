package com.example.demo.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.domain.OrderStatus;
import com.example.demo.domain.PaymentStatus;
import com.example.demo.model.Address;
import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.model.User;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.service.OrderService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
	private final OrderRepository orderRepository;
	private final AddressRepository addressRepository;
	private final OderItemRepository oderItemRepository;
	private final CartRepository cartRepository;

	@Override
	@Transactional
	public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
		if (!user.getAddresses().contains(shippingAddress)) {
			user.getAddresses().add(shippingAddress);
		}
		Address address = addressRepository.save(shippingAddress);

		// brand1 => 4shirt
		// brand2 => 3pants
		// brand 3 => 1watch

		Map<Long, List<CartItem>> itemBySeller = cart.getCartItems().stream()
				.collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

		Set<Order> orders = new HashSet<>();

		for (Map.Entry<Long, List<CartItem>> entry : itemBySeller.entrySet()) {
			Long sellerId = entry.getKey();
			List<CartItem> items = entry.getValue();
			
			int totalMrpPrice = items.stream().mapToInt(CartItem::getMrpPrice).sum();
			int totalSellingPrice = items.stream().mapToInt(CartItem::getSellingPrice).sum();
			int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

			Order createOrder = new Order();
			createOrder.setUser(user);
			createOrder.setSellerId(sellerId);
			createOrder.setTotalMrpPrice(totalMrpPrice);
			createOrder.setTotalSellingPrice(totalSellingPrice);
			createOrder.setDiscount(totalMrpPrice - totalSellingPrice);
			createOrder.setTotalItem(totalItem);
			createOrder.setShippingAddress(address);
			createOrder.setOrderStatus(OrderStatus.PENDING);
			createOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);
			
			
			Order saveOrder = orderRepository.save(createOrder);
			  
			orders.add(saveOrder);
			
			List<OrderItem>orderItems = new ArrayList<>();
			
			for (CartItem item : items) {
				OrderItem orderItem = new OrderItem();
				orderItem.setOrder(saveOrder);
				orderItem.setMrpPrice(item.getMrpPrice());
				orderItem.setProduct(item.getProduct());
				orderItem.setQuantity(item.getQuantity());
				orderItem.setSize(item.getSize());
				orderItem.setUserId(item.getUserId());
				orderItem.setSellingPrice(item.getSellingPrice());
				
				saveOrder.getOrderItems().add(orderItem);
				
				OrderItem savedOderItem = oderItemRepository .save(orderItem);
				orderItems.add(savedOderItem);
			}

		}

		cart.getCartItems().clear();
		cart.setTotalItem(0);
		cart.setTotalSellingPrice(0);
		cart.setTotalMrpPrice(0);
		cart.setDiscount(0);
		cart.setCouponCode(null);
		cartRepository.save(cart);

		return orders;
	}

	@Override
	public Order findOrderById(Long id) throws Exception {
		
		return orderRepository.findById(id).orElseThrow(()->
		new Exception("order not found"));
	}

	@Override
	public List<Order> userOrderHistory(long userId) {
	
		return orderRepository.findByUserId(userId);
	}

	@Override
	public List<Order> sellersOrder(Long sellerId) {
		
		return orderRepository.findBySellerId(sellerId);
	}

	@Override
	public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
		
		Order order = findOrderById(orderId);
		order.setOrderStatus(orderStatus);
		
		return orderRepository.save(order);
	}

	@Override
	public Order cancelOrder(Long orderId, User user) throws Exception {
		Order order = findOrderById(orderId);
		if (!user.getId().equals(order.getUser().getId())) {
			throw new Exception("you don't have access to this order");
		}

		order.setOrderStatus(OrderStatus.CANCELLED);
		
		return orderRepository.save(order);
	}

	@Override
	public OrderItem getItemById(Long id) throws Exception {
		
		return oderItemRepository.findById(id).orElseThrow(()->
		new Exception("order item not exist"));
	}

	

}
