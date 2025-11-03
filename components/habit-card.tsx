import { Frequency, Habit } from "@/app/models/habit";
import { Colors } from "@/constants/theme";
import { completeHabit } from "@/utils/completeHabit";
import {
    RecordCircle,
    RefreshSquare,
    Star1,
    TickCircle,
} from "iconsax-react-nativejs";
import React, { useRef } from "react";
import { Alert, Animated, Easing, Pressable, Text, View } from "react-native";
import * as Haptic from 'expo-haptics'

const HabitCard = ({ token, habit }: { token: string; habit: Habit }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const animateTick = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.7,
                duration: 100,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 80,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleCompleteHabit = async () => {
        Haptic.impactAsync()
        if (habit.completed) {
            return Alert.alert(
                `Habit already completed ${
                    habit.frequency === Frequency.WEEKLY ? "this week" : "today"
                }`
            );
        }

        animateTick();
        await completeHabit(token, habit.id);
    };

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    columnGap: 10,
                    alignItems: "center",
                }}
            >
                <RefreshSquare variant="Bold" size={46} color={Colors.text} />

                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 6,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                columnGap: 3,
                            }}
                        >
                            <Star1
                                variant="Bulk"
                                size={14}
                                color={
                                    habit.streakCount === 0
                                        ? Colors.text
                                        : Colors.tint
                                }
                            />
                            <Text
                                style={{
                                    fontFamily: "onest",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: Colors.text + "9A",
                                    marginTop: 1,
                                }}
                            >
                                {habit.streakCount}
                            </Text>
                        </View>

                        <RecordCircle
                            variant="Bold"
                            size={6}
                            color={Colors.text}
                        />
                        <Text
                            style={{
                                fontFamily: "onest",
                                fontWeight: 500,
                                color: Colors.text + "9A",
                                textTransform: "capitalize",
                            }}
                        >
                            {habit.frequency}
                        </Text>
                    </View>

                    <Text
                        style={{
                            fontFamily: "onest",
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                    >
                        {habit.title}
                    </Text>
                </View>
            </View>

            <Pressable
                style={{
                    width: 38,
                    height: 38,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 14,
                    backgroundColor: Colors.text + "0A",
                }}
                onPress={handleCompleteHabit}
            >
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    {habit.completed ? (
                        <TickCircle
                            variant="Bold"
                            size={26}
                            color={Colors.text}
                        />
                    ) : (
                        <TickCircle
                            variant="Linear"
                            size={26}
                            color={Colors.text}
                        />
                    )}
                </Animated.View>
            </Pressable>
        </View>
    );
};

export default HabitCard;
