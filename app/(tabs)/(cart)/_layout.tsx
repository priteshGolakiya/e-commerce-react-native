import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const FavoritesLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Cart",
          }}
        />
      </Stack>
    </View>
  );
};

export default FavoritesLayout;
