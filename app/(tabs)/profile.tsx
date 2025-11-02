import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { Setting2 } from "iconsax-react-nativejs";
import { Colors } from "@/constants/theme";

const Profile = () => {
    return (
        <SafeAreaView style={{ padding: 10, paddingHorizontal: 20, flex: 1 }}>
            <Header
                title="Profile"
                headerRight={
                    <Setting2 variant="Bold" size={25} color={Colors.text} />
                }
            />
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={styles.text}>Habits</Text>
            </View>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    text: {
        fontFamily: "onest",
        fontWeight: 500,
    },
});
