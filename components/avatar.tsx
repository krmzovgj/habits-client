import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/theme";

const Avatar = ({
    firstName,
    lastName,
    width,
    height,
    fontSize,
}: {
    firstName: string;
    lastName: string;
    width: number;
    height: number;
    fontSize: number;
}) => {

    const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

    return (
        <View
            style={{
                width: width,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                height: height,
                backgroundColor: Colors.text + "0A",
                borderRadius: 50,
            }}
        >
            <Text style={[styles.initials, {  fontSize: fontSize }]}>{initials}</Text>
        </View>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    initials: {
        fontFamily: "onest",
        fontWeight: 800,
    },
});

