import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "@/constants/theme";

type HeaderProps = {
    title: string;
    headerRight?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ title, headerRight }) => {
    return (
        <View
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
            }}
        >
            <Text
                style={{ color: Colors.text, fontFamily: "onest", fontWeight: "600", fontSize: 20 }}
            >
                {title}
            </Text>

            {headerRight && <View>{headerRight}</View>}
        </View>
    );
};

export default Header;
