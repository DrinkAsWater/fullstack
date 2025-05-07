package com.example.demo.service.impl;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.domain.USER_ROLE;
import com.example.demo.model.User;
import com.example.demo.repository.UserRespository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Datainitializtion implements CommandLineRunner {
	
	private final UserRespository userRespository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
		initializeAdminUser();
		
	}

	private void initializeAdminUser() {
		 String adminUsername = "zhewu3297@gmail.com";
		 
		 if (userRespository.findByEmail(adminUsername)==null) {
			User adminUser = new User();
			
			adminUser.setPassword(passwordEncoder.encode("Drink"));
			adminUser.setFullName("DrinkasWater3");
			adminUser.setEmail(adminUsername);
			adminUser.setRole(USER_ROLE.ROLE_ADMIN);
			
			User admin = userRespository.save(adminUser);
		}
		
	}

}
