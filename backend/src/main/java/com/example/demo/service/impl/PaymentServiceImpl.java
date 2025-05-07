package com.example.demo.service.impl;

import java.util.Set;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.domain.PaymentOrderStatus;
import com.example.demo.domain.PaymentStatus;
import com.example.demo.model.Order;
import com.example.demo.model.PaymentOrder;
import com.example.demo.model.User;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.PaymentOrderRepository;
import com.example.demo.service.PaymentService;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	private final PaymentOrderRepository paymentOrderRepository;
	private final OrderRepository orderRepository;
	private String apiKey = "apikey";
	private String apiSecret = "apisecret";
	@Value("${stripe.api.key}")
	private String stripeSecretKey = "stripeSecretKey";

	@Override
	public PaymentOrder createOrder(User user, Set<Order> orders) {
		Long amount = orders.stream().mapToLong(Order::getTotalSellingPrice).sum();

		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setAmount(amount);
		paymentOrder.setUser(user);
		paymentOrder.setOrders(orders);

		return paymentOrderRepository.save(paymentOrder);
	}

	@Override
	public PaymentOrder getPaymentOrderByIdd(Long orderId) throws Exception {

		return paymentOrderRepository.findById(orderId).orElseThrow(() -> new Exception("payment order not found"));
	}

	@Override
	public PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception {
		PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(orderId);
		if (paymentOrder == null) {
			throw new Exception("payment order not found with provided payment link id");
		}

		return paymentOrder;
	}

	@Override
	public Boolean ProcedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId)
			throws  StripeException {

//		if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
//			RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
//
//			Payment payment = razorpay.payments.fetch(paymentId);
//
//			String satus = payment.get("status");
//
//			if (satus.endsWith("captured")) {
//				Set<Order> orders = paymentOrder.getOrders();
//
//				for (Order order : orders) {
//					order.setPaymentStatus(PaymentStatus.COMPLETED);
//					orderRepository.save(order);
//				}
//				paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
//				paymentOrderRepository.save(paymentOrder);
//				return true;
//			}
//			paymentOrder.setStatus(PaymentOrderStatus.FAILED);
//			paymentOrderRepository.save(paymentOrder);
//			return false;
//
//		}
//		return false;
		   if (!paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
	            return false;
	        }
		   Stripe.apiKey = stripeSecretKey;
	        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentId);

	        if ("succeeded".equals(paymentIntent.getStatus())) {
	            Set<Order> orders = paymentOrder.getOrders();
	            for (Order order : orders) {
	                order.setPaymentStatus(PaymentStatus.COMPLETED);
	                orderRepository.save(order);
	            }
	            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
	            paymentOrderRepository.save(paymentOrder);
	            return true;
	        }
	        
	        paymentOrder.setStatus(PaymentOrderStatus.FAILED);
	        paymentOrderRepository.save(paymentOrder);
	        return false;
	    }



	@Override
	public PaymentLink createRazorPayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {
		amount = amount * 100;

		try {
			RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

			JSONObject paymentLinkRequest = new JSONObject();
			paymentLinkRequest.put("amount", amount);
			paymentLinkRequest.put("currency", "USD");

			JSONObject customer = new JSONObject();
			customer.put("name", user.getFullName());
			customer.put("email", user.getEmail());
			paymentLinkRequest.put("customer", customer);

			JSONObject notify = new JSONObject();
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);

			paymentLinkRequest.put("callback_url", "http//http://localhost:3000/payment-success/" + orderId);
			paymentLinkRequest.put("callback_method", "get");

			PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);

			String paymentLinkUrl = paymentLink.get("shorot_url");
			String paymentLinkId = paymentLink.get("id");

			return paymentLink;

		} catch (Exception e) {
			System.out.println(e.getMessage());
			throw new RazorpayException(e.getMessage());
		}

	}

	@Override
	public String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
		Stripe.apiKey = stripeSecretKey;

		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("http://localhost:3000/payment-success/" + orderId + "&payment_id={CHECKOUT_SESSION_ID}")
				.setCancelUrl(
						"http://localhost:3000/payment-cancel/")
				.addLineItem(
						SessionCreateParams.LineItem.builder().setQuantity(1L)
								.setPriceData(
										SessionCreateParams.LineItem.PriceData.builder().setCurrency("usd")
												.setUnitAmount(amount * 100)
												.setProductData(SessionCreateParams.LineItem.PriceData.ProductData
														.builder().setName("Wu payment").build())
												.build())
								.build())
				.build();
		Session session = Session.create(params);

		return session.getUrl();
	}

}
