package com.example.demo.response;

import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

	private Long id;
	private String title;
	private String description;
	private int mrpPrice;
	private int sellingPrice;
	private int discountPercent;
	private int quantity;
	private String color;
	private List<String> images;
	private int numRatings;
	private String sizes;
	private LocalDateTime createdAt;
	private CategorySummary category;
	private SellerSummary seller;

	public static ProductResponse from(Product product) {
		ProductResponse response = new ProductResponse();
		response.setId(product.getId());
		response.setTitle(product.getTitle());
		response.setDescription(product.getDescription());
		response.setMrpPrice(product.getMrpPrice());
		response.setSellingPrice(product.getSellingPrice());
		response.setDiscountPercent(product.getDiscountPercent());
		response.setQuantity(product.getQuantity());
		response.setColor(product.getColor());
		response.setImages(product.getImages());
		response.setNumRatings(product.getNumRatings());
		response.setSizes(product.getSizes());
		response.setCreatedAt(product.getCreatedAt());

		if (product.getCategory() != null) {
			response.setCategory(CategorySummary.from(product.getCategory()));
		}
		if (product.getSeller() != null) {
			response.setSeller(SellerSummary.from(product.getSeller()));
		}
		return response;
	}

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class CategorySummary {
		private Long id;
		private String name;
		private String categoryId;
		private Integer level;

		public static CategorySummary from(com.example.demo.model.Category category) {
			return new CategorySummary(category.getId(), category.getName(), category.getCategoryId(),
					category.getLevel());
		}
	}

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class SellerSummary {
		private Long id;
		private String sellerName;
		private String businessName;

		public static SellerSummary from(com.example.demo.model.Seller seller) {
			String businessName = seller.getBusinessDetails() != null ? seller.getBusinessDetails().getBusinessName()
					: null;
			return new SellerSummary(seller.getId(), seller.getSellerName(), businessName);
		}
	}
}
