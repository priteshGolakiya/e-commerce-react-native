import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConfig";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/userSlices";
import { setToken } from "@/store/slices/tokenSlice";

interface Errors {
  email?: string;
  password?: string;
  submit?: string;
}

interface LoginResponse {
  data: {
    token: string;
    user: {
      email: string;
      id: string;
      name: string;
      profilePic: string;
      role: string;
    };
  };
  error: boolean;
  message: string;
  success: boolean;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateForm = (): boolean => {
    let newErrors: Errors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, {
          email,
          password,
        });

        if (response.data.success) {
          const userData = {
            name: response.data.data.user.name,
            email: response.data.data.user.email,
            profilePic: response.data.data.user.profilePic,
            _id: response.data.data.user.id,
            addresses: null,
            role: response.data.data.user.role,
          };

          await SecureStore.setItemAsync("token", response.data.data.token);

          dispatch(
            login({
              ...userData,
              isLogin: true,
            })
          );
          dispatch(setToken(response.data.data.token));
          setEmail("");
          setPassword("");
          router.push("/(tabs)/(profile)");
        }
      } catch (error: any) {
        console.log("error::: ", error);
        setErrors({
          submit: error.response?.data?.message || "Invalid email or password",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to access your account</Text>
        </View>

        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.input,
                errors.email ? styles.inputError : undefined,
              ]}
            >
              <Ionicons name="mail-outline" size={20} color="#666" />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.inputText}
                placeholderTextColor="#999"
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.input,
                errors.password ? styles.inputError : undefined,
              ]}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#666" />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.inputText}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => {
              /* navigation logic for forgot password */
            }}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {errors.submit && (
            <Text style={[styles.errorText, styles.submitError]}>
              {errors.submit}
            </Text>
          )}
        </View>

        {/* Sign Up Section */}
        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/signUp" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
  },
  inputError: {
    borderColor: "#dc3545",
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
  },
  forgotPassword: {
    marginVertical: 10,
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#007bff",
  },
  loginButton: {
    backgroundColor: "#007bff",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: "#666",
  },
  signupLink: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
  },
  submitError: {
    marginTop: 10,
  },
});

export default Login;
