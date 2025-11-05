import React, { ReactNode, useRef } from "react";
import {
    Animated,
    Pressable,
    Text,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
    StyleProp,
    Easing,
} from "react-native";
import { Colors } from "@/constants/theme";

type ButtonProps = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: "primary" | "secondary";
    style?: StyleProp<ViewStyle>;
    icon?: ReactNode;
    pressableStyle?: StyleProp<ViewStyle>;
};

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = "primary",
    style,
    icon,
    pressableStyle,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 80,
                useNativeDriver: true,
            }),
        ]).start();

        onPress?.();
    };

    const backgroundColor =
        variant === "primary" ? Colors.text : Colors.text + "1A";
    const foreground = variant === "primary" ? Colors.background : Colors.text;

    return (
        <Pressable
            onPress={handlePress}
            style={pressableStyle}
            disabled={disabled || loading}
        >
            <Animated.View
                style={[
                    {
                        transform: [{ scale: scaleAnim }],
                        backgroundColor: disabled ? "#ccc" : backgroundColor,
                    },
                    styles.button,
                    style,
                ]}
            >
                {icon && icon}
                
                {loading ? (
                    <ActivityIndicator size="small" color={foreground} />
                ) : (
                    <Text style={[styles.text, { color: foreground }]}>
                        {title}
                    </Text>
                )}
            </Animated.View>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        borderRadius: 20,
        flexDirection: "row",
        columnGap: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        fontFamily: "onest",
        fontWeight: "500",
    },
});
