package com.example.demo.service.impl;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.domain.AccountStatus;
import com.example.demo.domain.HomeCategorySection;
import com.example.demo.domain.USER_ROLE;
import com.example.demo.model.Address;
import com.example.demo.model.BankDetails;
import com.example.demo.model.BusinessDetails;
import com.example.demo.model.Category;
import com.example.demo.model.Deal;
import com.example.demo.model.HomeCategory;
import com.example.demo.model.Product;
import com.example.demo.model.Seller;
import com.example.demo.model.User;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.DealRepository;
import com.example.demo.repository.HomeCategoryRepository;
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
	private final HomeCategoryRepository homeCategoryRepository;
	private final DealRepository dealRepository;

	@Override
	public void run(String... args) throws Exception {
		initializeAdminUser();
		Seller seller = initializeSeller();
		initializeHomeCategories();
		initializeDeals();
		initializeProducts(seller);
	}

	// ── Admin ────────────────────────────────────────────────────────────────
	private void initializeAdminUser() {
		String adminEmail = "zhewu3297@gmail.com";
		if (userRespository.findByEmail(adminEmail) == null) {
			User admin = new User();
			admin.setPassword(passwordEncoder.encode("Drink"));
			admin.setFullName("DrinkasWater3");
			admin.setEmail(adminEmail);
			admin.setRole(USER_ROLE.ROLE_ADMIN);
			userRespository.save(admin);
		}
	}

	// ── Seller ───────────────────────────────────────────────────────────────
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
		business.setBusinesslogo(pexels(5632399, 200));
		business.setBanner(pexels(1884581, 800));

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

	// ── HomeCategory ─────────────────────────────────────────────────────────
	private void initializeHomeCategories() {
		if (homeCategoryRepository.count() > 0) return;

		List<HomeCategory> cats = Arrays.asList(
			// ELECTRIC_CATEGORIES
			hc("智慧手機",   "smartphones",    HomeCategorySection.ELECTRIC_CATEGORIES, pexels(699122,  200)),
			hc("筆記型電腦", "laptops",        HomeCategorySection.ELECTRIC_CATEGORIES, pexels(18105,   200)),
			hc("智慧手錶",   "smartwatches",   HomeCategorySection.ELECTRIC_CATEGORIES, pexels(437037,  200)),
			hc("平板電腦",   "tablets",        HomeCategorySection.ELECTRIC_CATEGORIES, pexels(1334597, 200)),
			hc("耳機音響",   "headphones",     HomeCategorySection.ELECTRIC_CATEGORIES, pexels(3394650, 200)),
			hc("相機攝影",   "cameras",        HomeCategorySection.ELECTRIC_CATEGORIES, pexels(90946,   200)),
			hc("遊戲周邊",   "gaming",         HomeCategorySection.ELECTRIC_CATEGORIES, pexels(3945659, 200)),

			// GRID
			hc("女士禮服",   "clothing-women", HomeCategorySection.GRID, pexels(13966969, 600)),
			hc("手錶配件",   "smartwatches",   HomeCategorySection.GRID, pexels(2113994,  600)),
			hc("女士連衣裙", "clothing-women", HomeCategorySection.GRID, pexels(12730873, 600)),
			hc("男士休閒服", "clothing-men",   HomeCategorySection.GRID, pexels(1043474,  600)),
			hc("男士商務裝", "clothing-men",   HomeCategorySection.GRID, pexels(3768166,  600)),
			hc("男士丹寧",   "clothing-men",   HomeCategorySection.GRID, pexels(1598505,  600)),

			// SHOP_BY_CATEGORIES
			hc("居家傢俱", "furniture",      HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1350789, 400)),
			hc("美妝保養", "skincare",       HomeCategorySection.SHOP_BY_CATEGORIES, pexels(3321416, 400)),
			hc("生鮮食品", "groceries",      HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1132047, 400)),
			hc("女士服飾", "clothing-women", HomeCategorySection.SHOP_BY_CATEGORIES, pexels(3170438, 400)),
			hc("兒童玩具", "toys",           HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1620779, 400)),
			hc("手錶珠寶", "watches",        HomeCategorySection.SHOP_BY_CATEGORIES, pexels(2113994, 400)),
			hc("運動戶外", "sports",         HomeCategorySection.SHOP_BY_CATEGORIES, pexels(3822583, 400)),
			hc("圖書文具", "books",          HomeCategorySection.SHOP_BY_CATEGORIES, pexels(256541,  400)),
			hc("男士服飾", "clothing-men",   HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1043474, 400)),
			hc("汽車用品", "automotive",     HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1164778, 400)),

			// DEALS
			hc("手機限時優惠", "smartphones",    HomeCategorySection.DEALS, pexels(699122,  400)),
			hc("筆電特賣折扣", "laptops",        HomeCategorySection.DEALS, pexels(2582937, 400)),
			hc("女裝獨家優惠", "clothing-women", HomeCategorySection.DEALS, pexels(1536619, 400)),
			hc("傢俱限量特惠", "furniture",      HomeCategorySection.DEALS, pexels(1350789, 400)),
			hc("精品錶款折扣", "watches",        HomeCategorySection.DEALS, pexels(2113994, 400)),
			hc("運動品牌特賣", "sports",         HomeCategorySection.DEALS, pexels(3822583, 400))
		);
		homeCategoryRepository.saveAll(cats);
	}

	// ── Deal ─────────────────────────────────────────────────────────────────
	private void initializeDeals() {
		if (dealRepository.count() > 0) return;

		List<HomeCategory> dealCats = homeCategoryRepository.findAll().stream()
			.filter(c -> c.getSection() == HomeCategorySection.DEALS)
			.toList();

		int[] discounts = {20, 15, 30, 25, 10, 35};
		for (int i = 0; i < dealCats.size(); i++) {
			Deal deal = new Deal();
			deal.setDiscount(discounts[i % discounts.length]);
			deal.setCategory(dealCats.get(i));
			dealRepository.save(deal);
		}
	}

	// ── Products ─────────────────────────────────────────────────────────────
	private void initializeProducts(Seller seller) {
		if (productRepository.count() > 0) return;

		Category mensWear   = cat("mens_wear",   "男士服飾", 1, null);
		Category womensWear = cat("womens_wear",  "女士服飾", 1, null);
		Category kidsWear   = cat("kids_wear",    "童裝",     1, null);

		Category mensTshirts  = cat("mens_tshirts",   "男士T恤",   2, mensWear);
		Category mensShirts   = cat("mens_shirts",    "男士襯衫",  2, mensWear);
		Category mensPants    = cat("mens_pants",     "男士長褲",  2, mensWear);
		Category womensDress  = cat("womens_dresses", "女士裙裝",  2, womensWear);
		Category womensEthnic = cat("womens_ethnic",  "女士民族服",2, womensWear);
		Category kidsCasual   = cat("kids_casual",    "童裝休閒",  2, kidsWear);

		Category cottonT  = cat("mens_cotton_tshirts",  "男士棉質T恤",    3, mensTshirts);
		Category denim    = cat("mens_denim",            "男士丹寧外套",   3, mensShirts);
		Category formal   = cat("mens_formal_shirts",   "男士商務襯衫",   3, mensShirts);
		Category chino    = cat("mens_chino_pants",     "男士休閒長褲",   3, mensPants);
		Category casualD  = cat("womens_casual_dresses","女士休閒裙",      3, womensDress);
		Category floralD  = cat("womens_floral_dresses","女士碎花裙",      3, womensDress);
		Category kurti    = cat("womens_kurti",         "女士庫尔提",      3, womensEthnic);
		Category kidsSet  = cat("kids_organic_sets",    "童裝有機棉套裝",  3, kidsCasual);

		productRepository.saveAll(Arrays.asList(
			product("男士休閒棉質T恤", "高品質純棉，透氣舒適，版型修身。", 599, 399, "深藍色", pexels(1043474), "S,M,L,XL,XXL", cottonT, seller),
			product("男士牛仔外套",   "經典丹寧，耐穿百搭，多口袋設計。",  1299, 899, "靛藍色", pexels(1598505), "M,L,XL,XXL",   denim,   seller),
			product("男士商務格紋襯衫","精緻格紋，柔軟面料不起皺。",         899, 599, "藍白格", pexels(3768166), "S,M,L,XL",     formal,  seller),
			product("男士休閒長褲",   "彈性腰帶，輕盈全季適用。",           799, 549, "卡其色", pexels(1030946), "28,30,32,34,36",chino,  seller),
			product("女士夏日碎花裙", "清新碎花，飄逸優雅。",              1099, 699, "白底碎花",pexels(1536619), "XS,S,M,L,XL",  floralD, seller),
			product("女士休閒連衣裙", "簡約百搭，面料柔軟親膚。",           799, 499, "莫蘭迪綠",pexels(2613260), "XS,S,M,L",     casualD, seller),
			product("女士波西米亞長裙","波西米亞獨特印花。",                1299, 849, "橘紅印花",pexels(2916440), "S,M,L,XL",     floralD, seller),
			product("女士民族風庫尔提","精緻刺繡，文化魅力。",              1499, 999, "孔雀藍", pexels(2285396), "XS,S,M,L,XL,XXL",kurti, seller),
			product("童裝有機棉套裝", "有機棉製，安全呵護寶寶。",           699, 449, "天空藍", pexels(1620779), "90cm,100cm,110cm,120cm", kidsSet, seller),
			product("女士時尚條紋上衣","條紋設計，彈性面料百搭。",           599, 399, "黑白條紋",pexels(2529148), "XS,S,M,L,XL",  casualD, seller)
		));
	}

	// ── Helpers ──────────────────────────────────────────────────────────────
	private String pexels(int id) {
		return String.format(
			"https://images.pexels.com/photos/%d/pexels-photo-%d.jpeg?auto=compress&cs=tinysrgb&w=400",
			id, id);
	}

	private String pexels(int id, int width) {
		return String.format(
			"https://images.pexels.com/photos/%d/pexels-photo-%d.jpeg?auto=compress&cs=tinysrgb&w=%d",
			id, id, width);
	}

	private HomeCategory hc(String name, String categoryId, HomeCategorySection section, String image) {
		HomeCategory h = new HomeCategory();
		h.setName(name);
		h.setCategoryId(categoryId);
		h.setSection(section);
		h.setImage(image);
		return h;
	}

	private Category cat(String categoryId, String name, int level, Category parent) {
		Category existing = categoryRepository.findByCategoryId(categoryId);
		if (existing != null) return existing;
		Category c = new Category();
		c.setCategoryId(categoryId);
		c.setName(name);
		c.setLevel(level);
		c.setParentCategory(parent);
		return categoryRepository.save(c);
	}

	private Product product(String title, String desc, int mrp, int selling,
			String color, String image, String sizes, Category category, Seller seller) {
		Product p = new Product();
		p.setTitle(title);
		p.setDescription(desc);
		p.setMrpPrice(mrp);
		p.setSellingPrice(selling);
		p.setDiscountPercent((int) Math.round((mrp - selling) * 100.0 / mrp));
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
