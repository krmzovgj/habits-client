import Button from "@/components/button";
import Input from "@/components/input";
import { Colors } from "@/constants/theme";
import { router, Stack } from "expo-router";
import { Add } from "iconsax-react-nativejs";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "./store/auth-store";

const CreateHabit = () => {
    const { token } = useAuthStore();
    const [title, settitle] = useState("");
    const [frequency, setFrequency] = useState("DAILY");
    const [loading, setloading] = useState(false);

    const createHabit = async () => {
        if (!token) return;

        if(!title) {
            Alert.alert("Habit must include a title")
        }

        const controller = new AbortController();
        const signal = controller.signal;
        let isMounted = true;

        setloading(true);
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/habit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        frequency,
                    }),
                    signal,
                }
            );

            if (response.ok && isMounted) router.back();
        } catch (error) {
        } finally {
            if (isMounted) setloading(false);
        }
        return () => {
            isMounted = false;
            controller.abort();
        };
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }} edges={["bottom"]}>
            <Stack.Screen
                options={{
                    headerBackButtonDisplayMode: "minimal",
                    headerRight: () => (
                        <Pressable
                            onPress={() => router.back()}
                            style={{
                                width: 36,
                                height: 36,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ transform: "rotate(-45deg)" }}>
                                <Add
                                    variant="Linear"
                                    size={28}
                                    color={Colors.text}
                                />
                            </View>
                        </Pressable>
                    ),
                }}
            />

            <Input
                label="Title"
                placeholder="eg. Daily Workout"
                onChangeText={settitle}
                value={title}
            />

            <View
                style={{
                    marginTop: 10,
                }}
            >
                <Text
                    style={{
                        marginLeft: 6,
                        marginBottom: 6,
                        fontFamily: "onest",
                        fontWeight: 500,
                        fontSize: 16,
                    }}
                >
                    Frequency
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 6,
                    }}
                >
                    <Button
                        title="Daily"
                        variant={
                            frequency === "DAILY" ? "primary" : "secondary"
                        }
                        onPress={() => setFrequency("DAILY")}
                    />
                    <Button
                        title="Weekly"
                        variant={
                            frequency === "WEEKLY" ? "primary" : "secondary"
                        }
                        onPress={() => setFrequency("WEEKLY")}
                    />
                </View>
            </View>

            <Button
                title="Create Habit"
                variant="primary"
                onPress={createHabit}
                loading={loading}
                style={{ marginTop: 10 }}
            />
        </SafeAreaView>
    );
};

export default CreateHabit;
