import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
  Animated,
  RefreshControl,
  StatusBar,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConfig";
import ModernCarousel from "@/components/home/Carousel";
import ProductList from "@/components/home/ProductList";
import LottieView from "lottie-react-native";

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

// Separate Product Item Component
const ProductItem = React.memo(
  ({ item, index }: { item: Product; index: number }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
      Animated.sequence([
        Animated.delay(index * 100),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, [index]);

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}
      >
        <ProductList product={item} />
      </Animated.View>
    );
  }
);

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product`);
      setProducts(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching Product:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [350, 350],
    extrapolate: "clamp",
  });

  const carouselOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <ProductItem item={item} index={index} />
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <LottieView
          source={require("@/assets/images/Loader.json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <Animated.View
            style={[
              styles.carouselContainer,
              { height: headerHeight, opacity: carouselOpacity },
            ]}
          >
            <ModernCarousel
              autoPlay={true}
              autoPlayInterval={3000}
              item={products}
            />
          </Animated.View>
        )}
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === "android"}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
            colors={["#007AFF"]}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  carouselContainer: {
    overflow: "hidden",
    marginBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: {
    height: 15,
  },
  listContent: {
    padding: 12,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
});

export default HomePage;
