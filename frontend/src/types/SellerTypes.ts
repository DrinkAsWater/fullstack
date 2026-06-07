export interface PickupAddress {
  name: string;
  mobile: string;
  pinCode: string;
  address: string;
  locality: string;
  city: string;
}
export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}
export interface BusinessDetails {
  businessName: string;
}
export interface Seller {
  id?: number;
  // Flat field returned by the GET /products, GET /products/{id}, GET /api/cart
  // SellerSummary projection (id/sellerName/businessName only, no sensitive fields).
  // The full Seller entity (e.g. orders/reviews) still nests it under businessDetails.
  businessName?: string;
  mobile: string;
  otp: string;
  GSTIN: string;
  pickupAddress: PickupAddress;
  bankDetails: BankDetails;
  sellerName: string;
  email: string;
  businessDetails: BusinessDetails;
  password: string;
  accountStatus?: string;
}
export interface SellerReport {
  id: number;
  seller: Seller;
  totalEarnings: number;
  totalSales: number;
  totalRefunds: number;
  totalTax: number;
  netEarnings: number;
  totalorders: number;
  canceledOrders: number;
  totalTransactions: number;
}
