import ExploreHeader from "@/components/home/ExploreHeader";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <ExploreHeader />,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default HomeLayout;
