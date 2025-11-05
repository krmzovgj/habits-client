import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import {
    Edit,
    Edit2,
    Logout,
    LogoutCurve,
    Setting2,
    Trash,
} from "iconsax-react-nativejs";
import { Colors } from "@/constants/theme";
import { useUserStore } from "../store/user-store";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/auth-store";
import Avatar from "@/components/avatar";
import Button from "@/components/button";
import { router } from "expo-router";
import AnimatedPressable from "@/components/animated-pressable";

const Profile = () => {
    const { user, setUser } = useUserStore();
    const { setToken } = useAuthStore();

    const signOut = async () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: async () => {
                        await SecureStore.deleteItemAsync("token");
                        setToken(null);
                        setUser(null);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={{ padding: 20, flex: 1 }}>
            <Header
                title="Profile"
                headerRight={
                    <AnimatedPressable onPress={() => router.push("/delete-user")}>

                    <Trash variant="Bulk" size={25} color={'red'} />
                    </AnimatedPressable>
                }
            />
            <View
                style={{
                    marginTop: 30,
                    flex: 1,
                    
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 8,
                    }}
                >
                    <Avatar
                        firstName={user?.firstName!}
                        lastName={user?.lastName!}
                        width={60}
                        height={60}
                        fontSize={22}
                    />

                    <View>
                        <Text
                            style={{
                                fontFamily: "onest",
                                fontWeight: 600,
                                color: Colors.text + "9A",
                            }}
                        >
                            {user?.email}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "onest",
                                fontWeight: 600,
                                fontSize: 22,
                                color: Colors.text,
                            }}
                        >
                            {user?.firstName} {user?.lastName}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 40,
                        flexDirection: "column",
                        rowGap: 8,
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 6,
                            marginBottom: 6,
                            fontFamily: "onest",
                            fontWeight: "500",
                            fontSize: 16,
                        }}
                    >
                        Options
                    </Text>
                    <Button
                        icon={
                            <Edit
                                variant="Bulk"
                                size={20}
                                color={Colors.text}
                            />
                        }
                        variant="secondary"
                        title="Edit Profile"
                        onPress={() => router.push("/user-ops")}
                    />
                    <Button
                        icon={
                            <LogoutCurve
                                variant="Bulk"
                                size={20}
                                color="red"
                            />
                        }
                        variant="secondary"
                        title="Sign Out"
                        onPress={signOut}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
