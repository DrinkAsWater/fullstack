package com.example.demo.service;

import com.example.demo.domain.USER_ROLE;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.AuthResponse;
import com.example.demo.response.SignupRequest;

public interface AuthService {
	
	void sentLoginOtp(String email,USER_ROLE role) throws Exception;
	String createdUser(SignupRequest req) throws Exception;
	AuthResponse sigining(LoginRequest req) throws Exception;

}
