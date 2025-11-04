import Button from "@/components/button";
import Input from "@/components/input";
import { Colors } from "@/constants/theme";
import { getHabitById } from "@/utils/getHabitById";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Add, Trash } from "iconsax-react-nativejs";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Keyboard,
    Pressable,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "./store/auth-store";
import { updateHabit } from "@/utils/updateHabit";
import { createHabit } from "@/utils/createHabit";
import { deleteHabit } from "@/utils/deleteHabit";

const CreateHabit = () => {
    const { token } = useAuthStore();
    const [title, settitle] = useState("");
    const [frequency, setFrequency] = useState("DAILY");
    const [loading, setloading] = useState(false);

    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEditing = !!id;

    useEffect(() => {
        if (isEditing) {
            (async () => {
                const habit = await getHabitById(token!, id);
                settitle(habit.title);
                setFrequency(habit.frequency);
            })();
        }
    }, [id]);

    const handleCreateHabit = async () => {
        try {
            setloading(true);
            await createHabit(token!, title, frequency);
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    const handleUpdateHabit = async () => {
        try {
            setloading(true);
            await updateHabit(token!, title, frequency, id!);
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    const confirmDeleteHabit = () => {
        Alert.alert(
            "Delete Habit",
            "Are you sure you want to delete this habit? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel", // non-destructive
                },
                {
                    text: "Delete",
                    style: "destructive", // red button on iOS
                    onPress: () => deleteHabit(token!, id!),
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <Stack.Screen
                options={{
                    title: isEditing ? "Edit Habit" : "Create Habit",
                    headerLeft: isEditing
                        ? () => (
                              <Pressable
                                  onPress={confirmDeleteHabit}
                                  style={{
                                      width: 36,
                                      height: 36,
                                      justifyContent: "center",
                                      alignItems: "center",
                                  }}
                              >
                                  <Trash
                                      variant="Linear"
                                      size={24}
                                      color="red"
                                  />
                              </Pressable>
                          )
                        : undefined,
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
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, padding: 20 }}>
                    <Input
                        autoFocus={true}
                        label="Title"
                        placeholder="eg. Daily Workout"
                        onChangeText={settitle}
                        value={title}
                    />

                    <View
                        style={{
                            paddingTop: 10,
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
                                style={{ flex: 1 }}
                                title="Daily"
                                variant={
                                    frequency === "DAILY"
                                        ? "primary"
                                        : "secondary"
                                }
                                onPress={() => setFrequency("DAILY")}
                            />
                            <Button
                                style={{ flex: 1 }}
                                title="Weekly"
                                variant={
                                    frequency === "WEEKLY"
                                        ? "primary"
                                        : "secondary"
                                }
                                onPress={() => setFrequency("WEEKLY")}
                            />
                        </View>
                    </View>

                    <Button
                        title={isEditing ? "Save Habit" : "Create Habit"}
                        variant="primary"
                        onPress={
                            isEditing ? handleUpdateHabit : handleCreateHabit
                        }
                        loading={loading}
                        style={{ marginTop: 10 }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default CreateHabit;
