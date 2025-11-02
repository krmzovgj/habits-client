import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateAccount = () => {
    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{ padding: 10, paddingHorizontal: 20 }}
        >
            <Text>CreateAccount</Text>
        </SafeAreaView>
    );
};

export default CreateAccount;
