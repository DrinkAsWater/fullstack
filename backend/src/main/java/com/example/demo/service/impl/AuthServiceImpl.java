package com.example.demo.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.config.JwtProvider;
import com.example.demo.domain.USER_ROLE;
import com.example.demo.model.Cart;
import com.example.demo.model.Seller;
import com.example.demo.model.User;
import com.example.demo.model.VerificationCode;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.SellerRepository;
import com.example.demo.repository.UserRespository;
import com.example.demo.repository.VerificationCodeRepository;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.AuthResponse;
import com.example.demo.response.SignupRequest;
import com.example.demo.service.AuthService;
import com.example.demo.service.EmailService;
import com.example.demo.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final UserRespository userRespository;
	private final PasswordEncoder passwordEncoder;
	private final CartRepository cartRepository;
	private final JwtProvider jwtProvider;
	private final VerificationCodeRepository verificationCodeRepository;
	private final EmailService emailService;
	private final CustomUserServiceImpl customUserService;
	private final SellerRepository sellerRepository;

	@Override
	public void sentLoginOtp(String email, USER_ROLE role) throws Exception {
		String SINGING_PREFIX = "signing_";

		if (email.startsWith(SINGING_PREFIX)) {
			email = email.substring(SINGING_PREFIX.length());

			if (role.equals(USER_ROLE.ROLE_SELLER)) {
				Seller seller = sellerRepository.findByEmail(email);
				if (seller == null) {
					throw new Exception("seller not found");
				}

			} else {
				System.out.println("email" + email);
				User user = userRespository.findByEmail(email);
				if (user == null) {
					throw new Exception("系統中無此電子郵件的使用者，請重新確認");
				}
			}

		}
		VerificationCode isExist = verificationCodeRepository.findByEmail(email);

		if (isExist != null) {
			verificationCodeRepository.delete(isExist);
		}

		String otp = OtpUtil.generateOtp();

		VerificationCode verificationCode = new VerificationCode();
		verificationCode.setOtp(otp);
		verificationCode.setEmail(email);
		verificationCodeRepository.save(verificationCode);

		String subject = "Wu login/signup otp";
		String text = "your login/signup otp is -" + otp;

		emailService.sendVerificationOtpEmail(email, otp, subject, text);

	}

	@Override
	public String createdUser(SignupRequest req) throws Exception {

		VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());

		if (verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
			throw new Exception("wrong otp...");
		}

		User user = userRespository.findByEmail(req.getEmail());
		if (user == null) {
			User createdUser = new User();
			createdUser.setEmail(req.getEmail());
			createdUser.setFullName( req.getFullName() );
			createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
			createdUser.setMobile("0909073522");
			createdUser.setPassword(passwordEncoder.encode(req.getOtp()));

		user = userRespository.save(createdUser);
			
		
		


			Cart cart = new Cart();
			cart.setUser(user);
			cartRepository.save(cart);
		}

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));
		Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		return jwtProvider.generateToken(authentication);
	}

	@Override
	public AuthResponse sigining(LoginRequest req) throws Exception {
		String username = req.getEmail();
		String otp = req.getOtp();
		Authentication authentication = authenticate(username, otp);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Login success");

		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

		authResponse.setRole(USER_ROLE.valueOf(roleName));

		return authResponse;
	}

	private Authentication authenticate(String username, String otp) throws Exception {
		UserDetails userDetails = customUserService.loadUserByUsername(username);

		String SELLER_PREFIX = "seller_";
		if (username.startsWith(SELLER_PREFIX)) {
			username = username.substring(SELLER_PREFIX.length());

		}

		if (userDetails == null) {
			throw new BadCredentialsException("invaild username or password");
		}

		VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);
		System.out.println("----" + username + "-------");
		if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
			throw new Exception("wrong otp");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
