package com.example.demo.model;

import com.example.demo.domain.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetails {
	private  String paymentId; 
	private  String stripePaymentLinkId;
	private  String stripePaymentLinkReferenceId;
	private  String stripePaymentLinkStatus;
	private  String stripePaymentLinkZWSP;
	
	private PaymentStatus status;
	
	

}
