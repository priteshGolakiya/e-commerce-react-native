// import React, { useCallback, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { Link, useFocusEffect, router } from "expo-router";
// import axios from "axios";
// import { useAppSelector } from "@/store/hooks";
// import { BASE_URL } from "@/utils/apiConfig";
// import { Feather } from "@expo/vector-icons";
// import styles from "@/styles/app/cart/CartIndex";

// interface Product {
//   _id: string;
//   name: string;
//   brand: string;
//   price: number;
//   discountPrice: number;
//   finalPrice: number;
//   images: string[];
//   description: string;
//   offers?: string;
// }

// interface CartItem {
//   _id: string;
//   product: Product;
//   quantity: number;
//   price: number;
// }

// interface CartResponse {
//   _id: string;
//   user: string;
//   items: CartItem[];
//   totalPrice: number;
//   createdAt: string;
//   __v: number;
// }

// const CartPage = () => {
//   const [cartData, setCartData] = useState<CartResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const token = useAppSelector((state) => state.token.token);
//   console.log("token::: ", token);

//   const fetchCartData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get<CartResponse[]>(`${BASE_URL}/cart`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("response.data::: ", response);

//       // Check if we have any cart data in the array
//       if (response.data && response.data.length > 0) {
//         setCartData(response.data[0]);
//       } else {
//         setCartData(null);
//       }
//     } catch (error) {
//       console.error(error);
//       setError("Failed to fetch cart data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateQuantity = async (
//     productId: string,
//     newQuantity: number
//   ) => {
//     if (newQuantity < 1) return;

//     try {
//       await axios.put(
//         `${BASE_URL}/cart/update/`,
//         { quantity: newQuantity, productId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCartData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleRemoveItem = async (productId: string) => {
//     try {
//       await axios.delete(`${BASE_URL}/cart/remove/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCartData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchCartData();
//     }, [])
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0066FF" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Feather name="alert-circle" size={64} color="#FF4444" />
//         <Text style={styles.emptyText}>{error}</Text>
//         <TouchableOpacity style={styles.shopButton} onPress={fetchCartData}>
//           <Text style={styles.shopButtonText}>Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (!cartData || cartData.items.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Feather name="shopping-cart" size={64} color="#ccc" />
//         <Text style={styles.emptyText}>Your cart is empty</Text>
//         <TouchableOpacity
//           style={styles.shopButton}
//           onPress={() => router.push("/(home)/")}
//         >
//           <Text style={styles.shopButtonText}>Start Shopping</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const CartItemComponent = ({ item }: { item: CartItem }) => (
//     <View style={styles.cartItem}>
//       <Image
//         source={{ uri: item.product.images[0] }}
//         style={styles.productImage}
//         resizeMode="cover"
//       />
//       <View style={styles.itemInfo}>
//         <View style={styles.itemHeader}>
//           <View style={styles.brandContainer}>
//             <Text style={styles.brandText}>{item.product.brand}</Text>
//           </View>
//           <TouchableOpacity onPress={() => handleRemoveItem(item.product._id)}>
//             <Feather name="trash-2" size={20} color="#FF4444" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.productName} numberOfLines={2}>
//           {item.product.name}
//         </Text>

//         {item.product.offers && (
//           <View style={styles.offerContainer}>
//             <Feather name="tag" size={14} color="#00a760" />
//             <Text style={styles.offerText} numberOfLines={1}>
//               {item.product.offers}
//             </Text>
//           </View>
//         )}

//         <View style={styles.priceSection}>
//           <View style={styles.priceInfo}>
//             <Text style={styles.finalPrice}>
//               ₹{item.product.finalPrice.toLocaleString()}
//             </Text>
//             <View style={styles.discountContainer}>
//               <Text style={styles.originalPrice}>
//                 ₹{item.product.price.toLocaleString()}
//               </Text>
//               <Text style={styles.discountBadge}>
//                 {Math.round(
//                   ((item.product.price - item.product.finalPrice) /
//                     item.product.price) *
//                     100
//                 )}
//                 % OFF
//               </Text>
//             </View>
//           </View>

//           <View style={styles.quantityControls}>
//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() =>
//                 handleUpdateQuantity(item.product._id, item.quantity - 1)
//               }
//             >
//               <Feather name="minus" size={16} color="#0066FF" />
//             </TouchableOpacity>
//             <Text style={styles.quantityText}>{item.quantity}</Text>
//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() =>
//                 handleUpdateQuantity(item.product._id, item.quantity + 1)
//               }
//             >
//               <Feather name="plus" size={16} color="#0066FF" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Shopping Cart</Text>
//           <Text style={styles.itemCount}>
//             {cartData.items.reduce((acc, item) => acc + item.quantity, 0)} items
//           </Text>
//         </View>

