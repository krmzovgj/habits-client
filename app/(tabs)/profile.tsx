import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { Logout, LogoutCurve, Setting2 } from "iconsax-react-nativejs";
import { Colors } from "@/constants/theme";
import { useUserStore } from "../store/user-store";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/auth-store";
import Avatar from "@/components/avatar";

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
                    <Setting2 variant="Bold" size={25} color={Colors.text} />
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

                <Pressable
                    onPress={signOut}
                    style={{
                        marginTop: 30,
                        paddingVertical: 16,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        backgroundColor: Colors.text + "0A",
                        flexDirection: "row",
                        alignItems: "center",
                        alignSelf: "flex-start",
                        columnGap: 8,
                    }}
                >
                    <LogoutCurve variant="Linear" size={20} color="red" />
                    <Text
                        style={{
                            fontFamily: "onest",
                            fontWeight: 500,
                            color: Colors.text,
                        }}
                    >
                        Sign Out
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
