import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConfig";

const CreateAddress: React.FC = () => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const token = useAppSelector((state) => state.token.token);

  const createAddress = async () => {
    try {
      const emptyFields = Object.entries(formData).filter(
        ([_, value]) => !value
      );
      if (emptyFields.length > 0) {
        Alert.alert(
          "Missing Information",
          "Please fill in all address fields."
        );

        return;
      }

      const response = await axios.post(
        `${BASE_URL}/address/`,
        {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zipCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Failed to create address");
      }

      const data = await response.data.newAddress;
      Alert.alert("Success", "Address created successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (err) {
      console.error("Error creating address:", err);
      Alert.alert("Error", "Failed to create address. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Street Address"
        value={formData.street}
        onChangeText={(text) => setFormData({ ...formData, street: text })}
        style={[defaultStyles.inputField, { marginBottom: 15 }]}
      />

      <TextInput
        placeholder="City"
        value={formData.city}
        onChangeText={(text) => setFormData({ ...formData, city: text })}
        style={[defaultStyles.inputField, { marginBottom: 15 }]}
      />

      <TextInput
        placeholder="State"
        value={formData.state}
        onChangeText={(text) => setFormData({ ...formData, state: text })}
        style={[defaultStyles.inputField, { marginBottom: 15 }]}
      />

      <TextInput
        placeholder="Country"
        value={formData.country}
        onChangeText={(text) => setFormData({ ...formData, country: text })}
        style={[defaultStyles.inputField, { marginBottom: 15 }]}
      />

      <TextInput
        placeholder="ZIP Code"
        value={formData.zipCode}
        onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        keyboardType="numeric"
      />

      <TouchableOpacity style={defaultStyles.btn} onPress={createAddress}>
        <Text style={defaultStyles.btnText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
});

const defaultStyles = StyleSheet.create({
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#FF385C",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CreateAddress;
