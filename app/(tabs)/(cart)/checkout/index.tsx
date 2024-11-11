import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  Image,
  ToastAndroid,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";
import { BASE_URL } from "@/utils/apiConfig";
import styles from "@/styles/app/cart/checkout/CheckoutPage";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  finalPrice: number;
  images: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartData {
  success: boolean;
  createdAt: string;
  items: CartItem[];
  totalPrice: number;
}

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "India",
    zipCode: "",
  });

  const token = useAppSelector((state) => state.token.token);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [addressResponse, cartResponse] = await Promise.all([
        axios.get(`${BASE_URL}/address`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAddresses(addressResponse.data);
      setCartData(cartResponse.data[0]);

      if (addressResponse.data.length > 0) {
        setSelectedAddress(addressResponse.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      ToastAndroid.show("Failed to load checkout data", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    if (
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zipCode
    ) {
      ToastAndroid.show(
        "Please fill in all address fields",
        ToastAndroid.SHORT
      );

      return;
    }
    console.log("addresses state::: ", addresses);

    try {
      const response = await axios.post(`${BASE_URL}/address`, newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Address ::: ", response.data);
      setAddresses([...addresses, response.data.newAddress]);
      setShowAddForm(false);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "India",
        zipCode: "",
      });
      router.push("/(profile)");
    } catch (error) {
      console.error("Error adding address:", error);
      ToastAndroid.show("Failed to add address", ToastAndroid.SHORT);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      ToastAndroid.show("Please select a delivery address", ToastAndroid.SHORT);

      return;
    }

    try {
      const orderData = {
        cartItems: cartData?.items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
        shippingAddressId: selectedAddress,
        totalAmount: cartData?.totalPrice,
      };

      const response = await axios.post(`${BASE_URL}/order/create`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("response.data :>> ", response.data);

      Alert.alert("Success", "Order placed successfully!", [
        {
          text: "View Orders",
          onPress: () => {
            // Navigate to orders page
          },
        },
      ]);
    } catch (error) {
      console.error("Error creating order:", error);
      ToastAndroid.show("Failed to place order", ToastAndroid.SHORT);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  const renderCartItem = (item: CartItem, index: number) => (
    <View key={index} style={styles.cartItem}>
      <Image
        source={{ uri: item.product.images[0] }}
        style={styles.productImage}
        defaultSource={require("@/assets/images/splash.png")}
      />
      <View style={styles.itemDetails}>
        <View style={styles.itemInfo}>
          <Text style={styles.brandText}>{item.product.brand}</Text>
          <Text style={styles.nameText} numberOfLines={2}>
            {item.product.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.finalPrice}>₹{item.product.finalPrice}</Text>
            {item.product.discountPrice > 0 && (
              <Text style={styles.originalPrice}>₹{item.product.price}</Text>
            )}
          </View>
        </View>
        <Text style={styles.quantity}>Qty: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cart Items Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.cartItemsContainer}>
            {cartData?.items.map((item, index) => renderCartItem(item, index))}
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              ₹{cartData?.totalPrice.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressContainer}>
            {addresses.map((address) => (
              <TouchableOpacity
                key={address._id}
                style={[
                  styles.addressCard,
                  selectedAddress === address._id && styles.selectedCard,
                ]}
                onPress={() => setSelectedAddress(address._id)}
              >
                <View style={styles.addressHeader}>
                  <Feather
                    name={
                      selectedAddress === address._id
                        ? "check-circle"
                        : "circle"
                    }
                    size={24}
                    color="#0066FF"
                  />
                  <View style={styles.addressContent}>
                    <Text style={styles.addressText}>{address.street}</Text>
                    <Text style={styles.addressSubText}>
                      {address.city}, {address.state}, {address.zipCode}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddForm(true)}
          >
            <Feather name="plus" size={24} color="#0066FF" />
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>

        {/* New Address Form */}
        {showAddForm && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Street Address"
              value={newAddress.street}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, street: text })
              }
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={newAddress.city}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, city: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={newAddress.state}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, state: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="PIN Code"
              value={newAddress.zipCode}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, zipCode: text })
              }
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddAddress}
            >
              <Text style={styles.submitButtonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <View style={styles.checkoutPriceContainer}>
          <Text style={styles.checkoutPriceLabel}>Total Amount</Text>
          <Text style={styles.checkoutPrice}>
            ₹{cartData?.totalPrice.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.checkoutButtonText}>Place Order</Text>
          <Feather name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutPage;
