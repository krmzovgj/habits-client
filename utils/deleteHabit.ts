import { router } from "expo-router";
import { Alert } from "react-native";

export const deleteHabit = async (token: string, habitId: string) => {
    try {
        if (!token) return;

        const response = await fetch(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/habit/${habitId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if(response.ok) {
            router.back()
        }
    } catch (error) {
        Alert.alert("Failed to delete habit. Please try again.");
    }
};
