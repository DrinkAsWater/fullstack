package com.example.demo.service;

import com.example.demo.model.User;

public interface UserService {
	User findUserByJwtToken(String jwt) throws Exception;
	User findUserByEmail(String email) throws Exception;

}
