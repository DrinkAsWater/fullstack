package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Order;
import com.example.demo.model.PaymentOrder;
import com.example.demo.model.Seller;
import com.example.demo.model.SellerReport;
import com.example.demo.model.User;
import com.example.demo.response.ApiResponse;
import com.example.demo.response.PaymentLinkResponse;
import com.example.demo.service.OrderService;
import com.example.demo.service.PaymentService;
import com.example.demo.service.SellerReportService;
import com.example.demo.service.SellerService;
import com.example.demo.service.TransactionService;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

	private final PaymentService paymentService;
	private  final UserService userService;
	private final SellerService sellerService;
	private final  OrderService orderService;
	private final SellerReportService sellerReportService;
	private final TransactionService transactionService;

	@GetMapping("/{paymentId}")
	public ResponseEntity<ApiResponse> paymentSuccessHandler(@PathVariable String paymentId,
			 @RequestParam(required = false) String paymentLinkId, @RequestHeader("Authorization") String jwt) throws Exception {
		  if (paymentId == null || paymentId.isEmpty()) {
		        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
		                .body(new ApiResponse());
		    }
		    if (paymentLinkId == null || paymentLinkId.isEmpty()) {
		        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
		                .body(new ApiResponse());
		    }
		
		User user = userService.findUserByJwtToken(jwt);

		PaymentLinkResponse paymentResponse;

		PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

		boolean paymentSuccess = paymentService.ProcedPaymentOrder(paymentOrder, paymentId, paymentLinkId);
		
		if (paymentSuccess) {
			for (Order order  : paymentOrder.getOrders()) {
				
				transactionService.createTransaction(order);
				Seller seller = sellerService.getSellerById(order.getSellerId());
				SellerReport report = sellerReportService.getSellerReport(seller);
				report.setTotalOrders(report.getTotalOrders()+1);
				report.setTotalEarnings(report.getTotalEarnings()+order.getTotalSellingPrice());
				report.setTotalSales(report.getTotalSales()+order.getOrderItems().size());
				sellerReportService.updateSellerReport(report);
			}
		}
		ApiResponse res = new ApiResponse();
		res.setMessage("Payment successful");

		return new ResponseEntity<>(res,HttpStatus.CREATED);
	}
	

}
