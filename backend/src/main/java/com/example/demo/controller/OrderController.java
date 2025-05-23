package com.example.demo.controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.PaymentMethod;
import com.example.demo.model.Address;
import com.example.demo.model.Cart;
import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.model.PaymentOrder;
import com.example.demo.model.Seller;
import com.example.demo.model.SellerReport;
import com.example.demo.model.User;
import com.example.demo.repository.PaymentOrderRepository;
import com.example.demo.response.PaymentLinkResponse;
import com.example.demo.service.CartService;
import com.example.demo.service.OrderService;
import com.example.demo.service.PaymentService;
import com.example.demo.service.SellerReportService;
import com.example.demo.service.SellerService;
import com.example.demo.service.UserService;
import com.razorpay.PaymentLink;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
	private final OrderService orderService;
	private final UserService userservice;
	private final CartService cartService;
	private final SellerService sellerService;
	private final SellerReportService sellerReportService;
	private final PaymentService paymentService;
	private final PaymentOrderRepository paymentOrderRepository;

	@PostMapping()
	public ResponseEntity<PaymentLinkResponse> createOrderHandler(@RequestBody Address shippingAddress,
			@RequestParam PaymentMethod paymentMethod, @RequestHeader("Authorization") String jwt) throws Exception {
		User user = userservice.findUserByJwtToken(jwt);
		Cart cart = cartService.findUserCart(user);
		Set<Order> orders = orderService.createOrder(user, shippingAddress, cart);

		PaymentOrder paymentOrder = paymentService.createOrder(user, orders);

		PaymentLinkResponse res = new PaymentLinkResponse();

		if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
			PaymentLink payment = paymentService.createRazorPayPaymentLink(user, paymentOrder.getAmount(),
					paymentOrder.getId());
			String paymentUrl = payment.get("short_url");
			String paymentUrlId = payment.get("id");

			res.setPayment_link_url(paymentUrl);

			paymentOrder.setPaymentLinkId(paymentUrlId);
			paymentOrderRepository.save(paymentOrder);

		} else {
			String paymentUrl = paymentService.createStripePaymentLink(user, paymentOrder.getAmount(),
					paymentOrder.getId());
			res.setPayment_link_url(paymentUrl);
	
		}

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("/user")
	public ResponseEntity<List<Order>> userOderHistoryHandler(@RequestHeader("Authorization") String jwt) throws Exception {
           User user  = userservice.findUserByJwtToken(jwt);
           List<Order>orders = orderService.userOrderHistory(user.getId());
           return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}

	@GetMapping("/{orderId}")
	public ResponseEntity<Order> getOrderById(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt)
			throws Exception {

		User user = userservice.findUserByJwtToken(jwt);
		Order orders = orderService.findOrderById(orderId);
		return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
	}

	@GetMapping("/item/{orderItemId}")
	public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long orderItemId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		System.out.println("-------controller");
		User user = userservice.findUserByJwtToken(jwt);
		OrderItem orderItem = orderService.getItemById(orderItemId);

		return new ResponseEntity<>(orderItem, HttpStatus.ACCEPTED);
	}

	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt)
			throws Exception {
		User user = userservice.findUserByJwtToken(jwt);
		Order order = orderService.cancelOrder(orderId, user);

		Seller seller = sellerService.getSellerById(order.getSellerId());
		SellerReport report = sellerReportService.getSellerReport(seller);

		report.setCanceledOrders(report.getCanceledOrders() + 1);
		report.setTotalRefunds(report.getTotalRefunds() + order.getTotalSellingPrice());
		sellerReportService.updateSellerReport(report);

		return ResponseEntity.ok(order);
	}

}
