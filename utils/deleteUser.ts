import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useUserStore } from "@/app/store/user-store";
import { useAuthStore } from "@/app/store/auth-store";

export const useDeleteUser = () => {
  const { setUser } = useUserStore();
  const { setToken } = useAuthStore();

  const deleteUser = async (token: string, userId: number) => {
    return new Promise<void>((resolve, reject) => {
      Alert.alert(
        "Confirm Deletion",
        "By pressing delete you will proceed to account deletion",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(),
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                const response = await fetch(
                  `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/${userId}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                if (!response.ok) {
                  throw new Error("Failed to delete user");
                }

                await SecureStore.deleteItemAsync("token");
                setToken(null);
                setUser(null);

                resolve();
              } catch (error) {
                console.error(error);
                Alert.alert(
                  "Error",
                  "Something went wrong while deleting your account."
                );
                reject(error);
              }
            },
          },
        ]
      );
    });
  };

  return { deleteUser };
};
