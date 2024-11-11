import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConfig";
import { useAppSelector } from "@/store/hooks";

interface APIAddress {
  _id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: string;
}

interface UIAddress {
  id: string;
  type: string;
  address: string;
  isDefault: boolean;
}

type Address = APIAddress | UIAddress;

interface AddressListProps {
  addresses: Address[];
  fetchUserData: () => void;
  style?: any;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  style,
  fetchUserData,
}) => {
  const isAPIAddress = (address: Address): address is APIAddress => {
    return "_id" in address;
  };

  const router = useRouter();
  const token = useAppSelector((state) => state.token.token);

  const handlePress = (addressId: string) => {
    router.push({
      pathname: "/(tabs)/(profile)/editAddress",
      params: { addressId },
    });
  };

  const deleteAddress = async (addressId: string) => {
    // Ask user for confirmation before deleting the address
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `${BASE_URL}/address/${addressId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 200) {
                Alert.alert("Success", "Address deleted successfully!");
                fetchUserData();
              } else {
                throw new Error("Failed to delete the address.");
              }
            } catch (error) {
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : "An unknown error occurred.";
              Alert.alert("Error", errorMessage);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderAddressCard = ({ item: address }: { item: Address }) => {
    const displayAddress = isAPIAddress(address)
      ? `${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.zipCode}`
      : address.address;

    return (
      <View style={styles.addressCard}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressType}>
            {isAPIAddress(address) ? "Home" : address.type}
          </Text>
          {!isAPIAddress(address) && address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <Text style={styles.addressText}>{displayAddress}</Text>
        <View style={styles.addressActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              handlePress(isAPIAddress(address) ? address._id : address.id);
            }}
          >
            <Ionicons name="create-outline" size={20} color="#007AFF" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              deleteAddress(isAPIAddress(address) ? address._id : address.id)
            }
          >
            <Ionicons name="trash-outline" size={20} color="#dc3545" />
            <Text style={[styles.actionButtonText, { color: "#dc3545" }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>Saved Addresses</Text>
      <View style={styles.addressList}>
        {addresses.map((address) => (
          <View key={isAPIAddress(address) ? address._id : address.id}>
            {renderAddressCard({ item: address })}
          </View>
        ))}
        {addresses.length === 0 && (
          <Text style={styles.emptyText}>No addresses found</Text>
        )}
      </View>
      <Link href={"/addAddress"} asChild>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  addressList: {
    gap: 15,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#fff",
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addressType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  defaultBadge: {
    backgroundColor: "#e6f2ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    color: "#007AFF",
    fontSize: 12,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  addressActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionButtonText: {
    color: "#007AFF",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginVertical: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6f2ff",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    gap: 10,
  },
  addButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default AddressList;
