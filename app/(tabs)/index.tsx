import AnimatedPressable from "@/components/animated-pressable";
import Avatar from "@/components/avatar";
import DailyProgress from "@/components/daily-progress";
import HabitCard from "@/components/habit-card";
import { Colors } from "@/constants/theme";
import { getHabits } from "@/utils/getHabits";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import {
    Add,
    ArchiveBox,
    ClipboardText,
    TickCircle,
} from "iconsax-react-nativejs";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    AppState,
    FlatList,
    Image,
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
import FlameIcon from "@/components/flame-icon";
import { socket } from "@/utils/socket";


const Habits = () => {
    const { token } = useAuthStore();
    const { user, setUser } = useUserStore();
    const [loading, setloading] = useState(false);
    const [habits, sethabits] = useState<Habit[]>([]);

    const fetchHabits = async () => {
        try {
            const habitsResponse = await getHabits(token!);
            sethabits(habitsResponse);
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    useEffect(() => {
        if (!token) return;

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

                    if (!socket.connected) {
                        socket.connect();
                    }
                    socket.emit("joinRoom", { id: user.id });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        };

        setloading(true);
        getUser();
        fetchHabits();
    }, [token]);

    useEffect(() => {
        if (!user?.id) return;

        const handleConnect = () => {
            console.log("✅ Socket connected");
            socket.emit("joinRoom", { id: user.id });
        };

        const handleReconnect = () => {
            console.log("♻️ Socket reconnected");
            socket.emit("joinRoom", { id: user.id });
        };

        const handleDisconnect = () => {
            console.log("❌ Socket disconnected");
        };

        socket.on("connect", handleConnect);
        socket.on("reconnect", handleReconnect);
        socket.on("disconnect", handleDisconnect);

        const subscription = AppState.addEventListener(
            "change",
            (nextState) => {
                if (nextState === "active" && !socket.connected) {
                    console.log("🔄 Reconnecting socket after app resume");
                    socket.connect();
                }
            }
        );

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
            subscription.remove();
            socket.off("connect", handleConnect);
            socket.off("reconnect", handleReconnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("newHabit");
            socket.off("habitUpdated");
            socket.off("habitDeleted");
            socket.off("habitCompleted");
        };
    }, [user]);

    const createHabit = () => {
        router.push("/habit-ops");
        Haptics.selectionAsync();
    };

    const uncompleteHabits = useMemo(
        () => habits.filter((habit) => !habit.completed),
        [habits]
    );

    return (
        <SafeAreaView edges={["top"]} style={{ padding: 20, flex: 1 }}>
            <Header
                title=""
                headerLeft={
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 8,
                        }}
                    >
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                fontFamily: "onest",
                                fontWeight: 700,
                                fontSize: 22,
                            }}
                        >
                            habits
                        </Text>
                    </View>
                }
                headerRight={
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 10,
                            display: "flex",
                        }}
                    >
                        {user ? (
                            <Pressable onPress={() => router.push("/profile")}>
                                <Avatar
                                    firstName={user.firstName ?? ""}
                                    lastName={user.lastName ?? ""}
                                    width={40}
                                    height={40}
                                    fontSize={14}
                                />
                            </Pressable>
                        ) : null}
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
                <View style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={{
                            paddingBottom: 170,

                            backgroundColor: Colors.background,
                        }}
                        refreshControl={
                            <RefreshControl
                                onRefresh={fetchHabits}
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
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    columnGap: 3
                                }}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            fontSize: 32,
                                            fontWeight: 800,
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        },
                                    ]}
                                >
                                    Hi {user?.firstName},
                                </Text>
                                    
                                <FlameIcon size={32} color={Colors.tint} />
                            </View>

                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    columnGap: 4,
                                    marginTop: 2,
                                }}
                            >
                                {uncompleteHabits.length === 0 ? (
                                    <TickCircle
                                        variant="Bold"
                                        size={14}
                                        color={Colors.text}
                                    />
                                ) : (
                                    <ClipboardText
                                        variant="Bold"
                                        size={14}
                                        color={Colors.text}
                                    />
                                )}
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            fontWeight: 500,
                                            color: Colors.text + "9A",
                                        },
                                    ]}
                                >
                                    {uncompleteHabits.length === 0
                                        ? "Habits completed - All caught up for today"
                                        : `${uncompleteHabits.length} habit left for today's schedule`}
                                </Text>
                            </View>

                            <View style={{ marginTop: 40 }}>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            fontWeight: "600",
                                            fontSize: 20,
                                            marginBottom: 20,
                                        },
                                    ]}
                                >
                                    Progress
                                </Text>
                                <DailyProgress
                                    uncompleteHabits={uncompleteHabits.length}
                                    habits={habits}
                                />

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
                                                marginTop: 25,
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
                                                <ArchiveBox
                                                    variant="Bulk"
                                                    size={36}
                                                    color={Colors.text}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    marginTop: 30,
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
                                />
                            </View>
                        </View>
                    </ScrollView>

                    <AnimatedPressable
                        onPress={createHabit}
                        style={{
                            position: "absolute",
                            bottom: 80,
                            alignSelf: "center",
                            paddingVertical: 16,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            alignItems: "center",
                            columnGap: 6,
                            flexDirection: "row",
                            backgroundColor: Colors.text,
                        }}
                    >
                        <Add variant="Linear" size={22} color={Colors.tint} />
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
                    </AnimatedPressable>
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
