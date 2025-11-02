import { View, Text } from "react-native";
import React, { ReactNode } from "react";

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
                style={{ fontFamily: "onest", fontWeight: "600", fontSize: 20 }}
            >
                {title}
            </Text>

            {headerRight && <View>{headerRight}</View>}
        </View>
    );
};

export default Header;
