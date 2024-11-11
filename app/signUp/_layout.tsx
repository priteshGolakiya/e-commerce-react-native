import { Stack } from "expo-router";
import React from "react";

const SignUpLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SignUpLayout;
