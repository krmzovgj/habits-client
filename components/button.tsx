import React from "react";
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
    Pressable,
} from "react-native";
import { Colors } from "@/constants/theme";

type ButtonProps = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: "primary" | "secondary";
    style?: ViewStyle;
};

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = "primary",
    style,
}) => {
    const backgroundColor =
        variant === "primary" ? Colors.text : Colors.text + "1A";
    const foreground = variant === "primary" ? Colors.background : Colors.text;

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                { backgroundColor: disabled ? "#ccc" : backgroundColor, flex: 1 },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator size={"small"} color={foreground} />
            ) : (
                <Text style={[styles.text, { color: foreground }]}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        fontFamily: "onest",
        fontWeight: "500",
    },
});
