package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.USER_ROLE;
import com.example.demo.request.LoginOtpRequest;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.ApiResponse;
import com.example.demo.response.AuthResponse;
import com.example.demo.response.SignupRequest;
import com.example.demo.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {


	private final AuthService authService;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(  @RequestBody SignupRequest req) throws Exception {


		String jwt = authService.createdUser(req);
		
		AuthResponse res = new AuthResponse();
		res.setJwt(jwt);
		res.setMessage("註冊成功");
		res.setRole(USER_ROLE.ROLE_CUSTOMER);
	
		return ResponseEntity.ok(res);

	}
	

	@PostMapping("/sent/login-signup-otp")
	public ResponseEntity<ApiResponse> sentOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {

		authService.sentLoginOtp(req.getEmail(),req.getRole());
		
		ApiResponse res = new ApiResponse();
	
		res.setMessage("otp發送成功");
	
		
		return ResponseEntity.ok(res);

	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req) throws Exception {

	AuthResponse authResponse=	authService.sigining(req);
		
		
		return ResponseEntity.ok(authResponse);

	}
}
