import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
    return (
        <Stack screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen options={{contentStyle: {backgroundColor: Colors.background}, title: "Sign In"}} name="sign-in" />
            <Stack.Screen options={{contentStyle: {backgroundColor: Colors.background}, title: "Create Account"}} name="create-account" />
        </Stack>
    );
};

export default Layout;
