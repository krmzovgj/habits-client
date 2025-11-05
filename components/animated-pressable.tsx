import React, { useRef } from "react";
import { Animated, Pressable, Easing, ViewStyle, StyleProp } from "react-native";

type AnimatedPressableProps = {
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const AnimatedPressable = ({ onPress, children, style }: AnimatedPressableProps) => {
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

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnim }],
          },
          style, // full button styles go here
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedPressable;
