import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

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

interface OrderProps {
  orderData: Order[] | null; // Changed from Order | null to Order[] | null
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#FFA500";
    case "shipped":
      return "#32CD32";
    case "delivered":
      return "#228B22";
    case "cancelled":
      return "#DC143C";
    default:
      return "#808080";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const OrderList: React.FC<OrderProps> = ({ orderData }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!orderData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  if (orderData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="shopping-bag" size={48} color="#ccc" />
        <Text style={styles.emptyText}>No orders found</Text>
      </View>
    );
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="shopping-bag" size={24} color="#333" />
        <Text style={styles.headerText}>Your Orders</Text>
      </View>

      {orderData.map((order) => (
        <View key={order._id} style={styles.orderCard}>
          <Pressable
            style={styles.orderHeader}
            onPress={() => toggleOrderExpansion(order._id)}
          >
            <View style={styles.orderBasicInfo}>
              <Text style={styles.orderId}>Order #{order._id.slice(-8)}</Text>
              <Text style={styles.orderDate}>
                {formatDate(order.createdAt)}
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(order.status) },
                ]}
              >
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>
            <MaterialIcons
              name={expandedOrder === order._id ? "expand-less" : "expand-more"}
              size={24}
              color="#666"
            />
          </Pressable>

          {expandedOrder === order._id && (
            <View style={styles.orderDetails}>
              <View style={styles.itemsContainer}>
                {order.orderItems.map((item) => (
                  <View key={item._id} style={styles.itemCard}>
                    <Image
                      source={{ uri: item.product.images[0] }}
                      style={styles.productImage}
                    />
                    <View style={styles.itemInfo}>
                      <Text style={styles.productName}>
                        {item.product.name}
                      </Text>
                      <Text style={styles.productBrand}>
                        {item.product.brand}
                      </Text>
                      <View style={styles.quantityPriceContainer}>
                        <Text style={styles.quantity}>
                          Qty: {item.quantity}
                        </Text>
                        <Text style={styles.price}>
                          ${item.price.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.addressContainer}>
                <Text style={styles.sectionTitle}>Shipping Address</Text>
                <Text style={styles.addressText}>
                  {order.shippingAddress.street}
                </Text>
                <Text style={styles.addressText}>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </Text>
                <Text style={styles.addressText}>
                  {order.shippingAddress.country},{" "}
                  {order.shippingAddress.zipCode}
                </Text>
              </View>

              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalAmount}>
                  ${order.totalAmount.toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
  },
  orderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderBasicInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  statusContainer: {
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 16,
  },
  itemsContainer: {
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: "row",
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productBrand: {
    fontSize: 14,
    color: "#666",
  },
  quantityPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  quantity: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  addressContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E8B57",
  },
});

export default OrderList;
