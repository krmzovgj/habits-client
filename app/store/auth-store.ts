import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
    token: string | null;
    setToken: (t: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    setToken: async (token) => {
        if (token) {
            await SecureStore.getItemAsync("token");
            set({ token });
        } else {
            set({token: null})
        }

    },
}));

export const loadAuthToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    useAuthStore.getState().setToken(token);
};
