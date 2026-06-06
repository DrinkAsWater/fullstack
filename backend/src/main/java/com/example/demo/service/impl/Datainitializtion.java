package com.example.demo.service.impl;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.domain.AccountStatus;
import com.example.demo.domain.USER_ROLE;
import com.example.demo.model.Address;
import com.example.demo.model.BankDetails;
import com.example.demo.model.BusinessDetails;
import com.example.demo.model.Category;
import com.example.demo.model.Product;
import com.example.demo.model.Seller;
import com.example.demo.model.User;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.SellerRepository;
import com.example.demo.repository.UserRespository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Datainitializtion implements CommandLineRunner {

	private final UserRespository userRespository;
	private final PasswordEncoder passwordEncoder;
	private final SellerRepository sellerRepository;
	private final CategoryRepository categoryRepository;
	private final ProductRepository productRepository;
	private final AddressRepository addressRepository;

	@Override
	public void run(String... args) throws Exception {
		initializeAdminUser();
		Seller seller = initializeSeller();
		initializeProducts(seller);
	}

	private void initializeAdminUser() {
		String adminUsername = "zhewu3297@gmail.com";
		if (userRespository.findByEmail(adminUsername) == null) {
			User adminUser = new User();
			adminUser.setPassword(passwordEncoder.encode("Drink"));
			adminUser.setFullName("DrinkasWater3");
			adminUser.setEmail(adminUsername);
			adminUser.setRole(USER_ROLE.ROLE_ADMIN);
			userRespository.save(adminUser);
		}
	}

	private Seller initializeSeller() {
		String sellerEmail = "seller@wushop.com";
		Seller existing = sellerRepository.findByEmail(sellerEmail);
		if (existing != null) return existing;

		Address address = new Address();
		address.setAddress("台北市信義區信義路五段7號");
		address.setCity("台北市");
		address.setState("台灣");
		address.setPinCode("110");
		address.setMobile("0912345678");
		address = addressRepository.save(address);

		BusinessDetails business = new BusinessDetails();
		business.setBusinessName("Wu 時尚精品");
		business.setBusinessEmail(sellerEmail);
		business.setBusinessMobile("0912345678");
		business.setBusinessAddress("台北市信義區信義路五段7號");
		business.setBusinesslogo("https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400");
		business.setBanner("https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800");

		BankDetails bank = new BankDetails();
		bank.setAccountHolderName("Wu 時尚精品有限公司");
		bank.setAccountNumber("12345678901234");
		bank.setIfscCode("CTBC0001234");

		Seller seller = new Seller();
		seller.setSellerName("Wu 賣家");
		seller.setEmail(sellerEmail);
		seller.setPassword(passwordEncoder.encode("Wu@12345"));
		seller.setMobile("0912345678");
		seller.setRole(USER_ROLE.ROLE_SELLER);
		seller.setEmailVerified(true);
		seller.setAccountStatus(AccountStatus.ACTIVE);
		seller.setPickupAddress(address);
		seller.setBusinessDetails(business);
		seller.setBankDetails(bank);
		seller.setGSTIN("12ABCDE1234F1Z5");

		return sellerRepository.save(seller);
	}

	private void initializeProducts(Seller seller) {
		if (productRepository.count() > 0) return;

		// Level 1 categories
		Category mensWear = findOrCreateCategory("mens_wear", "男士服飾", 1, null);
		Category womensWear = findOrCreateCategory("womens_wear", "女士服飾", 1, null);
		Category kidsWear = findOrCreateCategory("kids_wear", "童裝", 1, null);

		// Level 2 categories
		Category mensTshirts = findOrCreateCategory("mens_tshirts", "男士T恤", 2, mensWear);
		Category mensShirts = findOrCreateCategory("mens_shirts", "男士襯衫", 2, mensWear);
		Category mensPants = findOrCreateCategory("mens_pants", "男士長褲", 2, mensWear);
		Category womensDresses = findOrCreateCategory("womens_dresses", "女士裙裝", 2, womensWear);
		Category womensEthnic = findOrCreateCategory("womens_ethnic", "女士民族服飾", 2, womensWear);
		Category kidsCasual = findOrCreateCategory("kids_casual", "童裝休閒", 2, kidsWear);

		// Level 3 categories
		Category mensCottonTshirts = findOrCreateCategory("mens_cotton_tshirts", "男士棉質T恤", 3, mensTshirts);
		Category mensDenim = findOrCreateCategory("mens_denim", "男士丹寧外套", 3, mensShirts);
		Category mensFormal = findOrCreateCategory("mens_formal_shirts", "男士商務襯衫", 3, mensShirts);
		Category mensChinoPants = findOrCreateCategory("mens_chino_pants", "男士休閒長褲", 3, mensPants);
		Category womensCasualDresses = findOrCreateCategory("womens_casual_dresses", "女士休閒裙", 3, womensDresses);
		Category womensFloralDresses = findOrCreateCategory("womens_floral_dresses", "女士碎花裙", 3, womensDresses);
		Category womensKurti = findOrCreateCategory("womens_kurti", "女士庫尔提", 3, womensEthnic);
		Category kidsOrganicSets = findOrCreateCategory("kids_organic_sets", "童裝有機棉套裝", 3, kidsCasual);

		List<Product> products = Arrays.asList(
			buildProduct("男士休閒棉質T恤",
				"高品質純棉製成，透氣舒適，適合日常穿著。多色可選，版型修身。",
				599, 399, "深藍色", pexels(1043474), "S,M,L,XL,XXL", mensCottonTshirts, seller),

			buildProduct("男士牛仔外套",
				"經典丹寧外套，耐穿百搭，適合春秋季節穿著。多口袋設計，實用又時尚。",
				1299, 899, "靛藍色", pexels(1598505), "M,L,XL,XXL", mensDenim, seller),

			buildProduct("男士商務格紋襯衫",
				"精緻格紋設計，適合商務及日常穿著。柔軟面料，穿著舒適不起皺。",
				899, 599, "藍白格", pexels(3768166), "S,M,L,XL", mensFormal, seller),

			buildProduct("男士休閒長褲",
				"彈性腰帶設計，穿脫方便，適合日常休閒穿著。輕盈面料，全季適用。",
				799, 549, "卡其色", pexels(1030946), "28,30,32,34,36", mensChinoPants, seller),

			buildProduct("女士夏日碎花裙",
				"清新碎花印花，飄逸裙擺，展現女性優雅氣質。適合夏日出行或約會。",
				1099, 699, "白底碎花", pexels(1536619), "XS,S,M,L,XL", womensFloralDresses, seller),

			buildProduct("女士休閒連衣裙",
				"簡約設計，舒適百搭，適合日常通勤或休閒出行。面料柔軟親膚。",
				799, 499, "莫蘭迪綠", pexels(2613260), "XS,S,M,L", womensCasualDresses, seller),

			buildProduct("女士波西米亞長裙",
				"波西米亞風格設計，獨特印花圖案，讓您在人群中脫穎而出。適合海邊度假或節日活動。",
				1299, 849, "橘紅印花", pexels(2916440), "S,M,L,XL", womensFloralDresses, seller),

			buildProduct("女士民族風庫尔提",
				"傳統民族風格設計，精緻刺繡工藝，展現獨特文化魅力。面料透氣，穿著舒適。",
				1499, 999, "孔雀藍", pexels(2285396), "XS,S,M,L,XL,XXL", womensKurti, seller),

			buildProduct("童裝有機棉套裝",
				"採用有機棉製成，不含有害物質，安全呵護寶寶皮膚。可愛印花設計，兒童最愛。",
				699, 449, "天空藍", pexels(1620779), "90cm,100cm,110cm,120cm,130cm", kidsOrganicSets, seller),

			buildProduct("女士時尚條紋上衣",
				"時尚條紋設計，簡約大方，可搭配牛仔褲或裙子。彈性面料，舒適百搭。",
				599, 399, "黑白條紋", pexels(2529148), "XS,S,M,L,XL", womensCasualDresses, seller)
		);

		productRepository.saveAll(products);
	}

	private String pexels(int id) {
		return String.format(
			"https://images.pexels.com/photos/%d/pexels-photo-%d.jpeg?auto=compress&cs=tinysrgb&w=400",
			id, id
		);
	}

	private Category findOrCreateCategory(String categoryId, String name, int level, Category parent) {
		Category cat = categoryRepository.findByCategoryId(categoryId);
		if (cat != null) return cat;
		cat = new Category();
		cat.setCategoryId(categoryId);
		cat.setName(name);
		cat.setLevel(level);
		cat.setParentCategory(parent);
		return categoryRepository.save(cat);
	}

	private Product buildProduct(String title, String description, int mrp, int selling,
			String color, String image, String sizes, Category category, Seller seller) {
		int discount = (int) Math.round(((mrp - selling) * 100.0) / mrp);
		Product p = new Product();
		p.setTitle(title);
		p.setDescription(description);
		p.setMrpPrice(mrp);
		p.setSellingPrice(selling);
		p.setDiscountPercent(discount);
		p.setColor(color);
		p.setQuantity(100);
		p.setNumRatings(0);
		p.setImages(Arrays.asList(image));
		p.setSizes(sizes);
		p.setCategory(category);
		p.setSeller(seller);
		p.setCreatedAt(LocalDateTime.now());
		return p;
	}
}
