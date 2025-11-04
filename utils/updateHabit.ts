import { router } from "expo-router";
import { Alert } from "react-native";

export const updateHabit = async (
  token: string,
  title: string,
  frequency: string,
  id: string
) => {
  if (!token) return;

  if (!title) {
    Alert.alert("Habit must include a title");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/habit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          frequency,
        }),
      }
    );

    if (response.ok) {
      router.back(); 
    } else {
      const data = await response.json();
      Alert.alert("Update failed", data.message || "Unknown error");
    }
  } catch (error) {
    console.log("Update habit error:", error);
    Alert.alert("Failed to update habit. Please try again.");
  }
};
