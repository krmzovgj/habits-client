import AnimatedPressable from "@/components/animated-pressable";
import Button from "@/components/button";
import Input from "@/components/input";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import { Eye, EyeSlash } from "iconsax-react-nativejs";
import React, { useState } from "react";
import {
    Keyboard,
    Text,
    TouchableWithoutFeedback,
    View,
    Platform,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreateAccount = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [isSecure, setisSecure] = useState(true);
    const [loading, setloading] = useState(false);

    const createAccount = async () => {
        setloading(true);
        if (password !== confirmPassword) {
            Alert.alert("Passwords does not match");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/create-account`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password,
                    }),
                }
            );
            if (response.ok) {
                router.push({
                    pathname: "/sign-in",
                    params: {
                        createdAccEmail: email,
                    },
                });
            } else {
                const data = await response.json();
                Alert.alert(data.message);
            }
        } catch (error) {
        } finally {
            setloading(false);
        }
    };

    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{ flex: 1, paddingHorizontal: 20 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    extraScrollHeight={Platform.OS === "ios" ? 60 : 80}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingVertical: 20,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flexDirection: "column", rowGap: 14 }}>
                        <Input
                            label="Firstname"
                            placeholder="John"
                            value={firstName}
                            onChangeText={setfirstName}
                        />

                        <Input
                            label="Lastname"
                            placeholder="Doe"
                            value={lastName}
                            onChangeText={setlastName}
                        />

                        <Input
                            label="Email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={setemail}
                        />

                        <Input
                            label="Password"
                            placeholder="Password"
                            secureTextEntry={isSecure}
                            value={password}
                            onChangeText={setpassword}
                            icon={
                                <AnimatedPressable
                                    onPress={() => setisSecure((prev) => !prev)}
                                >
                                    {isSecure ? (
                                        <Eye
                                            variant="Linear"
                                            size={20}
                                            color={Colors.text}
                                        />
                                    ) : (
                                        <EyeSlash
                                            variant="Linear"
                                            size={20}
                                            color={Colors.text}
                                        />
                                    )}
                                </AnimatedPressable>
                            }
                        />

                        <Input
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            secureTextEntry={isSecure}
                            value={confirmPassword}
                            onChangeText={setconfirmPassword}
                        />

                        <View style={{ marginTop: 10 }}>
                            <Button
                                loading={loading}
                                title="Create Account"
                                variant="primary"
                                onPress={createAccount}
                            />
                        </View>

                        <View
                            style={{
                                marginTop: 20,
                                justifyContent: "center",
                                marginLeft: 6,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "onest",
                                    fontWeight: "500",
                                    color: Colors.text,
                                }}
                            >
                                Already have an account?
                            </Text>
                            <AnimatedPressable
                                onPress={() => router.push("/sign-in")}
                            >
                                <Text style={{ fontWeight: "600" }}>
                                    {" "}
                                    Sign In
                                </Text>
                            </AnimatedPressable>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default CreateAccount;
