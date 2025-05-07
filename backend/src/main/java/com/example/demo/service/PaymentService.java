package com.example.demo.service;

import java.util.Set;

import com.example.demo.model.Order;
import com.example.demo.model.PaymentOrder;
import com.example.demo.model.User;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;


public interface PaymentService {
	PaymentOrder createOrder(User user, Set<Order> orders);

	PaymentOrder getPaymentOrderByIdd(Long orderId) throws Exception;

	PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception;
	
//	PaymentOrder getStripePaymentOrder(String paymentId) throws Exception;

	Boolean ProcedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws StripeException;

	PaymentLink createRazorPayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException;


	String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;

}
