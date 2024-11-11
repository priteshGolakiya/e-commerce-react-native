import { BASE_URL } from "@/utils/apiConfig";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "@/styles/productDetails/styles";
import { useAppSelector } from "@/store/hooks";

const { width } = Dimensions.get("window");

type RouteParams = {
  productDetails: {
    id: string;
  };
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
  user: {
    image: string;
    email: string;
  };
  product: string;
  rating: number;
  review: string;
  date: Date;
}

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const token = useAppSelector((state) => state.token.token);
  const route = useRoute<RouteProp<RouteParams, "productDetails">>();
  const navigation = useNavigation();

  const { id } = route.params;

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      setCartLoading(true);
      const response = await axios.post(`${BASE_URL}/cart/add`, {
        headers: { Authorization: `Bearer ${token}` },
        productId: product?._id,
        quantity: 1,
      });
      if (response.data) {
        ToastAndroid.show("Product add to Cart", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCartLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchProductDetails();
  }, []);

  useEffect(() => {
    if (product) {
      navigation.setOptions({
        title: product.name,
      });
    } else {
      navigation.setOptions({
        title: "Product Details",
      });
    }
  }, [product]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${product?.name} at ₹${product?.finalPrice}!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderRatingStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <AntDesign
        key={index}
        name={index < Math.floor(rating) ? "star" : "staro"}
        size={16}
        color="#FFD700"
      />
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No product found</Text>
        {/* No error here now */}
      </View>
    );
  }
  const renderImagePagination = () => (
    <View style={styles.paginationContainer}>
      {product?.images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentImageIndex === index && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.user.image }} style={styles.reviewerImage} />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerEmail}>{item.user.email}</Text>
          <View style={styles.reviewStars}>
            {renderRatingStars(item.rating)}
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.review}</Text>
      <Text style={styles.reviewDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </View>
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [500, 300],
    extrapolate: "clamp",
  });

  if (loading || error || !product) {
    return (
      <View style={styles.loadingContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#E31837" />
        ) : (
          <Text style={styles.errorText}>{error || "No product found"}</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[stylesInn.imageContainer, { height: headerHeight }]}
        >
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              setCurrentImageIndex(
                Math.round(e.nativeEvent.contentOffset.x / width)
              );
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={stylesInn.productImage}
                resizeMode="contain"
              />
            )}
          />
          {renderImagePagination()}
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <FontAwesome6 name="share" size={24} color="#000" />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.productInfo}>
          <View style={styles.brandContainer}>
            <Text style={styles.brand}>{product.brand}</Text>
            <View style={styles.stockIndicator}>
              <MaterialIcons
                name="inventory"
                size={16}
                color={product.stock > 0 ? "#4CAF50" : "#F44336"}
              />
              <Text
                style={[
                  styles.stockText,
                  product.stock > 0 ? styles.inStock : styles.outOfStock,
                ]}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderRatingStars(product.averageRating)}
            </View>
            <Text style={styles.reviewCount}>
              ({product.reviews.length} reviews)
            </Text>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.price}>₹{product.finalPrice}</Text>
            {product.discountPrice && (
              <View style={styles.discountContainer}>
                <Text style={styles.originalPrice}>₹{product.price}</Text>
                <Text style={styles.discountPercentage}>
                  {Math.round(
                    ((product.price - product.finalPrice) / product.price) * 100
                  )}
                  % OFF
                </Text>
              </View>
            )}
          </View>

          <View style={styles.offerCard}>
            <Ionicons name="gift-outline" size={24} color="#E31837" />
            <Text style={styles.offerText}>{product.offers}</Text>
          </View>

          <View style={styles.deliverySection}>
            <MaterialIcons name="local-shipping" size={24} color="#000" />
            <Text style={styles.deliveryText}>
              Delivery
              {product.deliveryOptions === "available"
                ? "Available"
                : "Not Available"}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text
              style={styles.description}
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {product.description}
            </Text>
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.readMore}>
                {showFullDescription ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {product.reviews.map((review, index) => (
              <View key={index}>{renderReview({ item: review })}</View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            addToCart();
          }}
        >
          {cartLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.addToCartText}>ADD TO CART</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const stylesInn = StyleSheet.create({
  imageContainer: {
    width: width,
    height: 500,
    position: "relative",
  },
  productImage: {
    width: width,
    height: "100%",
  },
});
