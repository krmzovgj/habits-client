import { Habit } from "@/app/models/habit";
import { Colors } from "@/constants/theme";
import { Activity, TickCircle, Timer } from "iconsax-react-nativejs";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import CircularProgress from "./circular-progress";

const DailyProgress = ({
    habits,
    uncompleteHabits,
}: {
    habits: Habit[];
    uncompleteHabits: number;
}) => {
    const completedHabits = useMemo(
        () => habits.filter((habit) => habit.completed === true),
        [habits]
    );

    const progress = Math.round((completedHabits.length / habits.length) * 100);
    
    return (
        <View
            style={{
                width: "100%",
                alignSelf: "center",
                marginBottom: 20,
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <CircularProgress
                    size={80}
                    strokeWidth={10}
                    progressPercent={!isNaN(progress) ? progress : 0}
                />

                <View
                    style={{
                        backgroundColor: Colors.text,
                        width: 80,
                        height: 80,
                        borderWidth: 2,
                        borderColor: Colors.text,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            alignSelf: "center",
                            bottom: 0,
                            right: -4,
                        }}
                    >
                        <TickCircle
                            variant="Bulk"
                            size={40}
                            color={"#66A786"}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 24,
                            position: "absolute",
                            left: 20,
                            top: 8,
                            fontWeight: 800,
                            marginTop: 6,
                            fontFamily: "onest",
                            color: Colors.background,
                        }}
                    >
                        {completedHabits.length}
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: Colors.text,
                        width: 80,
                        height: 80,
                        borderWidth: 2,
                        borderColor: Colors.text,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            alignSelf: "center",
                            bottom: 0,
                            right: -4,
                        }}
                    >
                        <Timer variant="Bulk" size={40} color={Colors.tint} />
                    </View>
                    <Text
                        style={{
                            fontSize: 24,
                            position: "absolute",
                            left: 20,
                            top: 8,
                            fontWeight: 800,
                            marginTop: 6,
                            fontFamily: "onest",
                            color: Colors.background,
                        }}
                    >
                        {uncompleteHabits}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default DailyProgress;
