import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";

// Interfaces remain the same
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

interface ModernCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  item: Product[];
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CAROUSEL_HEIGHT = SCREEN_HEIGHT * 0.5;
const PAGE_WIDTH = SCREEN_WIDTH * 0.92;
const PAGE_HEIGHT = CAROUSEL_HEIGHT * 0.88;

const ModernCarousel: React.FC<ModernCarouselProps> = ({
  autoPlay = true,
  autoPlayInterval = 3000,
  item,
}) => {
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const renderItem = ({ item, animationValue }: any) => {
    

    const discountPercentage = Math.round(
      ((item.price - item.discountPrice) / item.price) * 100
    );

    return (
      <Animated.View style={[styles.carouselItem]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.images[0] }}
            style={styles.image}
            resizeMode="contain"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
            style={styles.gradient}
          />
          {discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryName}>{item.category.name}</Text>
            {item.brand && <Text style={styles.brand}>{item.brand}</Text>}
          </View>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(item.discountPrice)}</Text>
            {item.price !== item.discountPrice && (
              <Text style={styles.originalPrice}>
                {formatPrice(item.price)}
              </Text>
            )}
          </View>
          {item.stock < 10 && item.stock > 0 && (
            <Text style={styles.stockWarning}>
              Only {item.stock} left in stock!
            </Text>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        autoPlay={autoPlay}
        data={item}
        scrollAnimationDuration={1200}
        autoPlayInterval={autoPlayInterval}
        renderItem={renderItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 60,
        }}
        style={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  carousel: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    borderRadius: 24,
    backgroundColor: "white",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  brand: {
    fontSize: 15,
    fontWeight: "500",
    color: "#888",
    fontStyle: "italic",
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  imageContainer: {
    width: "100%",
    height: "65%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
  },
  contentContainer: {
    padding: 16,
    height: "35%",
    justifyContent: "space-between",
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 18,
    color: "#999",
    textDecorationLine: "line-through",
  },
  discountBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#E74C3C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  stockWarning: {
    color: "#E74C3C",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
});

export default ModernCarousel;
