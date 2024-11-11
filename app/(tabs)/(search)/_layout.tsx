import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { StackScreenWithSearchBar } from "@/constants/layout";

const FavoritesLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Search",
          }}
        />
      </Stack>
    </View>
  );
};

export default FavoritesLayout;
