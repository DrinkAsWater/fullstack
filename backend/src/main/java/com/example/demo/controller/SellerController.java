package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.AccountStatus;
import com.example.demo.model.Seller;
import com.example.demo.model.VerificationCode;
import com.example.demo.repository.VerificationCodeRepository;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.AuthResponse;
import com.example.demo.service.AuthService;
import com.example.demo.service.EmailService;
import com.example.demo.service.SellerService;
import com.example.demo.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {
	private final SellerService sellerService;
	private final VerificationCodeRepository verificationCodeRepository;
	private final AuthService authService;
	private final EmailService emailService;

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception {

		String otp = req.getOtp();
		String email = req.getEmail();

//		VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);
//		if (verificationCode==null && !verificationCode.getOtp().equals(req.getOtp())) {
//			throw new Exception("wrong opt....");
//		}
		req.setEmail("seller_" + email);
		AuthResponse authResponse = authService.sigining(req);

		return ResponseEntity.ok(authResponse);

	}

	@PatchMapping("/verify/{otp}")
	public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws Exception {

		VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

		if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
			throw new Exception("wrong otp....");
		}
		Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);
		return new ResponseEntity<>(seller, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws Exception {
		Seller savedSeller = sellerService.createSeller(seller);

		String otp = OtpUtil.generateOtp();

		VerificationCode verificationCode = new VerificationCode();
		verificationCode.setOtp(otp);
		verificationCode.setEmail(seller.getEmail());
		verificationCodeRepository.save(verificationCode);
		String subject = "Wu Email Verification code";
		String text = "歡迎!!,verify your account using this link";
		String fronted_url = "http://localhost:3000/verify-seller";
		emailService.sendVerificationOtpEmail(seller.getEmail(), verificationCode.getOtp(), subject,
				text + fronted_url);

		return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws Exception {
		Seller seller = sellerService.getSellerById(id);
		return new ResponseEntity<>(seller, HttpStatus.OK);
	}

	@GetMapping("/profile")
	public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception {

		Seller seller = sellerService.getSellerProfile(jwt);
		return new ResponseEntity<>(seller, HttpStatus.OK);
	}

//	@GetMapping("/report")
//	public  ResponseEntity<Seller>getSellerReport(@RequestHeader("Authorization")String jwt)throws Exception {
//		
//		Seller seller = sellerService.getSellerProfile(jwt);
//		return new ResponseEntity<>(seller,HttpStatus.OK);
//	}

	@GetMapping()
	public ResponseEntity<List<Seller>> getAllSellers(@RequestParam(required = false) AccountStatus status) {

		List<Seller> sellers = sellerService.getAllSellers(status);
		return ResponseEntity.ok(sellers);
	}

	@PatchMapping()
	public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt, @RequestBody Seller seller)
			throws Exception {
		Seller profile = sellerService.getSellerProfile(jwt);
		Seller updateSeller = sellerService.updateSeller(profile.getId(), seller);

		return ResponseEntity.ok(updateSeller);

	}

	@DeleteMapping("/{id}")

	public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception {

		sellerService.deleteSeller(id);
		return ResponseEntity.noContent().build();
	}

}
