import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

interface AuthState {
    token: string | null;
    setToken: (t: string | null) => void;
    signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    setToken: async (token) => {
        if (token) {
            await SecureStore.getItemAsync("token");
        }

        console.log;

        set({ token });
    },
    signOut: async () => {
        set({ token: null });
    },
}));

export const loadAuthToken = async () => {
    const token = await SecureStore.getItemAsync("authToken");
    useAuthStore.getState().setToken(token);
};
