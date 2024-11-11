import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConfig";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const EditAddress: React.FC = () => {
  const { addressId } = useLocalSearchParams();
  const token = useAppSelector((state) => state.token.token);
  const scrollViewRef = useRef<ScrollView>(null);

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/address/${addressId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.address) {
          const address = response.data.address;
          setFormData({
            street: address.street,
            city: address.city,
            state: address.state,
            country: address.country,
            zipCode: address.zipCode,
          });
        }
      } catch (err) {
        console.error("Error fetching address:", err);
        Alert.alert(
          "Error",
          "Failed to load address information. Please try again."
        );
        router.back();
      }
    };

    if (addressId) {
      fetchAddress();
    }
  }, [addressId, token]);

  const updateAddress = async () => {
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

      const response = await axios.put(
        `${BASE_URL}/address/${addressId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to update address");
      }

      Alert.alert("Success", "Address updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (err) {
      console.error("Error updating address:", err);
      Alert.alert("Error", "Failed to update address. Please try again.");
    }
  };

  // Function to scroll to the input
  const scrollToInput = (y: number) => {
    scrollViewRef.current?.scrollTo({
      y: y,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <View style={styles.formContainer}>
                <TextInput
                  placeholder="Street Address"
                  value={formData.street}
                  onChangeText={(text) =>
                    setFormData({ ...formData, street: text })
                  }
                  style={styles.inputField}
                  returnKeyType="next"
                  onFocus={() => scrollToInput(0)}
                />

                <TextInput
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(text) =>
                    setFormData({ ...formData, city: text })
                  }
                  style={styles.inputField}
                  returnKeyType="next"
                  onFocus={() => scrollToInput(50)}
                />

                <TextInput
                  placeholder="State"
                  value={formData.state}
                  onChangeText={(text) =>
                    setFormData({ ...formData, state: text })
                  }
                  style={styles.inputField}
                  returnKeyType="next"
                  onFocus={() => scrollToInput(100)}
                />

                <TextInput
                  placeholder="Country"
                  value={formData.country}
                  onChangeText={(text) =>
                    setFormData({ ...formData, country: text })
                  }
                  style={styles.inputField}
                  returnKeyType="next"
                  onFocus={() => scrollToInput(150)}
                />

                <TextInput
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChangeText={(text) =>
                    setFormData({ ...formData, zipCode: text })
                  }
                  style={styles.inputField}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  onFocus={() => scrollToInput(200)}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.btn, styles.cancelButton]}
                  onPress={() => router.back()}
                >
                  <Text style={[styles.btnText, styles.cancelButtonText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={updateAddress}>
                  <Text style={styles.btnText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 26,
    minHeight: SCREEN_HEIGHT - 500, // Ensure content is scrollable
  },
  formContainer: {
    gap: 15,
    marginBottom: 30,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  btn: {
    flex: 1,
    backgroundColor: "#FF385C",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF385C",
  },
  cancelButtonText: {
    color: "#FF385C",
  },
});

export default EditAddress;
