import Button from "@/components/button";
import Input from "@/components/input";
import { Colors } from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
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
import { useAuthStore } from "../store/auth-store";

const SignIn = () => {
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [loading, setloading] = useState(false);
    const { setToken } = useAuthStore();

    const { createdAccEmail } = useLocalSearchParams<{
        createdAccEmail: string;
    }>();

    useEffect(() => {
        setemail(createdAccEmail);
    }, [createdAccEmail]);

    const signIn = async () => {
        setloading(true);
        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/sign-in`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                await SecureStore.setItemAsync("token", data.token);
                router.replace("/(tabs)");
            } else {
                Alert.alert(await data.message);
            }
        } catch (error: any) {
        } finally {
            setloading(false);
        }
    };

    return (
        <SafeAreaView
            style={{ padding: 10, paddingHorizontal: 20, flex: 1 }}
            edges={["bottom"]}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 14,
                        }}
                    >
                        <Input
                            label="Email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={setemail}
                        />
                        <Input
                            label="Password"
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setpassword}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            loading={loading}
                            title="Sign In"
                            variant="primary"
                            onPress={signIn}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 40,
                            justifyContent: "center",
                            marginLeft: 6,
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "onest",
                                fontWeight: 500,
                                color: Colors.text,
                            }}
                        >
                            Don't have an account?
                        </Text>
                        <Pressable
                            onPress={() => router.push("/create-account")}
                        >
                            <Text style={{ fontWeight: 600 }}>
                                {" "}
                                Create Account
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default SignIn;
