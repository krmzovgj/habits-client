import AnimatedPressable from "@/components/animated-pressable";
import Button from "@/components/button";
import Input from "@/components/input";
import { Colors } from "@/constants/theme";
import { createHabit } from "@/utils/createHabit";
import { deleteHabit } from "@/utils/deleteHabit";
import { habitColors } from "@/utils/habitColors";
import { updateHabit } from "@/utils/updateHabit";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Add, TickCircle, Trash } from "iconsax-react-nativejs";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "./store/auth-store";

const CreateHabit = () => {
    const { token } = useAuthStore();

    const {
        id,
        title: initialTitle,
        frequency: initialFrequency,
        color: initialColor,
    } = useLocalSearchParams<{
        id?: string;
        title?: string;
        frequency?: string;
        color?: string;
    }>();

    const [title, settitle] = useState(initialTitle ?? "");
    const [frequency, setFrequency] = useState(initialFrequency ?? "DAILY");
    const [loading, setloading] = useState(false);
    const [deleteLoading, setdeleteLoading] = useState(false);
    const [color, setcolor] = useState(initialColor ?? "FF8C00");

    const isEditing = !!id;

    const handleCreateHabit = async () => {
        try {
            setloading(true);
            await createHabit(token!, title, frequency, color!);
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    const handleUpdateHabit = async () => {
        try {
            setloading(true);
            await updateHabit(token!, title, color!, frequency!, id!);
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
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setdeleteLoading(true);
                            await deleteHabit(token!, id!);
                            router.back();
                        } catch (error) {
                            console.log(error);
                        } finally {
                            setdeleteLoading(false);
                        }
                    },
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
                              <View>
                                  {deleteLoading ? (
                                      <View
                                          style={{
                                              width: 36,
                                              height: 36,
                                              justifyContent: "center",
                                              alignItems: "center",
                                          }}
                                      >
                                          <ActivityIndicator
                                              size="small"
                                              color={Colors.text}
                                          />
                                      </View>
                                  ) : (
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
                                  )}
                              </View>
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
                            pressableStyle={{ flex: 1 }}
                            title="Daily"
                            variant={
                                frequency === "DAILY" ? "primary" : "secondary"
                            }
                            onPress={() => setFrequency("DAILY")}
                        />
                        <Button
                            pressableStyle={{ flex: 1 }}
                            title="Weekly"
                            variant={
                                frequency === "WEEKLY" ? "primary" : "secondary"
                            }
                            onPress={() => setFrequency("WEEKLY")}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}></View>
                    <Text
                        style={{
                            marginLeft: 6,
                            marginBottom: 6,
                            fontFamily: "onest",
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                    >
                        Habit Color
                    </Text>

                    <FlatList
                        data={habitColors}
                        style={{
                            marginLeft: 6,
                            marginBottom: 6,
                        }}
                        keyExtractor={(item) => item}
                        horizontal
                        renderItem={({ item }) => (
                            <AnimatedPressable onPress={() => setcolor(item)}>
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: 14,
                                        backgroundColor: "#" + item,
                                        marginRight: 6,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {item === color && (
                                        <TickCircle
                                            variant="Bold"
                                            size={20}
                                            color={Colors.background}
                                        />
                                    )}
                                </View>
                            </AnimatedPressable>
                        )}
                    />
                </View>

                <Button
                    title={isEditing ? "Save Habit" : "Create Habit"}
                    variant="primary"
                    onPress={isEditing ? handleUpdateHabit : handleCreateHabit}
                    loading={loading}
                    style={{ marginTop: 10 }}
                />
            </View>
        </SafeAreaView>
    );
};

export default CreateHabit;
