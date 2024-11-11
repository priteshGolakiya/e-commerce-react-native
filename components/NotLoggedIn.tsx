import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

type Feature = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

const NotLoggedIn = () => {
  const features: Feature[] = [
    {
      icon: "cart-outline",
      title: "Track Orders",
      description: "View and manage all your orders in one place",
    },
    {
      icon: "heart-outline",
      title: "Save Favorites",
      description: "Keep track of items you love",
    },
    {
      icon: "time-outline",
      title: "Quick Checkout",
      description: "Save addresses for faster shopping",
    },
    {
      icon: "notifications-outline",
      title: "Get Updates",
      description: "Receive order updates and special offers",
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header Image */}
        <Image
          source={{ uri: "https://via.placeholder.com/400x200" }}
          style={styles.headerImage}
        />

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome to Our Store</Text>
          <Text style={styles.welcomeText}>
            Sign in to access your profile and manage your shopping experience
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Link href={"/login"} asChild>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/signUp"} asChild>
            <TouchableOpacity style={styles.createAccountButton}>
              <Text style={styles.createAccountButtonText}>Create Account</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>What you're missing out on</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name={feature.icon} size={24} color="#007AFF" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Privacy Notice */}
        <Text style={styles.privacyText}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: width,
    height: 200,
    resizeMode: "cover",
  },
  welcomeContainer: {
    padding: 20,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    padding: 20,
    gap: 10,
  },
  signInButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  createAccountButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  createAccountButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  featuresSection: {
    padding: 30,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    width: (width - 60) / 2,
    marginBottom: 20,
    alignItems: "center",
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  privacyText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    padding: 20,
  },
});

export default NotLoggedIn;