//         <View style={styles.itemsContainer}>
//           {cartData.items.map((item) => (
//             <CartItemComponent key={item._id} item={item} />
//           ))}
//         </View>

//         <View style={styles.summary}>
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Subtotal</Text>
//             <Text style={styles.summaryValue}>
//               ₹{cartData.totalPrice.toLocaleString()}
//             </Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Delivery Fee</Text>
//             <Text style={styles.deliveryText}>FREE</Text>
//           </View>
//           <View style={[styles.summaryRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalAmount}>
//               ₹{cartData.totalPrice.toLocaleString()}
//             </Text>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.checkoutContainer}>
//         <Link href="/checkout" asChild>
//           <TouchableOpacity style={styles.checkoutButton}>
//             <Text style={styles.checkoutText}>Proceed to Checkout</Text>
//             <Feather name="arrow-right" size={20} color="#fff" />
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </View>
//   );
// };

// export default CartPage;

import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link, useFocusEffect, router } from "expo-router";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";
import { BASE_URL } from "@/utils/apiConfig";
import { Feather } from "@expo/vector-icons";
import styles from "@/styles/app/cart/CartIndex";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  finalPrice: number;
  images: string[];
  description: string;
  offers?: string;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
}

interface CartResponse {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  __v: number;
}

const CartPage = () => {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenExpired, setTokenExpired] = useState(false);
  const token = useAppSelector((state) => state.token.token);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<CartResponse[]>(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.length > 0) {
        setCartData(response.data[0]);
      } else {
        setCartData(null);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Token is expired or unauthorized, set the expired state to true
        setTokenExpired(true);
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to fetch cart data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(
        `${BASE_URL}/cart/update/`,
        { quantity: newQuantity, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCartData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await axios.delete(`${BASE_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartData();
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCartData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="alert-circle" size={64} color="#FF4444" />
        <Text style={styles.emptyText}>{error}</Text>
        {tokenExpired ? (
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.shopButtonText}>Log In Again</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.shopButton} onPress={fetchCartData}>
            <Text style={styles.shopButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="shopping-cart" size={64} color="#ccc" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => router.push("/(home)/")}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.product.images[0] }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>{item.product.brand}</Text>
          </View>
          <TouchableOpacity onPress={() => handleRemoveItem(item.product._id)}>
            <Feather name="trash-2" size={20} color="#FF4444" />
          </TouchableOpacity>
        </View>

        <Text style={styles.productName} numberOfLines={2}>
          {item.product.name}
        </Text>

        {item.product.offers && (
          <View style={styles.offerContainer}>
            <Feather name="tag" size={14} color="#00a760" />
            <Text style={styles.offerText} numberOfLines={1}>
              {item.product.offers}
            </Text>
          </View>
        )}

        <View style={styles.priceSection}>
          <View style={styles.priceInfo}>
            <Text style={styles.finalPrice}>
              ₹{item.product.finalPrice.toLocaleString()}
            </Text>
            <View style={styles.discountContainer}>
              <Text style={styles.originalPrice}>
                ₹{item.product.price.toLocaleString()}
              </Text>
              <Text style={styles.discountBadge}>
                {Math.round(
                  ((item.product.price - item.product.finalPrice) /
                    item.product.price) *
                    100
                )}
                % OFF
              </Text>
            </View>
          </View>

          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                handleUpdateQuantity(item.product._id, item.quantity - 1)
              }
            >
              <Feather name="minus" size={16} color="#0066FF" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                handleUpdateQuantity(item.product._id, item.quantity + 1)
              }
            >
              <Feather name="plus" size={16} color="#0066FF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Shopping Cart</Text>
          <Text style={styles.itemCount}>
            {cartData.items.reduce((acc, item) => acc + item.quantity, 0)} items
          </Text>
        </View>

        <View style={styles.itemsContainer}>
          {cartData.items.map((item) => (
            <CartItemComponent key={item._id} item={item} />
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ₹{cartData.totalPrice.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.deliveryText}>FREE</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>
              ₹{cartData.totalPrice.toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutContainer}>
        <Link href="/checkout" asChild>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <Feather name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default CartPage;
