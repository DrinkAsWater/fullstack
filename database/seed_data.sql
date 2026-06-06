-- ================================================================
-- Wu E-Commerce  假資料 SQL Script  (MS SQL Server)
-- 資料庫: wu_ecommerce
-- ================================================================
-- 執行前請確認後端已啟動至少一次（Hibernate 會自動建表）
-- 用 SSMS 連線後直接執行此腳本即可
-- ================================================================

USE wu_ecommerce;
GO

-- ────────────────────────────────────────────────────────────────
-- 0. 清除舊資料（可選，若要全部重置取消註解）
-- ────────────────────────────────────────────────────────────────
-- DELETE FROM Deal;
-- DELETE FROM HomeCategory;
-- DELETE FROM Product_images;
-- DELETE FROM Product;
-- DELETE FROM Category;
-- DELETE FROM Seller;
-- DELETE FROM Address;
-- GO

-- ────────────────────────────────────────────────────────────────
-- 1. HomeCategory
--    section 欄位為 Java enum 序數：
--    0 = ELECTRIC_CATEGORIES
--    1 = GRID
--    2 = SHOP_BY_CATEGORIES
--    3 = DEALS
-- ────────────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM HomeCategory)
BEGIN
    INSERT INTO HomeCategory (name, image, categoryId, section) VALUES

    -- ELECTRIC_CATEGORIES（頂部 icon 列）
    (N'智慧手機',     'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=200',   'smartphones',   0),
    (N'筆記型電腦',   'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200',            'laptops',       0),
    (N'智慧手錶',     'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=200',   'smartwatches',  0),
    (N'平板電腦',     'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=200', 'tablets',       0),
    (N'耳機音響',     'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200', 'headphones',    0),
    (N'相機攝影',     'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=200',     'cameras',       0),
    (N'遊戲周邊',     'https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=200', 'gaming',        0),

    -- GRID（首頁相片牆）
    (N'女士禮服',     'https://images.pexels.com/photos/13966969/pexels-photo-13966969.jpeg?auto=compress&cs=tinysrgb&w=600', 'clothing-women', 1),
    (N'手錶配件',     'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=600',   'smartwatches',   1),
    (N'女士連衣裙',   'https://images.pexels.com/photos/12730873/pexels-photo-12730873.jpeg?auto=compress&cs=tinysrgb&w=600', 'clothing-women', 1),
    (N'男士休閒服',   'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',   'clothing-men',   1),
    (N'男士商務裝',   'https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg?auto=compress&cs=tinysrgb&w=600',   'clothing-men',   1),
    (N'男士丹寧',     'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',   'clothing-men',   1),

    -- SHOP_BY_CATEGORIES（圓形類別卡）
    (N'居家傢俱', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400', 'furniture',      2),
    (N'美妝保養', 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=400', 'skincare',       2),
    (N'生鮮食品', 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', 'groceries',      2),
    (N'女士服飾', 'https://images.pexels.com/photos/3170438/pexels-photo-3170438.jpeg?auto=compress&cs=tinysrgb&w=400', 'clothing-women', 2),
    (N'兒童玩具', 'https://images.pexels.com/photos/1620779/pexels-photo-1620779.jpeg?auto=compress&cs=tinysrgb&w=400', 'toys',           2),
    (N'手錶珠寶', 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400', 'watches',        2),
    (N'運動戶外', 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=400', 'sports',         2),
    (N'圖書文具', 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400',   'books',          2),
    (N'男士服飾', 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400', 'clothing-men',   2),
    (N'汽車用品', 'https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg?auto=compress&cs=tinysrgb&w=400', 'automotive',     2),

    -- DEALS（優惠輪播）
    (N'手機限時優惠', 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',   'smartphones',    3),
    (N'筆電特賣折扣', 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400', 'laptops',        3),
    (N'女裝獨家優惠', 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400', 'clothing-women', 3),
    (N'傢俱限量特惠', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400', 'furniture',      3),
    (N'精品錶款折扣', 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400', 'watches',        3),
    (N'運動品牌特賣', 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=400', 'sports',         3);

    PRINT N'HomeCategory 資料插入完成';
END
ELSE
    PRINT N'HomeCategory 已有資料，跳過插入';
GO

-- ────────────────────────────────────────────────────────────────
-- 2. Deal  （關聯 DEALS section 的 HomeCategory）
-- ────────────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM Deal)
BEGIN
    INSERT INTO Deal (discount, category_id)
    SELECT 20, id FROM HomeCategory WHERE categoryId = 'smartphones'    AND section = 3;

    INSERT INTO Deal (discount, category_id)
    SELECT 15, id FROM HomeCategory WHERE categoryId = 'laptops'        AND section = 3;

    INSERT INTO Deal (discount, category_id)
    SELECT 30, id FROM HomeCategory WHERE categoryId = 'clothing-women' AND section = 3;

    INSERT INTO Deal (discount, category_id)
    SELECT 25, id FROM HomeCategory WHERE categoryId = 'furniture'      AND section = 3;

    INSERT INTO Deal (discount, category_id)
    SELECT 10, id FROM HomeCategory WHERE categoryId = 'watches'        AND section = 3;

    INSERT INTO Deal (discount, category_id)
    SELECT 35, id FROM HomeCategory WHERE categoryId = 'sports'         AND section = 3;

    PRINT N'Deal 資料插入完成';
END
ELSE
    PRINT N'Deal 已有資料，跳過插入';
GO

-- ────────────────────────────────────────────────────────────────
-- 3. Address  （賣家取貨地址）
-- ────────────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM Address WHERE mobile = '0912345678')
BEGIN
    INSERT INTO Address (address, city, state, pinCode, mobile) VALUES
    (N'台北市信義區信義路五段7號',  N'台北市', N'台灣', '110', '0912345678'),
    (N'新北市板橋區中山路一段188號', N'新北市', N'台灣', '220', '0923456789'),
    (N'台中市西屯區台灣大道三段99號', N'台中市', N'台灣', '407', '0934567890');

    PRINT N'Address 資料插入完成';
END
ELSE
    PRINT N'Address 已有資料，跳過插入';
GO

-- ────────────────────────────────────────────────────────────────
-- 4. Seller  （賣家帳號，密碼為 BCrypt 編碼後的 "Wu@12345"）
--    accountStatus: 0=PENDING_VERIFICATION, 1=ACTIVE, 2=SUSPENDED,
--                   3=DEACTIVATED, 4=BANNED, 5=CLOSED
--    role 以字串儲存（ROLE_SELLER）
-- ────────────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM Seller WHERE email = 'seller@wushop.com')
BEGIN
    DECLARE @addrId1 BIGINT = (SELECT TOP 1 id FROM Address WHERE mobile = '0912345678');
    DECLARE @addrId2 BIGINT = (SELECT TOP 1 id FROM Address WHERE mobile = '0923456789');
    DECLARE @addrId3 BIGINT = (SELECT TOP 1 id FROM Address WHERE mobile = '0934567890');

    -- BCrypt hash of "Wu@12345"（可用 https://bcrypt-generator.com 重新產生）
    DECLARE @bcrypt NVARCHAR(255) = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhy';

    INSERT INTO Seller
        (sellerName, email, password, mobile,
         businessName, businessEmail, businessMobile, businessAddress,
         businesslogo, banner,
         accountNumber, accountHolderName, ifscCode,
         GSTIN, role, isEmailVerified, accountStatus,
         pickupAddress_id)
    VALUES
    (N'Wu 時尚精品', 'seller@wushop.com', @bcrypt, '0912345678',
     N'Wu 時尚精品有限公司', 'seller@wushop.com', '0912345678', N'台北市信義區信義路五段7號',
     'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=200',
     'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800',
     '12345678901234', N'Wu 時尚精品有限公司', 'CTBC0001234',
     '12ABCDE1234F1Z5', 'ROLE_SELLER', 1, 1,
     @addrId1),

    (N'潮流服飾館', 'trend@wushop.com', @bcrypt, '0923456789',
     N'潮流服飾館股份有限公司', 'trend@wushop.com', '0923456789', N'新北市板橋區中山路一段188號',
     'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=200',
     'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800',
     '98765432109876', N'潮流服飾館股份有限公司', 'ESUN0009876',
     '29XYZAB5678G2M1', 'ROLE_SELLER', 1, 1,
     @addrId2),

    (N'兒童天地', 'kids@wushop.com', @bcrypt, '0934567890',
     N'兒童天地有限公司', 'kids@wushop.com', '0934567890', N'台中市西屯區台灣大道三段99號',
     'https://images.pexels.com/photos/1620779/pexels-photo-1620779.jpeg?auto=compress&cs=tinysrgb&w=200',
     'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=800',
     '11223344556677', N'兒童天地有限公司', 'TCSB0005678',
     '33KLMNO9012H3N8', 'ROLE_SELLER', 1, 1,
     @addrId3);

    PRINT N'Seller 資料插入完成';
END
ELSE
    PRINT N'Seller 已有資料，跳過插入';
GO

-- ────────────────────────────────────────────────────────────────
-- 5. Category  （3 層分類架構）
-- ────────────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM Category)
BEGIN
    -- Level 1（根分類）
    INSERT INTO Category (name, categoryId, level, parentCategory_id) VALUES
    (N'男士服飾', 'mens_wear',   1, NULL),
    (N'女士服飾', 'womens_wear', 1, NULL),
    (N'童裝',     'kids_wear',   1, NULL),
    (N'電子產品', 'electronics', 1, NULL);

    DECLARE @mens   BIGINT = (SELECT id FROM Category WHERE categoryId = 'mens_wear');
    DECLARE @womens BIGINT = (SELECT id FROM Category WHERE categoryId = 'womens_wear');
    DECLARE @kids   BIGINT = (SELECT id FROM Category WHERE categoryId = 'kids_wear');
    DECLARE @elec   BIGINT = (SELECT id FROM Category WHERE categoryId = 'electronics');

    -- Level 2
    INSERT INTO Category (name, categoryId, level, parentCategory_id) VALUES
    (N'男士T恤',   'mens_tshirts',  2, @mens),
    (N'男士襯衫',  'mens_shirts',   2, @mens),
    (N'男士長褲',  'mens_pants',    2, @mens),
    (N'女士裙裝',  'womens_dresses',2, @womens),
    (N'女士民族服','womens_ethnic', 2, @womens),
    (N'童裝休閒',  'kids_casual',   2, @kids),
    (N'手機',      'smartphones_cat',2, @elec),
    (N'筆電',      'laptops_cat',   2, @elec);

    DECLARE @mensT   BIGINT = (SELECT id FROM Category WHERE categoryId = 'mens_tshirts');
    DECLARE @mensS   BIGINT = (SELECT id FROM Category WHERE categoryId = 'mens_shirts');
    DECLARE @mensP   BIGINT = (SELECT id FROM Category WHERE categoryId = 'mens_pants');
    DECLARE @womD    BIGINT = (SELECT id FROM Category WHERE categoryId = 'womens_dresses');
    DECLARE @womE    BIGINT = (SELECT id FROM Category WHERE categoryId = 'womens_ethnic');
    DECLARE @kidsC   BIGINT = (SELECT id FROM Category WHERE categoryId = 'kids_casual');
    DECLARE @phones  BIGINT = (SELECT id FROM Category WHERE categoryId = 'smartphones_cat');
    DECLARE @laptops BIGINT = (SELECT id FROM Category WHERE categoryId = 'laptops_cat');

    -- Level 3
    INSERT INTO Category (name, categoryId, level, parentCategory_id) VALUES
    (N'男士棉質T恤',    'mens_cotton_tshirts', 3, @mensT),
    (N'男士丹寧外套',   'mens_denim',          3, @mensS),
    (N'男士商務襯衫',   'mens_formal_shirts',  3, @mensS),
    (N'男士休閒長褲',   'mens_chino_pants',    3, @mensP),
    (N'女士休閒裙',     'womens_casual_dresses',3, @womD),
    (N'女士碎花裙',     'womens_floral_dresses',3, @womD),
    (N'女士庫尔提',     'womens_kurti',        3, @womE),
    (N'童裝有機棉套裝', 'kids_organic_sets',   3, @kidsC),
    (N'Android 旗艦機', 'android_flagship',    3, @phones),
    (N'輕薄筆電',       'ultrabook',           3, @laptops);

    PRINT N'Category 資料插入完成';
END
ELSE
    PRINT N'Category 已有資料，跳過插入';
GO

-- ────────────────────────────────────────────────────────────────
-- 6. Product + Product_images
--    使用 Pexels CDN 圖片 URL
-- ────────────────────────────────────────────────────────────────
IF NOT EXISTS (SELECT 1 FROM Product)
BEGIN
    DECLARE @seller1 BIGINT = (SELECT TOP 1 id FROM Seller WHERE email = 'seller@wushop.com');
    DECLARE @seller2 BIGINT = (SELECT TOP 1 id FROM Seller WHERE email = 'trend@wushop.com');
    DECLARE @seller3 BIGINT = (SELECT TOP 1 id FROM Seller WHERE email = 'kids@wushop.com');

    DECLARE @catCottonT  BIGINT = (SELECT id FROM Category WHERE categoryId = 'mens_cotton_tshirts');
    DECLARE @catDenim    BIGINT = (SELECT id FROM Category WHERE categoryId = 'mens_denim');
    DECLARE @catFormal   BIGINT = (SELECT id FROM Category WHERE categoryId = 'mens_formal_shirts');
    DECLARE @catChino    BIGINT = (SELECT id FROM Category WHERE categoryId = 'mens_chino_pants');
    DECLARE @catCasual   BIGINT = (SELECT id FROM Category WHERE categoryId = 'womens_casual_dresses');
    DECLARE @catFloral   BIGINT = (SELECT id FROM Category WHERE categoryId = 'womens_floral_dresses');
    DECLARE @catKurti    BIGINT = (SELECT id FROM Category WHERE categoryId = 'womens_kurti');
    DECLARE @catKids     BIGINT = (SELECT id FROM Category WHERE categoryId = 'kids_organic_sets');

    INSERT INTO Product
        (title, description, mrpPrice, sellingPrice, discountPercent,
         quantity, color, numRatings, Sizes,
         category_id, seller_id, createdAt)
    VALUES
    -- 男士服飾 (seller1)
    (N'男士休閒棉質T恤',
     N'高品質純棉製成，透氣舒適，適合日常穿著。版型修身，多色可選。',
     599, 399, 33, 100, N'深藍色', 0, 'S,M,L,XL,XXL',
     @catCottonT, @seller1, GETDATE()),

    (N'男士牛仔外套',
     N'經典丹寧外套，耐穿百搭，適合春秋季節穿著。多口袋設計，實用又時尚。',
     1299, 899, 31, 80, N'靛藍色', 0, 'M,L,XL,XXL',
     @catDenim, @seller1, GETDATE()),

    (N'男士商務格紋襯衫',
     N'精緻格紋設計，適合商務及日常穿著。柔軟面料，穿著舒適不起皺。',
     899, 599, 33, 60, N'藍白格', 0, 'S,M,L,XL',
     @catFormal, @seller1, GETDATE()),

    (N'男士休閒長褲',
     N'彈性腰帶設計，穿脫方便，適合日常休閒穿著。輕盈面料，全季適用。',
     799, 549, 31, 90, N'卡其色', 0, '28,30,32,34,36',
     @catChino, @seller1, GETDATE()),

    -- 女士服飾 (seller2)
    (N'女士夏日碎花裙',
     N'清新碎花印花，飄逸裙擺，展現女性優雅氣質。適合夏日出行或約會。',
     1099, 699, 36, 120, N'白底碎花', 0, 'XS,S,M,L,XL',
     @catFloral, @seller2, GETDATE()),

    (N'女士休閒連衣裙',
     N'簡約設計，舒適百搭，適合日常通勤或休閒出行。面料柔軟親膚。',
     799, 499, 38, 150, N'莫蘭迪綠', 0, 'XS,S,M,L',
     @catCasual, @seller2, GETDATE()),

    (N'女士波西米亞長裙',
     N'波西米亞風格設計，獨特印花圖案，讓您在人群中脫穎而出。適合海邊度假或節日活動。',
     1299, 849, 35, 70, N'橘紅印花', 0, 'S,M,L,XL',
     @catFloral, @seller2, GETDATE()),

    (N'女士民族風庫尔提',
     N'傳統民族風格設計，精緻刺繡工藝，展現獨特文化魅力。面料透氣，穿著舒適。',
     1499, 999, 33, 50, N'孔雀藍', 0, 'XS,S,M,L,XL,XXL',
     @catKurti, @seller2, GETDATE()),

    (N'女士時尚條紋上衣',
     N'時尚條紋設計，簡約大方，可搭配牛仔褲或裙子。彈性面料，舒適百搭。',
     599, 399, 33, 200, N'黑白條紋', 0, 'XS,S,M,L,XL',
     @catCasual, @seller2, GETDATE()),

    -- 童裝 (seller3)
    (N'童裝有機棉套裝',
     N'採用有機棉製成，不含有害物質，安全呵護寶寶皮膚。可愛印花設計，兒童最愛。',
     699, 449, 36, 80, N'天空藍', 0, '90cm,100cm,110cm,120cm,130cm',
     @catKids, @seller3, GETDATE());

    PRINT N'Product 資料插入完成';

    -- 插入對應圖片（Product_images ElementCollection table）
    INSERT INTO Product_images (Product_id, images)
    SELECT p.id,
        CASE p.title
            WHEN N'男士休閒棉質T恤'   THEN 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'男士牛仔外套'       THEN 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'男士商務格紋襯衫'   THEN 'https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'男士休閒長褲'       THEN 'https://images.pexels.com/photos/1030946/pexels-photo-1030946.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'女士夏日碎花裙'     THEN 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'女士休閒連衣裙'     THEN 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'女士波西米亞長裙'   THEN 'https://images.pexels.com/photos/2916440/pexels-photo-2916440.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'女士民族風庫尔提'   THEN 'https://images.pexels.com/photos/2285396/pexels-photo-2285396.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'女士時尚條紋上衣'   THEN 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400'
            WHEN N'童裝有機棉套裝'     THEN 'https://images.pexels.com/photos/1620779/pexels-photo-1620779.jpeg?auto=compress&cs=tinysrgb&w=400'
        END
    FROM Product p
    WHERE p.title IN (
        N'男士休閒棉質T恤', N'男士牛仔外套', N'男士商務格紋襯衫', N'男士休閒長褲',
        N'女士夏日碎花裙', N'女士休閒連衣裙', N'女士波西米亞長裙', N'女士民族風庫尔提',
        N'女士時尚條紋上衣', N'童裝有機棉套裝'
    );

    PRINT N'Product_images 資料插入完成';
END
ELSE
    PRINT N'Product 已有資料，跳過插入';
GO

-- ────────────────────────────────────────────────────────────────
-- 7. 驗證
-- ────────────────────────────────────────────────────────────────
SELECT N'HomeCategory 筆數' AS [資料表], COUNT(*) AS [筆數] FROM HomeCategory
UNION ALL
SELECT N'Deal',    COUNT(*) FROM Deal
UNION ALL
SELECT N'Seller',  COUNT(*) FROM Seller
UNION ALL
SELECT N'Category',COUNT(*) FROM Category
UNION ALL
SELECT N'Product', COUNT(*) FROM Product
UNION ALL
SELECT N'Product_images', COUNT(*) FROM Product_images;
GO

PRINT N'================================================================';
PRINT N'所有假資料插入完成！';
PRINT N'賣家登入帳號: seller@wushop.com / Wu@12345';
PRINT N'管理員帳號:   zhewu3297@gmail.com / Drink';
PRINT N'================================================================';
