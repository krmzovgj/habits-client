import { View, Text, Pressable } from "react-native";
import React from "react";
import { Add, Trash } from "iconsax-react-nativejs";
import { Colors } from "@/constants/theme";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/button";
import { useUserStore } from "./store/user-store";
import { useAuthStore } from "./store/auth-store";
import { useDeleteUser } from "@/utils/deleteUser";

const Deleteuser = () => {
    const { user } = useUserStore();

    const { deleteUser } = useDeleteUser();

    const { token } = useAuthStore();

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <Stack.Screen
                options={{
                    title: "Account",
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

            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                }}
            >
                <Trash variant="Bulk" size={36} color="red" />
                <Text
                    style={{
                        marginTop: 20,
                        fontFamily: "onest",
                        fontWeight: 600,
                        fontSize: 20,
                    }}
                >
                    Delete Account?
                </Text>
                <Text
                    style={{
                        fontFamily: "onest",
                        fontWeight: 600,
                        marginTop: 8,
                        marginBottom: 20,
                        textAlign: "center",
                        color: Colors.text + "9A",
                    }}
                >
                    Are you sure you want to delete your account, {"\n"} this
                    action is irreversible!
                </Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <Button
                    onPress={() => deleteUser(token!, user?.id!)}
                    variant="secondary"
                    icon={<Trash variant="Bulk" size={20} color="red" />}
                    title="Confirm Delete"
                />
            </View>
        </SafeAreaView>
    );
};

export default Deleteuser;
