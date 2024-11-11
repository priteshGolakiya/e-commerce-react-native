import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeToken } from "@/store/slices/tokenSlice";
import { logout } from "@/store/slices/userSlices";
import { BASE_URL } from "@/utils/apiConfig";
import NotLoggedIn from "@/components/NotLoggedIn";
import AddressList from "@/components/profile/Address";
import OrderList from "@/components/profile/OrderList";
import styles from "@/styles/app/profile";

interface UserData {
  username: string;
  email: string;
  profilePic: string;
  role: string;
  addresses: Array<{
    id: string;
    type: string;
    address: string;
    isDefault: boolean;
  }>;
}

interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  category: string;
  subcategory: string;
  finalPrice: number;
  offers: string;
  deliveryOptions: string;
  __v: number;
  averageRating: number;
  id: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  _id: string;
}

interface ShippingAddress {
  _id: string;
  user: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type OrdersState = Order[];

const ProfileHeader: React.FC<{
  userData: UserData | null;
  onLogout: () => void;
}> = ({ userData, onLogout }) => (
  <View style={styles.header}>
    <View style={styles.profileImageContainer}>
      <Image
        source={{
          uri: userData?.profilePic || "https://via.placeholder.com/150",
        }}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.editImageButton}>
        <Ionicons name="camera" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
    <View style={styles.profileInfo}>
      <Text style={styles.username}>{userData?.username}</Text>
      <Text style={styles.email}>{userData?.email}</Text>
    </View>
    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
      <Ionicons name="log-out-outline" size={24} color="#FFF" />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const TabSelector: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
}> = ({ activeTab, onTabChange }) => (
  <View style={styles.tabs}>
    {["orders", "addresses"].map((tab) => (
      <TouchableOpacity
        key={tab}
        style={[styles.tab, activeTab === tab && styles.activeTab]}
        onPress={() => onTabChange(tab)}
      >
        <Ionicons
          name={tab === "orders" ? "cart-outline" : "location-outline"}
          size={24}
          color={activeTab === tab ? "#007AFF" : "#666"}
        />
        <Text
          style={[styles.tabText, activeTab === tab && styles.activeTabText]}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orderData, setOrderData] = useState<OrdersState | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = useAppSelector((state) => state.token.token);
  const dispatch = useAppDispatch();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response?.status === 401) {
        await SecureStore.deleteItemAsync("token");
        dispatch(logout());
        dispatch(removeToken());
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const fetchUserOrder = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderData(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        await SecureStore.deleteItemAsync("token");
        dispatch(logout());
        dispatch(removeToken());
      } else {
        console.error("Error fetching order data:", error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchUserData();
        fetchUserOrder();
      }
    }, [token])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([fetchUserData(), fetchUserOrder()]).finally(() =>
      setRefreshing(false)
    );
  }, []);

  const logoutHandler = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      dispatch(logout());
      dispatch(removeToken());
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!token) {
    return <NotLoggedIn />;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const renderContent = () => {
    if (activeTab === "orders") {
      return <OrderList orderData={orderData} />;
    }
    return (
      <AddressList
        addresses={userData?.addresses || []}
        fetchUserData={fetchUserData}
      />
    );
  };

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <>
          <ProfileHeader userData={userData} onLogout={logoutHandler} />
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          {renderContent()}
        </>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.container}
    />
  );
};

export default ProfilePage;
