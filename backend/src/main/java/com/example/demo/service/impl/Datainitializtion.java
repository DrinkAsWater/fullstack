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
			// ELECTRIC_CATEGORIES – L2 IDs of electronics, hierarchical match finds L3 products
			hc("智慧手機",   "smartphones",    HomeCategorySection.ELECTRIC_CATEGORIES, pexels(699122,  200)),
			hc("筆記型電腦", "laptops",        HomeCategorySection.ELECTRIC_CATEGORIES, pexels(18105,   200)),
			hc("智慧手錶",   "smartwatches",   HomeCategorySection.ELECTRIC_CATEGORIES, pexels(437037,  200)),
			hc("平板電腦",   "tablets",        HomeCategorySection.ELECTRIC_CATEGORIES, pexels(1334597, 200)),
			hc("耳機音響",   "headphones",     HomeCategorySection.ELECTRIC_CATEGORIES, pexels(3394650, 200)),
			hc("相機攝影",   "cameras",        HomeCategorySection.ELECTRIC_CATEGORIES, pexels(90946,   200)),
			hc("遊戲主機",   "game_consoles",  HomeCategorySection.ELECTRIC_CATEGORIES, pexels(3945659, 200)),

			// GRID – L1 IDs, hierarchical match finds all products under that L1
			hc("女士禮服",   "women",          HomeCategorySection.GRID, pexels(13966969, 600)),
			hc("手錶配件",   "watches",        HomeCategorySection.GRID, pexels(2113994,  600)),
			hc("女士連衣裙", "women",          HomeCategorySection.GRID, pexels(12730873, 600)),
			hc("男士休閒服", "men",            HomeCategorySection.GRID, pexels(1043474,  600)),
			hc("男士商務裝", "men",            HomeCategorySection.GRID, pexels(3768166,  600)),
			hc("男士丹寧",   "men",            HomeCategorySection.GRID, pexels(1598505,  600)),

			// SHOP_BY_CATEGORIES – L1 / L2 mix, all work with hierarchical match
			hc("居家傢俱", "home_furniture", HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1350789, 400)),
			hc("美妝保養", "skincare",       HomeCategorySection.SHOP_BY_CATEGORIES, pexels(3321416, 400)),
			hc("生鮮食品", "groceries",      HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1132047, 400)),
			hc("女士服飾", "women",          HomeCategorySection.SHOP_BY_CATEGORIES, pexels(3170438, 400)),
			hc("兒童童裝", "kids",           HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1620779, 400)),
			hc("手錶珠寶", "watches",        HomeCategorySection.SHOP_BY_CATEGORIES, pexels(2113994, 400)),
			hc("運動戶外", "sports_outdoor", HomeCategorySection.SHOP_BY_CATEGORIES, pexels(3822583, 400)),
			hc("圖書文具", "books",          HomeCategorySection.SHOP_BY_CATEGORIES, pexels(256541,  400)),
			hc("男士服飾", "men",            HomeCategorySection.SHOP_BY_CATEGORIES, pexels(1043474, 400)),
			hc("手錶飾品", "accessories",    HomeCategorySection.SHOP_BY_CATEGORIES, pexels(2113994, 400)),

			// DEALS
			hc("手機限時優惠", "smartphones",    HomeCategorySection.DEALS, pexels(699122,  400)),
			hc("筆電特賣折扣", "laptops",        HomeCategorySection.DEALS, pexels(2582937, 400)),
			hc("女裝獨家優惠", "women",          HomeCategorySection.DEALS, pexels(1536619, 400)),
			hc("傢俱限量特惠", "home_furniture", HomeCategorySection.DEALS, pexels(1350789, 400)),
			hc("精品錶款折扣", "watches",        HomeCategorySection.DEALS, pexels(2113994, 400)),
			hc("運動品牌特賣", "sports_outdoor", HomeCategorySection.DEALS, pexels(3822583, 400))
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
	// Products are assigned to L3 categories. The backend hierarchical search
	// finds them via direct match (L3), parent match (L2), or grandparent match (L1).
	private void initializeProducts(Seller seller) {
		if (productRepository.count() > 0) return;

		// ── L1 categories ──────────────────────────────────────────────────
		Category menL1      = cat("men",            "男裝",   1, null);
		Category womenL1    = cat("women",          "女裝",   1, null);
		Category kidsL1     = cat("kids",           "童裝",   1, null);
		Category elecL1     = cat("electronics",    "電子產品", 1, null);
		Category furnL1     = cat("home_furniture", "家居傢俱", 1, null);
		Category sportL1    = cat("sports_outdoor", "運動戶外", 1, null);
		Category beautyL1   = cat("beauty",         "美妝保養", 1, null);
		Category accessL1   = cat("accessories",    "手錶飾品", 1, null);

		// ── Men L2 ─────────────────────────────────────────────────────────
		Category menTops  = cat("men_tops",               "上衣",   2, menL1);
		Category menBtm   = cat("men_bottoms",            "褲裝",   2, menL1);
		Category menOuter = cat("men_outerwear",          "外套",   2, menL1);
		Category menFw    = cat("men_footwear",           "鞋類",   2, menL1);
		Category menAcc   = cat("men_fashion_accessories","時尚配件",2, menL1);

		// ── Men L3 ─────────────────────────────────────────────────────────
		Category menShortT   = cat("men_short_sleeve_tshirts","短袖T恤",  3, menTops);
		Category menShirts   = cat("men_long_sleeve_shirts",  "長袖襯衫", 3, menTops);
		Category menPolos    = cat("men_polos",               "Polo衫",   3, menTops);
		Category menJeans    = cat("men_jeans",               "牛仔褲",   3, menBtm);
		Category menCasualP  = cat("men_casual_pants",        "休閒褲",   3, menBtm);
		Category menSportsP  = cat("men_sports_pants",        "運動褲",   3, menBtm);
		Category menJackets  = cat("men_jackets",             "夾克",     3, menOuter);
		Category menWind     = cat("men_windbreakers",        "風衣",     3, menOuter);
		Category menSneak    = cat("men_sneakers",            "運動鞋",   3, menFw);
		Category menFormal   = cat("men_formal_shoes",        "正裝皮鞋", 3, menFw);
		Category menSung     = cat("men_sunglasses",          "太陽眼鏡", 3, menAcc);
		Category menBelt     = cat("men_belt",                "皮帶",     3, menAcc);

		// ── Women L2 ───────────────────────────────────────────────────────
		Category womenTops  = cat("women_tops",       "上衣", 2, womenL1);
		Category womenDress = cat("women_dresses",    "裙裝", 2, womenL1);
		Category womenPants = cat("women_pants",      "褲裝", 2, womenL1);
		Category womenOuter = cat("women_outerwear",  "外套", 2, womenL1);
		Category womenFw    = cat("women_footwear",   "鞋類", 2, womenL1);

		// ── Women L3 ───────────────────────────────────────────────────────
		Category wShirts   = cat("women_shirts",        "襯衫",   3, womenTops);
		Category wTshirts  = cat("women_tshirts",       "T恤",    3, womenTops);
		Category wTanks    = cat("women_tank_tops",     "背心",   3, womenTops);
		Category wCasualD  = cat("women_casual_dresses","連身裙", 3, womenDress);
		Category wEveningD = cat("women_evening_dresses","晚禮服",3, womenDress);
		Category wSkirts   = cat("women_skirts",        "半身裙", 3, womenDress);
		Category wJeans    = cat("women_jeans",         "牛仔褲", 3, womenPants);
		Category wCasualP  = cat("women_casual_pants",  "休閒褲", 3, womenPants);
		Category wHeels    = cat("women_heels",         "高跟鞋", 3, womenFw);
		Category wSneak    = cat("women_sneakers",      "運動鞋", 3, womenFw);
		Category wBoots    = cat("women_boots",         "靴子",   3, womenFw);

		// ── Kids L2/L3 ─────────────────────────────────────────────────────
		Category boysL2    = cat("boys",        "男童",   2, kidsL1);
		Category girlsL2   = cat("girls",       "女童",   2, kidsL1);
		Category babiesL2  = cat("babies",      "嬰幼兒", 2, kidsL1);
		Category boysTsh   = cat("boys_tshirts","男童T恤",3, boysL2);
		Category boysP     = cat("boys_pants",  "男童褲子",3,boysL2);
		Category girlsDr   = cat("girls_dresses","女童洋裝",3,girlsL2);
		Category babyOne   = cat("baby_onesies","嬰兒連身衣",3,babiesL2);
		Category babySets  = cat("baby_sets",   "嬰兒套裝",3,babiesL2);

		// ── Electronics L2/L3 ──────────────────────────────────────────────
		Category smartL2   = cat("smartphones",  "智慧手機",   2, elecL1);
		Category laptopL2  = cat("laptops",       "筆電",       2, elecL1);
		Category hdphL2    = cat("headphones",    "耳機",       2, elecL1);
		Category tabletL2  = cat("tablets",       "平板",       2, elecL1);
		Category camL2     = cat("cameras",       "相機",       2, elecL1);
		Category swatchL2  = cat("smartwatches",  "智慧手錶",   2, elecL1);
		Category gameL2    = cat("game_consoles", "遊戲主機",   2, elecL1);

		Category iphone15  = cat("iphone_15",          "iPhone 15",         3, smartL2);
		Category galaxyS24 = cat("galaxy_s24",          "Galaxy S24",        3, smartL2);
		Category oppoX7    = cat("oppo_find_x7",        "OPPO Find X7",      3, smartL2);
		Category macbookP  = cat("macbook_pro_14",      "MacBook Pro 14吋",  3, laptopL2);
		Category dellXPS   = cat("dell_xps_13",         "Dell XPS 13",       3, laptopL2);
		Category asusROG   = cat("asus_rog_zephyrus",   "ASUS ROG Zephyrus", 3, laptopL2);
		Category boseQC    = cat("bose_qc_45",          "Bose QC45",         3, hdphL2);
		Category sonyXM5   = cat("sony_wh_1000xm5",    "Sony WH-1000XM5",   3, hdphL2);
		Category airpodsPro= cat("airpods_pro",         "AirPods Pro",       3, hdphL2);
		Category ipadPro   = cat("ipad_pro_12_9",       "iPad Pro 12.9吋",   3, tabletL2);
		Category galaxyTab = cat("galaxy_tab_s9",       "Galaxy Tab S9",     3, tabletL2);
		Category sonyAlpha = cat("sony_alpha_7_iv",     "Sony Alpha 7 IV",   3, camL2);
		Category canonR6   = cat("canon_eos_r6_ii",     "Canon EOS R6 II",   3, camL2);
		Category appleW9   = cat("apple_watch_series_9","Apple Watch S9",    3, swatchL2);
		Category galaxyW6  = cat("galaxy_watch_6",      "Galaxy Watch 6",    3, swatchL2);
		Category ps5L3     = cat("ps5",                 "PlayStation 5",     3, gameL2);

		// ── Furniture L2/L3 ────────────────────────────────────────────────
		Category sofaL2    = cat("sofa",   "沙發", 2, furnL1);
		Category bedL2     = cat("bed",    "床具", 2, furnL1);
		Category chairL2   = cat("chair",  "椅子", 2, furnL1);
		Category lSofa     = cat("l_shaped_sofa","L型沙發",  3, sofaL2);
		Category dblBed    = cat("double_bed",   "雙人床",   3, bedL2);
		Category offChair  = cat("office_chair", "辦公椅",   3, chairL2);

		// ── Sports L2/L3 ───────────────────────────────────────────────────
		Category fitL2     = cat("fitness",         "健身運動", 2, sportL1);
		Category outdoorL2 = cat("outdoor",         "戶外探險", 2, sportL1);
		Category sportFwL2 = cat("sports_footwear", "運動鞋類", 2, sportL1);
		Category fitCloth  = cat("fitness_clothing","健身服",   3, fitL2);
		Category campGear  = cat("camping_gear",    "露營用品", 3, outdoorL2);
		Category hikeGear  = cat("hiking_gear",     "登山裝備", 3, outdoorL2);
		Category runShoes  = cat("running_shoes",   "跑步鞋",   3, sportFwL2);

		// ── Beauty L2/L3 ───────────────────────────────────────────────────
		Category skincareL2 = cat("skincare", "護膚", 2, beautyL1);
		Category makeupL2   = cat("makeup",   "彩妝", 2, beautyL1);
		Category perfumeL2  = cat("perfume",  "香水", 2, beautyL1);
		Category haircareL2 = cat("haircare", "髮型護理", 2, beautyL1);
		Category moist      = cat("moisturizer",  "保濕乳液", 3, skincareL2);
		Category sunsc      = cat("sunscreen",    "防曬乳",   3, skincareL2);
		Category serum      = cat("serum",        "精華液",   3, skincareL2);
		Category lipstick   = cat("lipstick",     "口紅",     3, makeupL2);
		Category foundation = cat("foundation",   "粉底液",   3, makeupL2);
		Category wPerfume   = cat("women_perfume","女士香水", 3, perfumeL2);
		Category shampoo    = cat("shampoo",      "洗髮精",   3, haircareL2);

		// ── Accessories L2/L3 ──────────────────────────────────────────────
		Category watchesL2   = cat("watches", "手錶", 2, accessL1);
		Category jewelryL2   = cat("jewelry", "珠寶飾品", 2, accessL1);
		Category bagsL2      = cat("bags",    "包包皮件", 2, accessL1);
		Category fashionW    = cat("fashion_watches",    "時尚手錶", 3, watchesL2);
		Category mechanicalW = cat("mechanical_watches", "機械錶",   3, watchesL2);
		Category necklaces   = cat("necklaces",  "項鍊",   3, jewelryL2);
		Category bracelets   = cat("bracelets",  "手鍊",   3, jewelryL2);
		Category handbags    = cat("handbags",   "手提包", 3, bagsL2);
		Category backpacks   = cat("backpacks",  "後背包", 3, bagsL2);

		productRepository.saveAll(Arrays.asList(
			// ── Men ──────────────────────────────────────────────────────────
			product("男士純棉圓領T恤",    "高品質純棉面料，透氣舒適版型修身，日常百搭首選。",           599,  399, "深藍色",   pexels(1043474), "S,M,L,XL,XXL",   menShortT, seller),
			product("男士條紋短袖T恤",    "撞色條紋設計，立體感十足，夏日必備單品。",                   699,  449, "白藍條紋", pexels(842811),  "S,M,L,XL",       menShortT, seller),
			product("男士印花短袖T恤",    "個性印花，寬鬆版型，休閒風格輕鬆搭配。",                    799,  499, "黑色",    pexels(2897883), "M,L,XL,XXL",     menShortT, seller),
			product("男士格紋長袖襯衫",   "精緻格紋，柔軟抗皺面料，商務休閒兩用。",                   899,  599, "藍白格",  pexels(3768166), "S,M,L,XL",       menShirts, seller),
			product("男士素色商務襯衫",   "修身版型，細緻車縫，辦公室首選。",                         1099,  749, "淺藍色",  pexels(1598505), "S,M,L,XL",       menShirts, seller),
			product("男士素面Polo衫",     "透氣網眼面料，舒適版型，運動休閒都適合。",                   799,  549, "墨綠色",  pexels(1030946), "S,M,L,XL,XXL",   menPolos, seller),
			product("男士直筒牛仔褲",     "經典直筒剪裁，耐穿百搭，基本款單品。",                     1299,  849, "靛藍色",  pexels(1030946), "28,30,32,34,36", menJeans, seller),
			product("男士修身牛仔褲",     "修身彈性版型，舒適有型，打造俐落輪廓。",                   1199,  799, "深藍色",  pexels(2897883), "28,30,32,34",    menJeans, seller),
			product("男士卡其休閒褲",     "輕盈彈性腰帶，全季適用，輕鬆日常穿搭。",                    799,  549, "卡其色",  pexels(1192609), "28,30,32,34,36", menCasualP, seller),
			product("男士運動慢跑褲",     "吸濕排汗面料，寬鬆彈腰設計，訓練日常皆宜。",                599,  399, "黑色",    pexels(3622608), "S,M,L,XL",       menSportsP, seller),
			product("男士皮革飛行夾克",   "PU皮革質感，拉鍊設計，帥氣率性必備。",                    1999, 1299, "黑色",    pexels(1598505), "M,L,XL,XXL",     menJackets, seller),
			product("男士輕量防風外套",   "輕量防風面料，可收納口袋設計，戶外旅行必備。",             1499,  999, "橄欖綠",  pexels(2897883), "S,M,L,XL",       menWind, seller),
			product("男士白色低筒運動鞋", "輕量緩震底，透氣網面，日常外出首選。",                    1599, 1099, "白色",    pexels(2048994), "38,39,40,41,42,43,44", menSneak, seller),
			product("男士牛津皮鞋",       "正裝牛津款，全皮面料，商務宴會場合適用。",                 2199, 1499, "黑色",    pexels(298863),  "39,40,41,42,43", menFormal, seller),
			product("男士UV偏光太陽眼鏡", "UV400防護，金屬鏡框，時尚百搭款。",                        699,  449, "金框黑鏡", pexels(3762800), "均碼",           menSung, seller),
			product("男士真皮牛皮帶",     "頭層牛皮，金屬扣件精緻耐用。",                             599,  399, "棕色",    pexels(1152073), "均碼",           menBelt, seller),

			// ── Women ────────────────────────────────────────────────────────
			product("女士碎花前扣式襯衫", "清新碎花，前扣設計，飄逸優雅日常穿搭。",                    899,  599, "白底碎花", pexels(2529148), "XS,S,M,L,XL",   wShirts, seller),
			product("女士格紋寬版襯衫",   "格紋復古風格，寬鬆版型，百搭顯瘦。",                        799,  529, "藍格紋",  pexels(3170438), "XS,S,M,L",      wShirts, seller),
			product("女士舒適基本款T恤",  "純棉觸感，簡約百搭，柔軟親膚首選。",                        499,  349, "白色",    pexels(3170438), "XS,S,M,L,XL",   wTshirts, seller),
			product("女士修身短版T恤",    "修身短版設計，高腰搭配更顯腿長。",                          599,  399, "黑色",    pexels(2220316), "XS,S,M,L",      wTshirts, seller),
			product("女士條紋T恤",        "經典條紋圖案，彈性面料百搭舒適。",                          549,  369, "黑白條紋", pexels(2529148), "XS,S,M,L,XL",  wTshirts, seller),
			product("女士純棉細肩帶背心", "純棉面料，細肩帶設計，夏日涼爽首選。",                      399,  269, "米白色",  pexels(2220316), "XS,S,M,L",      wTanks, seller),
			product("女士夏日碎花連身裙", "清新碎花印花，飄逸A字版型，海灘渡假必備。",                1099,  699, "白底碎花", pexels(1536619), "XS,S,M,L,XL",  wCasualD, seller),
			product("女士波西米亞長裙",   "民族風印花，連帽長版設計，異國情調。",                     1299,  849, "橘紅印花", pexels(2613260), "S,M,L,XL",      wCasualD, seller),
			product("女士休閒吊帶連衣裙", "吊帶設計，輕薄舒適，適合夏日日常。",                        799,  529, "莫蘭迪綠", pexels(2916440), "XS,S,M,L",     wCasualD, seller),
			product("女士晚宴蕾絲禮服",   "精緻蕾絲刺繡，優雅V領設計，宴會首選。",                    3499, 2499, "酒紅色",  pexels(1755428), "XS,S,M,L",     wEveningD, seller),
			product("女士高腰A字半身裙",  "高腰版型顯瘦，A字剪裁，自然飄逸。",                         799,  549, "米白色",  pexels(2916440), "XS,S,M,L,XL",  wSkirts, seller),
			product("女士格紋迷你裙",     "格紋復古感，寬版腰帶設計，個性時尚。",                       699,  469, "格紋",    pexels(2285396), "XS,S,M,L",     wSkirts, seller),
			product("女士刷白高腰牛仔褲", "刷白工藝，高腰修身設計，突顯曲線。",                       1099,  749, "淺藍色",  pexels(1021693), "25,26,27,28,29,30", wJeans, seller),
			product("女士闊腿牛仔褲",     "闊腿版型，彈性腰帶，舒適時髦兼具。",                       1199,  799, "深藍色",  pexels(2285396), "25,26,27,28,29,30", wJeans, seller),
			product("女士百搭休閒長褲",   "微彈面料，修身直版，辦公休閒兩用。",                        699,  499, "卡其色",  pexels(3032392), "XS,S,M,L,XL",  wCasualP, seller),
			product("女士尖頭細跟高跟鞋", "細跟尖頭設計，增高顯瘦，宴會通勤皆宜。",                   1499,  999, "黑色",    pexels(1261421), "34,35,36,37,38,39", wHeels, seller),
			product("女士白色網面運動鞋", "輕量網眼面料，厚底緩震，日常出行首選。",                   1299,  899, "白色",    pexels(2048994), "35,36,37,38,39", wSneak, seller),
			product("女士皮革短靴",       "牛皮面料，側拉鍊設計，秋冬百搭款。",                       1999, 1299, "棕色",    pexels(298863),  "35,36,37,38,39", wBoots, seller),

			// ── Kids ─────────────────────────────────────────────────────────
			product("男童卡通印花T恤",    "100%純棉，活潑印花，柔軟親膚不起皺。",                     399,  269, "天空藍",  pexels(1620779), "90,100,110,120,130cm", boysTsh, seller),
			product("男童彈力修身長褲",   "彈力棉質，修身版型，活動自如輕鬆舒適。",                    499,  349, "深灰色",  pexels(35537),   "90,100,110,120,130cm", boysP, seller),
			product("女童蕾絲公主洋裝",   "蕾絲荷葉邊設計，柔軟面料，女孩最愛公主風。",                699,  499, "粉紅色",  pexels(35537),   "90,100,110,120,130cm", girlsDr, seller),
			product("女童碎花蓬蓬裙洋裝", "碎花蓬蓬裙設計，春夏甜美必備。",                           599,  419, "白底碎花", pexels(1148998), "90,100,110,120cm",     girlsDr, seller),
			product("嬰兒有機棉連身衣",   "有機棉認證，肌膚友善，按扣開合換尿布方便。",                299,  199, "米白色",  pexels(1620779), "59,66,73,80cm",        babyOne, seller),
			product("嬰兒四件組套裝",     "上衣+褲子+帽子+圍兜全套，有機棉柔軟親膚。",               499,  329, "天空藍",  pexels(296301),  "59,66,73,80cm",        babySets, seller),

			// ── Electronics ──────────────────────────────────────────────────
			product("Apple iPhone 15 Pro 256GB", "A17 Pro晶片，鈦金屬機身，4800萬像素三鏡頭系統。",    35000, 32800, "鈦金色", pexels(699122),  "均碼", iphone15, seller),
			product("Samsung Galaxy S24 Ultra",  "Galaxy AI智慧功能，S Pen手寫，5000mAh電池。",        33000, 30500, "幻影黑", pexels(1092644), "均碼", galaxyS24, seller),
			product("OPPO Find X7 Pro",          "哈蘇影像系統，百瓦超級閃充，旗艦級拍照體驗。",        25000, 22800, "海閱藍", pexels(2692890), "均碼", oppoX7, seller),
			product("MacBook Pro 14吋 M3 Pro",   "M3 Pro晶片，Liquid Retina XDR顯示器，長達18小時電力。", 58000, 54800, "太空灰", pexels(18105),   "均碼", macbookP, seller),
			product("Dell XPS 13 13代 i7",       "Intel Core i7，OLED觸控螢幕，極致輕薄機身。",         38000, 35500, "鉑金銀", pexels(2582937), "均碼", dellXPS, seller),
			product("ASUS ROG Zephyrus G14",     "AMD Ryzen 9，RTX 4070，2K 165Hz電競螢幕。",           45000, 42000, "月耀白", pexels(7974572), "均碼", asusROG, seller),
			product("Bose QuietComfort 45",      "業界頂級主動降噪，舒適耳墊，連續24小時播放。",          9900,  8200, "黑色",  pexels(3394650), "均碼", boseQC, seller),
			product("Sony WH-1000XM5 降噪耳機",  "高階降噪技術，LDAC高音質傳輸，30小時續航。",           11500,  9800, "午夜黑",pexels(1649771), "均碼", sonyXM5, seller),
			product("Apple AirPods Pro 第二代",   "主動降噪，通透模式，H2晶片驅動智慧音效。",              8200,  7500, "白色",  pexels(3587478), "均碼", airpodsPro, seller),
			product("Apple iPad Pro 12.9吋 M2",  "M2晶片，Liquid Retina XDR螢幕，支援Apple Pencil。",   26800, 25000, "太空灰",pexels(1334597), "均碼", ipadPro, seller),
			product("Samsung Galaxy Tab S9 Ultra","14.6吋Dynamic AMOLED，S Pen隨附，超大螢幕生產力。",   28000, 25500, "米霧灰",pexels(106344),  "均碼", galaxyTab, seller),
			product("Sony Alpha 7 IV 全片幅微單", "3300萬像素全片幅感光元件，4K 60p錄影，電影級色彩。",   75000, 69800, "黑色",  pexels(90946),   "均碼", sonyAlpha, seller),
			product("Canon EOS R6 Mark II",      "2420萬像素全片幅，連拍40fps，專業級防抖技術。",        52000, 48500, "黑色",  pexels(225157),  "均碼", canonR6, seller),
			product("Apple Watch Series 9 GPS",  "新一代S9晶片，精確雙精度GPS，血氧偵測。",              12900, 11500, "午夜色",pexels(437037),  "均碼", appleW9, seller),
			product("Samsung Galaxy Watch 6 44mm","藍寶石玻璃錶面，睡眠追蹤，IP68防水防塵。",            8900,  7500, "石墨黑",pexels(190819),  "均碼", galaxyW6, seller),
			product("Sony PlayStation 5 光碟版",  "AMD Zen 2 CPU，RDNA 2 GPU，DualSense觸覺回饋手把。", 18900, 16500, "白色",  pexels(3945659), "均碼", ps5L3, seller),

			// ── Furniture ────────────────────────────────────────────────────
			product("北歐風L型布藝沙發",  "優質布面，L型設計容納全家，環保材質。",                    15800, 12900, "灰色",  pexels(1350789), "均碼", lSofa, seller),
			product("現代輕奢L型皮沙發",  "頭層牛皮，實木腳，雲感柔軟填充。",                         22000, 18500, "棕色",  pexels(584399),  "均碼", lSofa, seller),
			product("實木白橡雙人床架",   "北美白橡實木，無甲醛塗裝，環保安心。",                      8800,  7200, "原木色",pexels(276724),  "雙人,雙人加大",  dblBed, seller),
			product("人體工學電腦辦公椅", "腰靠可調，透氣網背，久坐不疲勞。",                          5800,  4200, "黑色",  pexels(271743),  "均碼", offChair, seller),
			product("電競人體工學椅",     "4D扶手調節，仿皮面料，電競風格設計。",                      7800,  6200, "黑紅色",pexels(2062431), "均碼", offChair, seller),

			// ── Sports ───────────────────────────────────────────────────────
			product("女士高腰瑜伽健身褲", "四向彈力面料，高腰設計，瑜伽健身跑步皆宜。",                 999,  699, "黑色",   pexels(3822583), "XS,S,M,L,XL",  fitCloth, seller),
			product("男士速乾健身T恤",    "吸濕排汗，超輕透氣，訓練時的最佳夥伴。",                    699,  499, "白色",   pexels(2827392), "S,M,L,XL",     fitCloth, seller),
			product("輕量三人露營帳篷",   "防水3000mm，雙層設計，快速搭建10分鐘完成。",               2800, 1999, "橄欖綠", pexels(6539665), "均碼",         campGear, seller),
			product("多功能登山背包 60L", "背負系統可調，防水材質，多隔層收納設計。",                  1999, 1499, "深藍色", pexels(1294731), "均碼",         hikeGear, seller),
			product("Nike Air Zoom 跑鞋", "Zoom Air緩震，Dynamic Fit貼合設計，長距離跑步首選。",        3200, 2499, "白黑",   pexels(2048994), "38,39,40,41,42,43,44", runShoes, seller),
			product("Adidas Ultraboost 23","Boost中底全掌緩震，PRIMEKNIT+編織鞋面，日跑萬步無負擔。",  3800, 2999, "黑白",   pexels(209977),  "38,39,40,41,42,43,44", runShoes, seller),

			// ── Beauty ───────────────────────────────────────────────────────
			product("LANEIGE 保濕水面霜", "雪融保濕配方，深層補水，適合所有肌膚類型。",              1280,  999, "白色",   pexels(3321416), "均碼", moist, seller),
			product("SK-II 大眼精華乳液", "Pitera™成分，提亮修護，全效護膚首選。",                   2800, 2299, "白色",   pexels(2253879), "均碼", moist, seller),
			product("Biore UV保濕防曬乳", "SPF50+ PA++++，保濕不油膩，日常防護必備。",               499,  359, "白色",   pexels(3321416), "均碼", sunsc, seller),
			product("The Ordinary 維他命C精華", "高濃度維他命C，提亮均勻膚色，抗氧化修護。",          699,  549, "橘色",   pexels(2253879), "均碼", serum, seller),
			product("MAC 子彈頭唇膏",     "持色8小時，滋潤飽和，50+色號任選。",                      1100,  890, "正紅色", pexels(3737586), "均碼", lipstick, seller),
			product("YSL 超模精光唇膏",   "光澤感唇彩，裸感映襯，時尚大牌首選。",                    1600, 1290, "玫瑰粉", pexels(1366942), "均碼", lipstick, seller),
			product("NARS 絲絨霧面粉底液","絲滑霧面，12小時持妝，多種膚色可選。",                    1500, 1199, "多色",   pexels(1366942), "均碼", foundation, seller),
			product("Chanel N°5 女士香水", "經典花香調，淡雅持久，時尚女性必備。",                   4800, 3999, "透明",   pexels(2895305), "均碼", wPerfume, seller),
			product("KERASTASE 護色洗髮精","珍貴精油配方，護色防脫，染燙受損髮必備。",               1200,  950, "金色",   pexels(3735187), "均碼", shampoo, seller),

			// ── Accessories ──────────────────────────────────────────────────
			product("Daniel Wellington 簡約手錶","極簡北歐設計，義大利真皮錶帶，百搭時尚首選。",      3500, 2800, "玫瑰金", pexels(2113994), "均碼", fashionW, seller),
			product("CASIO 復古方形手錶", "復古卡西歐風格，LED電子顯示，防水50米。",                  1500, 1199, "金色",   pexels(277390),  "均碼", fashionW, seller),
			product("SEIKO 精工5系列機械錶","自動上鍊，22石機芯，100米防水日常機械首選。",            5800, 4500, "銀色",   pexels(437037),  "均碼", mechanicalW, seller),
			product("SEIKO 黑鮪魚罐頭潛水錶","200米防水，雙層防水錶冠，不鏽鋼錶殼。",               8800, 7200, "黑色",   pexels(190819),  "均碼", mechanicalW, seller),
			product("Coach 經典C字皮革手提包","經典C字logo壓紋，牛皮面料，多夾層設計。",             8800, 7200, "棕色",   pexels(934065),  "均碼", handbags, seller),
			product("帆布大容量托特包",    "帆布材質，大容量設計，環保耐用日常首選。",                  699,  499, "米白色", pexels(1152077), "均碼", handbags, seller),
			product("Fjallraven Kanken後背包","防水防汗材質，人體工學背帶，瑞典工藝品質。",            2800, 2200, "深藍色", pexels(1294731), "均碼", backpacks, seller),
			product("925純銀星星月亮項鍊", "925純銀材質，輕奢鎖骨鏈，附禮盒包裝。",                    899,  699, "銀色",   pexels(1179539), "均碼", necklaces, seller),
			product("天然珍珠手鍊",       "天然淡水珍珠，925純銀扣件，優雅高貴每日可戴。",            1299,  999, "白色",   pexels(1689731), "均碼", bracelets, seller)
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
