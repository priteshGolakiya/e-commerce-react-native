import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
// Define your navigation params type
type RootStackParamList = {
  ProductDetails: { id: string };
  // ... other screens in your navigation stack
};

interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  category: Category;
  subcategory: Subcategory;
  finalPrice: number;
  offers: string;
  deliveryOptions: string;
  averageRating: number;
  reviews: Review[];
  id: string;
}

interface Category {
  _id: string;
  name: string;
  subcategories: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface Subcategory {
  _id: string;
  name: string;
  category: string;
  products: any[];
  __v: number;
  id: string;
}

interface Review {
  user: string;
  product: string;
  rating: number;
  review: string;
  date: Date;
}

interface ProductListProps {
  product: Product;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PRODUCT_WIDTH = (SCREEN_WIDTH - 60) / 2;

const ProductList: React.FC<ProductListProps> = ({ product }) => {
  const router = useRouter(); // Use router instead of navigation

  const handlePress = () => {
    // Update the navigation path to match your file structure
    router.push(`/productDetails/${product.id}`);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.containerStyle,
        pressed && { opacity: 0.7 },
      ]}
      onPress={handlePress}
    >
      <View style={styles.productCard}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <Text style={styles.nameText} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>₹{product.finalPrice}</Text>
            {product.discountPrice > 0 && (
              <Text style={styles.originalPriceText}>₹{product.price}</Text>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              ⭐ {product.averageRating.toFixed(1)}
            </Text>
            <Text style={styles.reviewCountText}>
              ({product.reviews.length} reviews)
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: PRODUCT_WIDTH,
  },
  productCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  productImage: {
    width: "100%",
    height: PRODUCT_WIDTH,
    backgroundColor: "#f0f0f0",
  },
  productInfo: {
    padding: 12,
  },
  brandText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    height: 40,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  originalPriceText: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#333",
    marginRight: 4,
  },
  reviewCountText: {
    fontSize: 12,
    color: "#666",
  },
});

export default ProductList;
