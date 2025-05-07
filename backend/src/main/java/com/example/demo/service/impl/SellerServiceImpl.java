package com.example.demo.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.config.JwtProvider;
import com.example.demo.domain.AccountStatus;
import com.example.demo.domain.USER_ROLE;
import com.example.demo.model.Address;
import com.example.demo.model.Seller;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.SellerRepository;
import com.example.demo.service.SellerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
	private final SellerRepository sellerRepository;
	private final JwtProvider jwtProvider;
	private final PasswordEncoder passwordEncoder;
	private final AddressRepository addressRepository;

	@Override
	public Seller getSellerProfile(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromJwtToken(jwt);

		return this.getSellerByEmail(email);
	}

	@Override
	public Seller createSeller(Seller seller) throws Exception {
		  // 檢查 email 是否為 null 或空
	    if (seller.getEmail() == null || seller.getEmail().isEmpty()) {
	        throw new Exception("Email cannot be null or empty");
	    }
		Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
		if (sellerExist != null) {
			throw new Exception("seller already exist,used different email");
		}
		Address savedAddress = addressRepository.save(seller.getPickupAddress());
		 // 創建新的 Seller 實體
	    Seller newSeller = new Seller();
	    newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
	    newSeller.setSellerName(seller.getSellerName());
	    newSeller.setPickupAddress(savedAddress);
	    newSeller.setGSTIN(seller.getGSTIN());
	    newSeller.setRole(USER_ROLE.ROLE_SELLER);
	    newSeller.setMobile(seller.getMobile());
	    newSeller.setBankDetails(seller.getBankDetails());
	    newSeller.setBusinessDetails(seller.getBusinessDetails());
	    newSeller.setEmail(seller.getEmail());  // 確保 email 正確設置

	    // 保存 Seller 到資料庫
	    return sellerRepository.save(newSeller);
	}

	@Override
	public Seller getSellerById(Long id) throws Exception {

		return sellerRepository.findById(id).orElseThrow(() -> new Exception("seller not found with id" + id));
	}

	@Override
	public Seller getSellerByEmail(String email) throws Exception {
		Seller seller = sellerRepository.findByEmail(email);
		if (seller == null) {
			throw new Exception("seller not found ");
		}
		return seller;
	}

	@Override
	public List<Seller> getAllSellers(AccountStatus status) {

		return sellerRepository.findByAccountStatus(status);
	}

	@Override
	public Seller updateSeller(Long id, Seller seller) throws Exception {
		Seller existingSeller = this.getSellerById(id);

		if (seller.getSellerName() != null) {
			existingSeller.setSellerName(seller.getSellerName());
		}
		if (seller.getMobile() != null) {
			existingSeller.setMobile(seller.getMobile());
		}
		if (seller.getEmail() != null) {
			existingSeller.setEmail(seller.getEmail());
		}
		if (seller.getBusinessDetails() != null && seller.getBusinessDetails().getBusinessName() != null) {
			existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
		}
		if (seller.getBankDetails() != null && seller.getBankDetails().getAccountHolderName() != null
				&& seller.getBankDetails().getIfscCode() != null
				&& seller.getBankDetails().getAccountNumber() != null) {
			existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
			existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountNumber());
			existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
		}
		if (seller.getPickupAddress() != null && seller.getPickupAddress().getAddress() != null
				&& seller.getPickupAddress().getMobile() != null && seller.getPickupAddress().getCity() != null
				&& seller.getPickupAddress().getState() != null) {
			existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
			existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
			existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
			existingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
			existingSeller.getPickupAddress().setPinCode(seller.getPickupAddress().getPinCode());

		}
		if (seller.getGSTIN()!=null) {
			existingSeller.setGSTIN(seller.getGSTIN());
		}
		return sellerRepository.save(existingSeller);
	}

	@Override
	public void deleteSeller(Long id) throws Exception {
		Seller seller = getSellerById(id);
		sellerRepository.delete(seller);

	}

	@Override
	public Seller verifyEmail(String email, String otp) throws Exception {
		Seller seller = getSellerByEmail(email);
		seller.setEmailVerified(true);
		return  sellerRepository.save(seller);
	}

	@Override
	public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception {
		Seller seller = getSellerById(sellerId);
		seller.setAccountStatus(status);
		return  sellerRepository.save(seller);
	}

}
