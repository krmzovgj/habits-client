import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Colors } from "@/constants/theme";

type CircularProgressProps = {
    size: number; // diameter of the circle
    strokeWidth: number;
    progressPercent: number; // 0-100
};

const CircularProgress = ({
    size,
    strokeWidth,
    progressPercent,
}: CircularProgressProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
        circumference - (circumference * progressPercent) / 100;

    return (
        <View
            style={{
                width: size,
                height: size,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Svg width={size} height={size}>
                {/* Background circle */}
                <Circle
                    stroke={Colors.text + "22"}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <Circle
                    stroke={Colors.text}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            <Text
                style={{
                    position: "absolute",
                    fontFamily: "onest",
                    fontSize: 22,
                    fontWeight: "900",
                    color: Colors.text,
                }}
            >
                {progressPercent}
                <Text style={{ color: Colors.text + "9A", fontSize: 16 }}>
                    %
                </Text>
            </Text>
        </View>
    );
};

export default CircularProgress;
