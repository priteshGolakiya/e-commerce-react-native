import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AddressLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Add Address",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AddressLayout;

const styles = StyleSheet.create({});
