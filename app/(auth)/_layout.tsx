import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
    return (
        <Stack screenOptions={{ headerShadowVisible: false, headerTitleStyle: {
            fontFamily: "onest",
            fontWeight: 500
        } }}>
            <Stack.Screen options={{contentStyle: {backgroundColor: Colors.background}, title: "Sign In @ Habits"}} name="sign-in" />
            <Stack.Screen options={{contentStyle: {backgroundColor: Colors.background}, title: "Create Account @ Habits"}} name="create-account" />
        </Stack>
    );
};

export default Layout;
