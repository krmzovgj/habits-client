import { router } from "expo-router";
import { Alert } from "react-native";

export const createHabit = async (
  token: string,
  title: string,
  frequency: string,
  color: string
) => {
  if (!token) return;

  if (!title) {
    Alert.alert("Habit must include a title");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/habit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          frequency,
          color
        }),
      }
    );

    if (response.ok) {
      router.back(); 
    } else {
      const data = await response.json();
      Alert.alert("Creation failed", data.message || "Unknown error");
    }
  } catch (error) {
    Alert.alert("Failed to create habit. Please try again.");
  }
};
