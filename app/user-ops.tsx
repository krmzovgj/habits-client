import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { useUserStore } from "./store/user-store";
import { useAuthStore } from "./store/auth-store";
import Input from "@/components/input";
import { router, Stack } from "expo-router";
import { Add } from "iconsax-react-nativejs";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/button";
import { socket } from "@/utils/socket";
import { User } from "./models/user";
import * as SecureStore from "expo-secure-store";

const UserOps = () => {
    const { token, setToken } = useAuthStore();
    const { user, setUser } = useUserStore();

    const [firstName, setfirstName] = useState(user?.firstName);
    const [lastName, setlastName] = useState(user?.lastName);
    const [email, setemail] = useState(user?.email);
    const [loading, setloading] = useState(false);

    const updateUser = async () => {
        setloading(true);
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/${user?.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                    }),
                }
            );

            if (response.ok) {
                router.back();
            }

            if (user?.email !== email) {
                Alert.alert("Email changed", "Sign out is required", [
                    {
                        text: "Sign Out",
                        style: "destructive",
                        onPress: async () => {
                            await SecureStore.deleteItemAsync("token");
                            setToken(null);
                            setUser(null);
                        },
                    },
                ]);
            }
        } catch (error) {
        } finally {
            setloading(false);
        }
    };

    socket.on("userUpdated", (user: User) => {
        setUser(user);
    });

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <Stack.Screen
                options={{
                    title: "Edit Profile",
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
            <View style={{ flex: 1, padding: 20, rowGap: 10 }}>
                <Input
                    autoFocus={true}
                    label="Firstname"
                    placeholder="John"
                    onChangeText={setfirstName}
                    value={firstName!}
                />

                <Input
                    label="Lastname"
                    placeholder="Doe"
                    onChangeText={setlastName}
                    value={lastName!}
                />

                <Input
                    label="Email"
                    placeholder="example@gmail.com"
                    onChangeText={setemail}
                    value={email!}
                />

                <View
                    style={{
                        marginTop: 10,
                    }}
                ></View>

                <Button
                    title="Save"
                    variant="primary"
                    onPress={updateUser}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    );
};

export default UserOps;
