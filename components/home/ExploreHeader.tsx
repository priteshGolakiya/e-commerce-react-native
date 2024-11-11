// import { BASE_URL } from "@/utils/apiConfig";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   Dimensions,
//   Image,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import LottieView from "lottie-react-native";

// interface Category {
//   categoryName: string;
//   image: string[];
// }

// const { width } = Dimensions.get("window");
// const SEARCH_BAR_HEIGHT = 56;
// const CATEGORY_IMAGE_SIZE = 48;

// const ExploreHeader = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [categories, setCategories] = useState<Category[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/category`);
//       setCategories(response.data.categories);
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         console.error("Error fetching categories:", error.message);
//         if (error.response) {
//           console.error("Response data:", error.response.data);
//           console.error("Response status:", error.response.status);
//         } else {
//           console.error(
//             "Network error: Make sure the server is running and accessible."
//           );
//         }
//       } else {
//         console.error("An unexpected error occurred:", error);
//       }
//     } finally {
//       setLoading(false); // Stop loading after fetching data
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const selectCategory = (index: number) => {
//     setActiveIndex(index);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         {loading ? (
//           <View style={styles.loadingContainer}>
//             <LottieView
//               source={require("@/assets/images/Loader.json")}
//               autoPlay
//               loop
//               style={styles.lottieAnimation}
//             />
//           </View>
//         ) : (
//           /* Categories ScrollView */
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.categoriesContainer}
//             bounces={true}
//           >
//             {categories ? (
//               categories.map((item: Category, index: number) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => selectCategory(index)}
//                   style={[
//                     styles.categoryButton,
//                     activeIndex === index && styles.activeCategoryButton,
//                   ]}
//                 >
//                   <View style={styles.categoryImageContainer}>
//                     <Image
//                       source={
//                         item.image.length > 0 &&
//                         typeof item.image[0] === "string"
//                           ? { uri: item.image[0] }
//                           : require("@/assets/images/defaultImage.png")
//                       }
//                       resizeMode="contain"
//                       style={styles.categoryImage}
//                     />
//                   </View>
//                   <Text
//                     style={[
//                       styles.categoryText,
//                       activeIndex === index && styles.activeCategoryText,
//                     ]}
//                   >
//                     {item.categoryName}
//                   </Text>
//                 </TouchableOpacity>
//               ))
//             ) : (
//               <View style={styles.noContentContainer}>
//                 <Text style={styles.noContentText}>
//                   No categories available
//                 </Text>
//               </View>
//             )}
//           </ScrollView>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: "#fff",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   container: {
//     backgroundColor: "#fff",
//     height: 160,
//     paddingTop: Platform.OS === "ios" ? 0 : 8,
//   },
//   actionRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//     marginTop: 8,
//   },
//   searchBtnContainer: {
//     width: width - 32,
//     height: SEARCH_BAR_HEIGHT,
//   },
//   searchBtn: {
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     gap: 12,
//     padding: 16,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#e0e0e0",
//     borderRadius: SEARCH_BAR_HEIGHT / 2,
//     height: "100%",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   searchTextContainer: {
//     flex: 1,
//   },
//   searchText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#1a1a1a",
//   },
//   searchSubtext: {
//     fontSize: 14,
//     color: "#717171",
//     marginTop: 2,
//   },
//   categoriesContainer: {
//     paddingHorizontal: 16,
//     gap: 32,
//     alignItems: "center",
//     flexDirection: "row",
//     paddingVertical: 8,
//   },
//   categoryButton: {
//     alignItems: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 4,
//     position: "relative",
//   },
//   activeCategoryButton: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#000",
//   },
//   categoryImageContainer: {
//     marginBottom: 8,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
//   },
//   categoryImage: {
//     width: CATEGORY_IMAGE_SIZE,
//     height: CATEGORY_IMAGE_SIZE,
//     borderRadius: CATEGORY_IMAGE_SIZE / 2,
//     backgroundColor: "#f5f5f5",
//   },
//   categoryText: {
//     fontSize: 14,
//     color: "#717171",
//     fontWeight: "400",
//   },
//   activeCategoryText: {
//     color: "#000",
//     fontWeight: "600",
//   },
//   noContentContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 16,
//   },
//   noContentText: {
//     fontSize: 16,
//     color: "#717171",
//     fontWeight: "500",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   lottieAnimation: {
//     width: 100,
//     height: 100,
//   },
// });

// export default ExploreHeader;

import { BASE_URL } from "@/utils/apiConfig";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";

// Get device width for responsive design
const { width } = Dimensions.get("window");

interface Category {
  categoryName: string;
  image: string[];
}

interface ExploreHeaderProps {
  onCategorySelect?: (index: number) => void;
  apiUrl?: string;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  onCategorySelect,
  apiUrl = `${BASE_URL}/category`,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  const handleCategorySelect = (index: number) => {
    setActiveIndex(index);
    onCategorySelect?.(index);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require("@/assets/images/Loader.json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
        >
          {categories?.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategorySelect(index)}
              style={[
                styles.categoryButton,
                activeIndex === index && styles.activeCategoryButton,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={
                    category.image?.[0]
                      ? { uri: category.image[0] }
                      : require("@/assets/images/defaultImage.png") // Update this path
                  }
                  style={styles.categoryImage}
                  defaultSource={require("@/assets/images/defaultImage.png")} // Update this path
                  resizeMode="cover"
                />
              </View>
              <Text
                style={[
                  styles.categoryText,
                  activeIndex === index && styles.activeCategoryText,
                ]}
                numberOfLines={3}
              >
                {category.categoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f5f5f5",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  container: {
    height: 160,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 0 : 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 24,
    alignItems: "center",
    paddingVertical: 8,
  },
  categoryButton: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeCategoryButton: {
    borderBottomColor: "#000000",
  },
  imageContainer: {
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  categoryImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
  },
  categoryText: {
    fontSize: 14,
    color: "#717171",
    fontWeight: "400",
    maxWidth: 80,
    textAlign: "center",
  },
  activeCategoryText: {
    color: "#000000",
    fontWeight: "600",
  },
  loadingContainer: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  lottieAnimation: {
    width: 100,
    height: 100,
  },
  errorContainer: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 8,
    textAlign: "center",
  },
  retryButton: {
    padding: 8,
    backgroundColor: "#0000ff",
    borderRadius: 4,
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "500",
  },
});

export default ExploreHeader;
