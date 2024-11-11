import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConfig";
import ModernCarousel from "@/components/home/Carousel";
import ProductList from "@/components/home/ProductList";
import LottieView from "lottie-react-native";

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

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

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
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductList product={item} />
  );

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

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
        ListHeaderComponent={() => (
          <View style={styles.carouselContainer}>
            <ModernCarousel autoPlay={true} autoPlayInterval={4000} />
          </View>
        )}
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === "android"}
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
    height: 400,
    marginBottom: 16,
  },
  separator: {
    height: 10,
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 100,
    height: 100,
  },
});

export default HomePage;
