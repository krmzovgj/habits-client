import { Colors } from "@/constants/theme";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { loadAuthToken, useAuthStore } from "./store/auth-store";
import { useUserStore } from "./store/user-store";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    const [loading, setLoading] = useState(true);
    const { user } = useUserStore()
    const {token} = useAuthStore()
    const [fontsLoaded, error] = useFonts({
        onest: require("../assets/fonts/Onest-VariableFont_wght.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (fontsLoaded && !loading) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, loading]);

    useEffect(() => {
        const init = async () => {
            await loadAuthToken();
            const timer = setTimeout(() => setLoading(false), 1000);
            return () => clearTimeout(timer);

        };
        init();
    }, []);

    if (!fontsLoaded || loading) return null;

    return (    
        <Stack>
            <Stack.Protected guard={!!token}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="habit-ops"
                    options={{
                        presentation: "formSheet",
                        sheetAllowedDetents: [0.5],
                        contentStyle: { backgroundColor: Colors.background },
                        headerShadowVisible: false,
                    }}
                />
            </Stack.Protected>

            <Stack.Protected guard={!token}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    );
}
