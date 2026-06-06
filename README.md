# Wu — 全端電商平台

多角色電商系統，支援顧客購物、賣家管理、管理員後台，整合 OTP 登入、Stripe / Razorpay 金流。

---

## 目錄

- [技術架構](#技術架構)
- [專案結構](#專案結構)
- [環境需求](#環境需求)
- [快速啟動](#快速啟動)
- [後端](#後端)
  - [設定檔](#設定檔)
  - [安全機制](#安全機制)
  - [封裝層說明](#封裝層說明)
  - [API 文件](#api-文件)
- [前端](#前端)
  - [技術選型](#技術選型)
  - [目錄結構](#目錄結構)
  - [路由對照](#路由對照)
  - [Redux Store](#redux-store)
  - [前端指令](#前端指令)
- [登入流程](#登入流程)
- [金流流程](#金流流程)
- [已知問題](#已知問題)

---

## 技術架構

| 層級 | 技術 |
|------|------|
| 後端框架 | Spring Boot 3.4.0 / Java 17 / Maven |
| 資料庫 | Microsoft SQL Server 2022 |
| ORM | Spring Data JPA (Hibernate) |
| 認證 | JWT (HMAC-SHA，24h 效期) + OTP via Gmail SMTP |
| 金流 | Stripe SDK 28.1 / Razorpay SDK 1.4.8 |
| 前端框架 | React 18 / TypeScript |
| 狀態管理 | Redux Toolkit + Redux Thunk |
| UI 元件 | MUI v6 / Tailwind CSS v3 |
| HTTP 客戶端 | Axios |
| 表單驗證 | Formik + Yup |

---

## 專案結構

```
fullstack/
├── backend/                     # Spring Boot 應用程式
│   └── src/main/java/com/example/demo/
│       ├── config/              # Security、JWT
│       ├── controller/          # REST 控制器
│       ├── domain/              # 列舉 (Role、OrderStatus…)
│       ├── exceptions/          # 全域例外處理
│       ├── model/               # JPA 實體
│       ├── repository/          # Spring Data 介面
│       ├── request/             # 請求 DTO
│       ├── response/            # 回應 DTO
│       ├── service/             # 介面 + impl 實作
│       └── utils/               # OTP 工具
└── frontend/                    # React 應用程式
    └── src/
        ├── admin/               # 管理員頁面
        ├── componet/            # 共用元件
        ├── config/              # Axios 設定 (API_URL)
        ├── customer/            # 顧客頁面與元件
        ├── Routes/              # 賣家 / 管理員子路由
        ├── seller/              # 賣家頁面
        ├── State/               # Redux slices 與 Store
        ├── Theme/               # MUI 主題
        └── data/                # 靜態資料 (HomeCategories)
```

---

## 環境需求

| 工具 | 版本 |
|------|------|
| Java | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| SQL Server | 2019 / 2022 |

---

## 快速啟動

### 1. 資料庫

```sql
CREATE DATABASE wu_ecommerce;
```

### 2. 後端

```bash
cd backend
./mvnw spring-boot:run
# 服務啟動於 http://localhost:8081
```

### 3. 前端

```bash
cd frontend
npm install
npm start
# 服務啟動於 http://localhost:3000
```

---

## 後端

### 設定檔

`backend/src/main/resources/application.properties`

```properties
server.port=8081

spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=wu_ecommerce;encrypt=false;
spring.datasource.username=sa
spring.datasource.password=<你的密碼>

spring.jpa.hibernate.ddl-auto=update

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=<Gmail 帳號>
spring.mail.password=<Gmail 應用程式密碼>

stripe.api.key=sk_test_...
```

> JWT Secret 目前硬編碼於 `config/JWT_CONSTANT.java`，生產環境應移至環境變數。

---

### 安全機制

- 認證方式：JWT Bearer Token，放置於 `Authorization` header
- Session：無狀態 (STATELESS)
- 密碼加密：BCrypt
- CORS：僅允許 `http://localhost:3000`

**端點保護規則（優先順序由上至下）：**

| 路徑 | 存取 |
|------|------|
| `GET /api/products/*/reviews` | 公開 |
| `/api/**` | 需認證 |
| 其餘所有路徑 | 公開 |

---

### 封裝層說明

```
Controller → Service (Interface) → ServiceImpl → Repository → DB
```

**自訂例外與 HTTP 對應：**

| 例外類別 | HTTP 狀態 |
|----------|-----------|
| `SellerException` | 400 |
| `ProductException` | 400 |
| `UserException` | 400 |
| `OrderException` | 400 |
| 其他 `Exception` | 500 |

**錯誤回應格式：**

```json
{
  "error": "product not found with id 99",
  "details": "uri=/api/products/99",
  "timestamp": "2026-06-06T14:23:01"
}
```

---

## API 文件

**Base URL：** `http://localhost:8081`

所有受保護端點需帶上：
```
Authorization: Bearer <JWT>
```

---

### 認證 (`/auth`)

#### `POST /auth/sent/login-signup-otp`
發送 OTP 至信箱。登入時 email 需加前綴 `signing_`。

| 欄位 | 型別 | 說明 |
|------|------|------|
| `email` | string | 新用戶直接填信箱；登入填 `signing_user@example.com` |
| `role` | enum | `ROLE_CUSTOMER` / `ROLE_SELLER` / `ROLE_ADMIN` |

```json
// 請求
{ "email": "user@example.com", "role": "ROLE_CUSTOMER" }

// 回應 200
{ "message": "otp發送成功" }
```

---

#### `POST /auth/signup`
驗證 OTP 並建立新顧客帳號，回傳 JWT。

```json
// 請求
{
  "email": "user@example.com",
  "fullName": "Wang Wei",
  "otp": "493021",
  "mobile": "0912345678"
}

// 回應 200
{
  "jwt": "eyJhbGciOiJIUzI1NiJ9...",
  "message": "註冊成功",
  "role": "ROLE_CUSTOMER"
}
```

---

#### `POST /auth/signin`
OTP 登入，回傳 JWT（顧客 / 管理員）。

```json
// 請求
{ "email": "user@example.com", "otp": "493021" }

// 回應 200
{ "jwt": "...", "message": "Login success", "role": "ROLE_CUSTOMER" }
```

---

### 使用者 (`/api/users`)

#### `GET /api/users/profile` — 需認證
取得目前登入用戶資料。

```json
// 回應 200
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "Wang Wei",
  "mobile": "0912345678",
  "role": "ROLE_CUSTOMER",
  "addresses": []
}
```

> `password` 欄位不會出現在任何回應中。

---

### 商品 (`/products`)

> 商品瀏覽端點位於 `/products/`（非 `/api/products/`），不需認證。

#### `GET /products/{productId}`
取得單一商品。

#### `GET /products/search?query=<關鍵字>`
關鍵字搜尋商品，回傳 `Product[]`。

#### `GET /products` — 分頁篩選

| 參數 | 說明 |
|------|------|
| `category` | 分類 ID |
| `color` | 顏色 |
| `size` | 尺寸 |
| `minPrice` | 最低售價（含） |
| `maxPrice` | 最高售價（含） |
| `minDiscount` | 最低折扣%（含） |
| `sort` | `price_low` / `price_high` |
| `pageNumber` | 頁碼（從 0 開始，每頁 10 筆） |

```json
// 回應 200
{
  "content": [ /* Product[] */ ],
  "totalElements": 120,
  "totalPages": 12,
  "number": 0,
  "size": 10
}
```

---

### 評論 (`/api/products/{productId}/reviews`)

| 方法 | 路徑 | 認證 | 說明 |
|------|------|------|------|
| GET | `/api/products/{productId}/reviews` | 不需 | 列出商品所有評論 |
| POST | `/api/products/{productId}/reviews` | 需 | 新增評論 |
| PATCH | `/api/reviews/{reviewId}` | 需（本人） | 修改評論 |
| DELETE | `/api/reviews/{reviewId}` | 需（本人） | 刪除評論 |

```json
// POST 請求
{
  "reviewText": "品質很好",
  "reviewRating": 4.5,
  "productImages": ["https://..."]
}
```

---

### 購物車 (`/api/cart`) — 需認證

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/cart` | 取得購物車 |
| PUT | `/api/cart/add` | 加入商品 |
| DELETE | `/api/cart/item/{cartItemId}` | 移除品項 |
| PUT | `/api/cart/item/{cartItemId}` | 更新數量（需 > 0） |

```json
// PUT /api/cart/add 請求
{ "productId": 42, "size": "M", "quantity": 2 }

// 取得購物車回應 200
{
  "id": 1,
  "totalItem": 2,
  "totalMrpPrice": 1800,
  "totalSellingPrice": 1500.0,
  "discount": 300,
  "couponCode": null,
  "cartItems": [...]
}
```

---

### 訂單 (`/api/orders`) — 需認證

| 方法 | 路徑 | 說明 |
|------|------|------|
| POST | `/api/orders?paymentMethod=STRIPE` | 從購物車建立訂單，回傳付款連結 |
| GET | `/api/orders/user` | 取得歷史訂單 |
| GET | `/api/orders/{orderId}` | 取得單筆訂單 |
| GET | `/api/orders/item/{orderItemId}` | 取得訂單品項 |
| PUT | `/api/orders/{orderId}/cancel` | 取消訂單 |

```json
// POST 請求 Body（送貨地址）
{
  "name": "Wang Wei",
  "locality": "信義區",
  "address": "市府路 1 號",
  "city": "台北市",
  "state": "Taiwan",
  "pinCode": "110001",
  "mobile": "0912345678"
}

// POST 回應 200
{ "payment_link_url": "https://rzp.io/i/xyz123" }
```

`paymentMethod` 可選：`RAZORPAY` 或 `STRIPE`。

---

### 付款 (`/api/payment`) — 需認證

#### `GET /api/payment/{paymentId}?paymentLinkId=<id>`
金流回調端點，確認付款並更新訂單狀態。

```json
// 回應 201
{ "message": "Payment successful" }
```

---

### 願望清單 (`/api/wishlist`) — 需認證

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/wishlist` | 取得願望清單 |
| POST | `/api/wishlist/add-product/{productId}` | 切換商品（無則加入，有則移除） |

---

### 優惠券 (`/api/coupons`) — 需認證

| 方法 | 路徑 | 角色 | 說明 |
|------|------|------|------|
| POST | `/api/coupons/apply` | 顧客 | 套用或移除優惠券 |
| POST | `/api/coupons/admin/create` | 管理員 | 建立優惠券 |
| DELETE | `/api/coupons/admin/delete/{id}` | 管理員 | 刪除優惠券 |
| GET | `/api/coupons/admin/all` | 管理員 | 列出所有優惠券 |

```bash
# 套用優惠券
POST /api/coupons/apply?apply=true&code=SUMMER20&orderValue=1200
```

```json
// 建立優惠券請求
{
  "code": "SUMMER20",
  "discountPercentage": 20,
  "validityStartDate": "2026-06-01T00:00:00",
  "validityEndDate": "2026-08-31T23:59:59",
  "minimumOrderValue": 500,
  "isActive": true
}
```

---

### 賣家帳號 (`/sellers`)

| 方法 | 路徑 | 認證 | 說明 |
|------|------|------|------|
| POST | `/sellers` | 不需 | 註冊賣家（觸發 Email 驗證） |
| PATCH | `/sellers/verify/{otp}` | 不需 | 驗證信箱 |
| POST | `/sellers/login` | 不需 | 賣家登入 |
| GET | `/sellers/profile` | 需（賣家） | 取得自己的資料 |
| GET | `/sellers/{id}` | 不需 | 取得賣家資料 |
| GET | `/sellers` | 不需 | 列出所有賣家（可篩選 status） |
| PATCH | `/sellers` | 需（賣家） | 更新賣家資料 |
| DELETE | `/sellers/{id}` | 不需 | 刪除賣家 |

```json
// POST /sellers 請求（最小欄位）
{
  "sellerName": "Tech Store",
  "email": "seller@example.com",
  "password": "secret",
  "mobile": "0987654321",
  "GSTIN": "29ABCDE1234F1Z5",
  "businessDetails": {
    "businessName": "Tech Store Ltd",
    "businessEmail": "biz@example.com",
    "businessMobile": "0987654321",
    "businessAddress": "No. 5 Commerce Rd",
    "logo": "https://...",
    "banner": "https://..."
  },
  "bankDetails": {
    "accountNumber": "1234567890",
    "ifscCode": "HDFC0001234",
    "accountHolderName": "Tech Store Ltd"
  },
  "pickupAddress": {
    "name": "倉庫 A", "city": "台北市", "state": "Taiwan",
    "address": "No. 10", "pinCode": "100", "mobile": "0987654321"
  }
}
```

---

### 賣家商品 (`/sellers/products`) — 需認證（賣家）

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/sellers/products` | 列出自己的商品 |
| POST | `/sellers/products` | 新增商品 |
| PUT | `/sellers/products/{productId}` | 更新商品 |
| DELETE | `/sellers/products/{productId}` | 刪除商品 |

```json
// POST /sellers/products 請求
{
  "title": "Classic Cotton T-Shirt",
  "description": "100% 棉，透氣舒適",
  "mrpPrice": 900,
  "sellingPrice": 720,
  "color": "White",
  "images": ["https://cdn.example.com/tshirt1.jpg"],
  "category": "clothing",
  "category2": "men",
  "category3": "tshirt",
  "sizes": "S,M,L,XL"
}
```

> `discountPercent` 自動計算：`(mrpPrice - sellingPrice) / mrpPrice * 100`

---

### 賣家訂單 (`/api/seller/orders`) — 需認證（賣家）

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/seller/orders` | 取得賣家所有訂單 |
| PATCH | `/api/seller/orders/{orderId}/status/{orderStatus}` | 更新訂單狀態 |

`orderStatus` 可選值：`PENDING` / `PLACED` / `CONFIRMED` / `SHIPPED` / `DELIVERED` / `CANCELLED`

---

### 管理員

| 方法 | 路徑 | 說明 |
|------|------|------|
| PATCH | `/api/seller/{id}/status/{status}` | 更新賣家帳號狀態 |
| PATCH | `/admin/home-category/{id}` | 更新首頁分類 |
| GET | `/admin/home-category` | 列出首頁分類 |
| GET | `/admin/deals` | 列出促銷活動 |
| POST | `/admin/deals` | 建立促銷 |
| PATCH | `/admin/deals/{id}` | 更新促銷 |
| DELETE | `/admin/deals/{id}` | 刪除促銷 |

`status` 可選值：`PENDING_VERIFICATION` / `ACTIVE` / `SUSPENDED` / `BANNED`

---

### 交易紀錄 (`/api/transactions`) — 需認證

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/transactions/seller` | 賣家的交易紀錄 |
| GET | `/api/transactions` | 所有交易（管理員用） |

---

## 前端

### 技術選型

| 套件 | 版本 | 用途 |
|------|------|------|
| React | 18.3 | UI 框架 |
| TypeScript | — | 型別安全 |
| Redux Toolkit | 2.5 | 全域狀態管理 |
| MUI | 6.1 | UI 元件庫 |
| Tailwind CSS | 3.4 | 工具類別樣式 |
| Axios | 1.7 | HTTP 請求（Base URL: `http://localhost:8081`） |
| React Router | 7.0 | 前端路由 |
| Formik + Yup | — | 表單與驗證 |
| react-slick | — | 輪播元件 |
| dayjs | — | 日期處理 |

---

### 目錄結構

```
frontend/src/
├── admin/
│   └── Pages/
│       ├── Dashboard/          # 管理員主頁
│       ├── Coupon/             # 優惠券管理
│       ├── HomePage/           # 首頁版位設定（Grid、Electronic、Deal）
│       └── Seller/             # 賣家審核列表
├── componet/                   # 共用元件
├── config/
│   └── Api.ts                  # Axios 實例（Base URL）
├── customer/
│   ├── componets/
│   │   └── Navbar/
│   ├── pages/
│   │   ├── Home/               # 首頁（Banner、分類、Deal）
│   │   ├── Product/            # 商品列表（篩選）
│   │   ├── Page Details/       # 商品詳情
│   │   ├── Cart/               # 購物車
│   │   ├── Checkout/           # 結帳（地址 + 金流選擇）
│   │   ├── Auth/               # OTP 登入 / 註冊
│   │   ├── Account/            # 用戶帳號
│   │   ├── Review/             # 評論
│   │   └── Become Seller/      # 成為賣家引導
│   └── Wishlist/               # 願望清單
├── seller/
│   └── componet/pages/
│       ├── SellerDashborad/    # 賣家總覽
│       ├── Products/           # 商品管理（Add / List）
│       ├── Orders/             # 訂單管理
│       ├── Payment/            # 付款資訊 / 交易紀錄
│       └── Account/            # 賣家個人資料
├── Routes/
│   ├── AdminRoutes.tsx         # 管理員子路由
│   └── SellerRoutes.tsx        # 賣家子路由
├── State/
│   ├── Store.ts                # Redux store 組合
│   ├── AuthSlice.ts            # 認證狀態
│   ├── fetchProduct.ts         # 商品 thunk
│   ├── customer/               # cart / order / product / wishlist slices
│   ├── seller/                 # seller / sellerProduct / sellerOrder / transaction slices
│   └── admin/                  # admin / deal slices
├── Theme/
│   └── customerTheme.ts        # MUI 主題設定
└── data/
    └── HomeCategories.ts       # 首頁分類靜態資料
```

---

### 路由對照

**顧客路由（`App.tsx`）：**

| 路徑 | 頁面 |
|------|------|
| `/` | 首頁 |
| `/login` | 登入 / 註冊（OTP） |
| `/products/:category` | 商品列表 |
| `/product-details/:categoryId/:name/:productId` | 商品詳情 |
| `/reviews/:productId` | 商品評論 |
| `/cart` | 購物車 |
| `/wishlist` | 願望清單 |
| `/checkout` | 結帳 |
| `/payment-success/:orderId` | 付款成功 |
| `/become-seller` | 成為賣家 |
| `/account/*` | 帳號管理 |

**賣家路由（`/seller/*`）：**

| 子路徑 | 頁面 |
|--------|------|
| `/seller/` | 儀表板 |
| `/seller/products` | 商品列表 |
| `/seller/add-product` | 新增商品 |
| `/seller/orders` | 訂單管理 |
| `/seller/payment` | 付款資訊 |
| `/seller/transaction` | 交易紀錄 |
| `/seller/account` | 個人資料 |

**管理員路由（`/admin/*`）：**

| 子路徑 | 頁面 |
|--------|------|
| `/admin/` | 賣家列表 |
| `/admin/coupon` | 優惠券列表 |
| `/admin/add-coupon` | 新增優惠券 |
| `/admin/home-grid` | 首頁 Grid 設定 |
| `/admin/electronics-category` | 電子分類設定 |
| `/admin/shop-by-category` | 分類購物設定 |
| `/admin/deals` | 促銷管理 |

---

### Redux Store

```
store
├── auth          # JWT、用戶資料
├── product       # 商品列表、詳情
├── cart          # 購物車狀態
├── order         # 訂單
├── wishlist      # 願望清單
├── customer      # 首頁分類、顧客資料
├── seller        # 賣家 profile
├── sellerProduct # 賣家商品
├── sellerOrder   # 賣家訂單
├── transactions  # 交易紀錄
├── admin         # 管理員資料
└── deal          # 促銷活動
```

JWT 儲存於 `localStorage`（key: `"jwt"`），App 初始化時自動讀取並發送 profile 請求。

---

### 前端指令

```bash
npm start        # 開發伺服器（http://localhost:3000，HMR）
npm run build    # 生產打包（輸出至 build/）
npm test         # 測試（互動模式）
npm run eject    # 匯出 webpack 設定（不可逆）
```

---

## 登入流程

### 顧客

```
1. POST /auth/sent/login-signup-otp
   新用戶：{ "email": "user@example.com", "role": "ROLE_CUSTOMER" }
   老用戶：{ "email": "signing_user@example.com", "role": "ROLE_CUSTOMER" }

2a. 新用戶 → POST /auth/signup
    { "email": "...", "fullName": "...", "otp": "...", "mobile": "..." }

2b. 老用戶 → POST /auth/signin
    { "email": "user@example.com", "otp": "..." }

3. 取得 JWT → 存入 localStorage → 帶入 Authorization header
```

### 賣家

```
1. POST /sellers              （註冊）
2. PATCH /sellers/verify/{otp}（驗證信箱）
3. POST /auth/sent/login-signup-otp
   { "email": "signing_seller@example.com", "role": "ROLE_SELLER" }
4. POST /sellers/login
   { "email": "seller@example.com", "otp": "..." }
5. 取得 JWT（role: ROLE_SELLER）
```

---

## 金流流程

```
顧客確認結帳
    │
    ▼
POST /api/orders?paymentMethod=STRIPE 或 RAZORPAY
（Body：送貨地址）
    │
    ▼
後端建立 PaymentOrder，呼叫 Stripe/Razorpay API
    │
    ▼
回傳 { payment_link_url: "https://..." }
    │
    ▼
前端跳轉至金流頁面
    │
    ▼
用戶完成付款，金流平台重導向前端
    │
    ▼
前端呼叫 GET /api/payment/{paymentId}?paymentLinkId=<id>
    │
    ▼
後端確認付款 → 更新訂單狀態 → 更新賣家報表 → 建立交易紀錄
    │
    ▼
回傳 { message: "Payment successful" }
```

---

## 已知問題

| 位置 | 問題 |
|------|------|
| `JWT_CONSTANT.java` | JWT Secret 硬編碼，生產環境應改為環境變數 |
| `DELETE /sellers/{id}` | Security config 未保護此端點，任何人可刪除賣家 |
| `DELETE /api/reviews/{reviewId}` | Path variable 名稱拼字錯誤（`rewviewId`），功能正常但易混淆 |
| `SellerProductController.updateProduct` | `@PathVariable` 名稱不符（`{productid}` vs `productId`），會注入 null |
| `OrderController.getOrderItemById` | 殘留 `System.out.println` 偵錯輸出 |
| `application.properties` | DB 密碼與 Gmail App 密碼不應提交至版本控制 |
