import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import debounce from "lodash/debounce";
import { BASE_URL } from "@/utils/apiConfig";
import styles from "@/styles/app/search";
import { useRouter } from "expo-router";

// Types
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
  };
  subcategory: {
    name: string;
  };
  images: string[];
  brand?: string;
  tags?: string[];
}

interface SearchResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
}

interface FilterState {
  category: string;
  subcategory: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    subcategory: "",
    minPrice: "",
    maxPrice: "",
    sort: "createdAt",
  });

  // Categories and subcategories
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const router = useRouter();
  const sortOptions = [
    { label: "Newest", value: "createdAt" },
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
    { label: "Name A-Z", value: "name" },
    { label: "Name Z-A", value: "-name" },
  ];

  // Fetch categories and subcategories on mount
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product`);

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/category`);
      const categoryNames = response.data.categories.map(
        (category: { categoryName: string }) => category.categoryName
      );
      setCategories(categoryNames);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subcategory`);
      const subcategoryNames = response.data.subcategories.map(
        (subcategory: { name: string }) => subcategory.name
      );
      setSubcategories(subcategoryNames);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string, filterState: FilterState, page: number) => {
      setLoading(true);
      try {
        const response = await axios.get<SearchResponse>(
          `${BASE_URL}/product/search`,
          {
            params: {
              q: query,
              ...filterState,
              page,
              limit: 10,
            },
          }
        );

        if (page === 1) {
          setProducts(response.data.products);
        } else {
          setProducts((prev) => [...prev, ...response.data.products]);
        }

        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Handle search and filter changes
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
    debouncedSearch(text, filters, 1);
  };



  const handleFilterChange = (filterUpdates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...filterUpdates };
    setFilters(newFilters);
    setCurrentPage(1);
    debouncedSearch(searchQuery, newFilters, 1);
    setShowFilters(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setCurrentPage(1);
    await debouncedSearch(searchQuery, filters, 1);
    setRefreshing(false);
  }, [searchQuery, filters]);

  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      debouncedSearch(searchQuery, filters, currentPage + 1);
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => router.push(`/productDetails/${item._id}`)}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={styles.productImage}
        defaultSource={require("@/assets/images/defaultImage.png")}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productCategory}>
          {item.category.name} • {item.subcategory.name}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color="#1a1a1a" />
            </TouchableOpacity>
          </View>

          {/* Category Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  !filters.category && styles.selectedFilterChip,
                ]}
                onPress={() => handleFilterChange({ category: "" })}
              >
                <Text style={styles.filterChipText}>All</Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterChip,
                    filters.category === category && styles.selectedFilterChip,
                  ]}
                  onPress={() => handleFilterChange({ category })}
                >
                  <Text style={styles.filterChipText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Price Range</Text>
            <View style={styles.priceInputContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min"
                keyboardType="numeric"
                value={filters.minPrice}
                onChangeText={(text) => handleFilterChange({ minPrice: text })}
              />
              <Text style={styles.priceSeparator}>-</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Max"
                keyboardType="numeric"
                value={filters.maxPrice}
                onChangeText={(text) => handleFilterChange({ maxPrice: text })}
              />
            </View>
          </View>

          {/* Sort Options */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Sort By</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  filters.sort === option.value && styles.selectedSortOption,
                ]}
                onPress={() => handleFilterChange({ sort: option.value })}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    filters.sort === option.value &&
                      styles.selectedSortOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="#484848" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#717171"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Ionicons name="close-circle" size={24} color="#717171" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
          >
            <Ionicons name="options" size={24} color="#484848" />
          </TouchableOpacity>
        </View>

        {/* Active Filters Display */}
        {(filters.category || filters.minPrice || filters.maxPrice) && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.activeFiltersContainer}
          >
            {filters.category && (
              <View style={styles.activeFilterChip}>
                <Text style={styles.activeFilterText}>
                  Category: {filters.category}
                </Text>
                <TouchableOpacity
                  onPress={() => handleFilterChange({ category: "" })}
                >
                  <Ionicons name="close-circle" size={16} color="#717171" />
                </TouchableOpacity>
              </View>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <View style={styles.activeFilterChip}>
                <Text style={styles.activeFilterText}>
                  Price: ${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    handleFilterChange({ minPrice: "", maxPrice: "" })
                  }
                >
                  <Ionicons name="close-circle" size={16} color="#717171" />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}

        {/* Products List */}
        <ScrollView
          style={styles.productsContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } =
              nativeEvent;
            const isCloseToBottom =
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - 20;
            if (isCloseToBottom) {
              loadMore();
            }
          }}
          scrollEventThrottle={400}
        >
          {products.map((product) => (
            <View key={product._id}>
              {renderProductItem({ item: product })}
            </View>
          ))}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

          {!loading && products.length === 0 && searchQuery && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No products found</Text>
            </View>
          )}
        </ScrollView>

        <FilterModal />
      </View>
    </SafeAreaView>
  );
};

export default Search;
