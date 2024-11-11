import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios, { AxiosError } from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { useAppSelector } from "@/store/hooks";
import uploadImage from "@/utils/uploadImage";
import { BASE_URL } from "@/utils/apiConfig";

// Define navigation param list type
type RootStackParamList = {
  login: undefined;
  signup: undefined;
  // Add other screens as needed
};

// Define form data interface
interface FormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic: string;
}

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);

  const token = useAppSelector((store) => store.token.token);

  const handleUploadPic = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImageSelected(true);
        setUploading(true);
        const uploadResponse = await uploadImage(result.assets[0]);
        setFormData((prev) => ({
          ...prev,
          profilePic: uploadResponse.secure_url,
        }));
        alert("Image uploaded successfully");
      }
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (uploading) {
      setError("Please wait for the image to finish uploading");
      alert("Please wait for the image to finish uploading");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/signup`, formData);
      alert(response.data.message);
      setError("");
      navigation.navigate("login");
    } catch (err) {
      // Type guard for AxiosError
      const error = err as AxiosError<{ error: string }>;
      const errorMessage = error.response?.data?.error || "An error occurred";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.profileContainer}>
          <Image
            source={
              formData.profilePic
                ? { uri: formData.profilePic }
                : require("@/assets/images/signin.gif")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadPic}
            disabled={uploading}
          >
            <Text style={styles.uploadButtonText}>
              {uploading ? "Uploading..." : "Upload Photo"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={formData.userName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, userName: text }))
              }
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, password: text }))
                }
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesome
                  name={showPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, confirmPassword: text }))
                }
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesome
                  name={showConfirmPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[
              styles.submitButton,
              (uploading || (imageSelected && !formData.profilePic)) &&
                styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={uploading || (imageSelected && !formData.profilePic)}
          >
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  uploadButton: {
    backgroundColor: "rgba(226, 232, 240, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  uploadButtonText: {
    fontSize: 12,
    color: "#4a5568",
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  loginLink: {
    alignSelf: "flex-end",
    marginTop: 12,
  },
  loginLinkText: {
    color: "#4f46e5",
    fontSize: 14,
  },
});

export default SignUp;
