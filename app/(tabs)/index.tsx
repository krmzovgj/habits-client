import HabitCard from "@/components/habit-card";
import { Colors } from "@/constants/theme";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { AddSquare, Box1, NotificationBing } from "iconsax-react-nativejs";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import io from "socket.io-client";
import Header from "../../components/header";
import { Habit } from "../models/habit";
import { useAuthStore } from "../store/auth-store";
import { useUserStore } from "../store/user-store";

const socket = io(process.env.EXPO_PUBLIC_BACKEND_URL!, {
    transports: ["websocket"],
});
const Habits = () => {
    const { token } = useAuthStore();
    const { user, setUser } = useUserStore();
    const [loading, setloading] = useState(false);
    const [habits, sethabits] = useState<Habit[]>([]);

    const getHabits = async () => {
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/habit`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                sethabits(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!token) return;
        setloading(true);
        const getUser = async () => {
            try {
                const response = await fetch(
                    `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/me`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const user = await response.json();
                    setUser(user);

                    socket.emit("joinRoom", { id: user.id });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        };

        getUser();
        getHabits();
    }, [token]);

    useEffect(() => {
        if (!user?.id) return;

        socket.on("newHabit", (newHabit: Habit) => {
            sethabits((prev) => [newHabit, ...prev]);
        });

        socket.on("habitUpdated", (updatedHabit: Habit) => {
            sethabits((prev) =>
                prev.map((habit) =>
                    habit.id === updatedHabit.id ? updatedHabit : habit
                )
            );
        });

        socket.on("habitDeleted", (habitId: string) => {
            sethabits((prev) => prev.filter((habit) => habit.id !== habitId));
        });

        socket.on("habitCompleted", (completedHabit: Habit) => {
            sethabits((prev) =>
                prev.map((habit) =>
                    habit.id === completedHabit.id ? completedHabit : habit
                )
            );
        });

        return () => {
            socket.off("newHabit");
            socket.off("habitUpdated");
            socket.off("habitDeleted");
        };
    }, [user]);

    const createHabit = () => {
        router.push("/habit-ops");
        Haptics.selectionAsync();
    };

    return (
        <SafeAreaView edges={["top"]} style={{ padding: 20, flex: 1 }}>
            <Header
                title="Home"
                headerRight={
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 10,
                            display: "flex",
                        }}
                    >
                        <Pressable onPress={createHabit}>
                            <AddSquare
                                variant="Bold"
                                size={25}
                                color={Colors.text}
                            />
                        </Pressable>
                    </View>
                }
            />

            {loading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="small" color={Colors.text} />
                </View>
            ) : (
                <View>
                    <ScrollView
                        scrollEnabled={habits.length >= 8 ? true : false}
                        contentContainerStyle={{
                            paddingBottom: 110,

                            backgroundColor: Colors.background,
                        }}
                        refreshControl={
                            <RefreshControl
                                onRefresh={getHabits}
                                refreshing={false}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={{
                                marginTop: 30,
                            }}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        fontSize: 32,
                                        fontWeight: 600,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    },
                                ]}
                            >
                                Hi {user?.firstName}
                            </Text>

                            <View style={{ marginTop: 60 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            { fontWeight: "600", fontSize: 20 },
                                        ]}
                                    >
                                        My Habits
                                    </Text>
                                </View>

                                <FlatList
                                    ListEmptyComponent={() => (
                                        <View
                                            style={{
                                                flex: 1,
                                                height: "100%",
                                                marginTop: 50,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 18,
                                                    backgroundColor:
                                                        Colors.text + "0A",
                                                }}
                                            >
                                                <Box1
                                                    variant="Bulk"
                                                    size={40}
                                                    color={Colors.text}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    marginTop: 20,
                                                    fontSize: 16,
                                                    fontFamily: "onest",
                                                    fontWeight: 600,
                                                    color: Colors.text,
                                                    textAlign: "center",
                                                }}
                                            >
                                                No Habits Yet
                                            </Text>
                                            <Text
                                                style={{
                                                    marginTop: 10,
                                                    fontSize: 14,
                                                    fontFamily: "onest",
                                                    fontWeight: 500,
                                                    color: Colors.text + "9A",
                                                    textAlign: "center",
                                                }}
                                            >
                                                You haven't created any habits
                                                yet. {"\n"}
                                                Get started by creating your
                                                first habit
                                            </Text>

                                            <Pressable
                                                onPress={createHabit}
                                                style={{
                                                    marginTop: 30,
                                                    paddingVertical: 16,
                                                    paddingHorizontal: 20,
                                                    borderRadius: 20,
                                                    backgroundColor:
                                                        Colors.text,
                                                }}
                                            >
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        {
                                                            color: Colors.background,
                                                        },
                                                    ]}
                                                >
                                                    Create Habit
                                                </Text>
                                            </Pressable>
                                        </View>
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View
                                            style={{ marginVertical: 10 }}
                                        ></View>
                                    )}
                                    style={{
                                        marginTop: 20,
                                    }}
                                    scrollEnabled={false}
                                    data={habits}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }: { item: Habit }) => (
                                        <HabitCard
                                            token={token!}
                                            habit={item}
                                        />
                                    )}
                                    ListFooterComponent={() => (
                                        <Pressable
                                            onPress={createHabit}
                                            style={{
                                                alignSelf: "center",
                                                marginTop: 30,
                                                paddingVertical: 16,
                                                paddingHorizontal: 20,
                                                borderRadius: 20,
                                                backgroundColor: Colors.text,
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.text,
                                                    {
                                                        color: Colors.background,
                                                    },
                                                ]}
                                            >
                                                Create Habit
                                            </Text>
                                        </Pressable>
                                    )}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Habits;

const styles = StyleSheet.create({
    text: {
        fontFamily: "onest",
        fontWeight: 500,
        color: Colors.text,
    },
});
