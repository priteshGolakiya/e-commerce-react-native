import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { defaultStyles } from "@/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const FavoritesLayout = () => {
  const router = useRouter();
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Profile",
          }}
        />
        <Stack.Screen
          name="editAddress"
          options={{
            presentation: "modal",
            title: "Edit Address",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="addAddress"
          options={{
            presentation: "modal",
            title: "Add Address",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default FavoritesLayout;
