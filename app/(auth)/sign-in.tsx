import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
    return (
        <SafeAreaView
            style={{ padding: 10, paddingHorizontal: 20 }}
            edges={["bottom"]}
        >
            <Text>SignIn</Text>
        </SafeAreaView>
    );
};

export default SignIn;
