import { Colors } from "@/constants/theme";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger
                options={{
                    labelStyle: {
                        fontFamily: "onest",
                        fontSize: 11,
                        fontWeight: "500",
                    },
                    selectedIconColor: Colors.text,
                    iconColor: Colors.text + "4A",
                }}
                name="index"
            >
                <Label>Habits</Label>
                <Icon sf="arrow.2.circlepath.circle.fill" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger
                options={{
                    labelStyle: {
                        fontFamily: "onest",
                        fontSize: 11,
                        fontWeight: "500",
                    },
                    selectedIconColor: Colors.text,
                    iconColor: Colors.text + "4A",
                }}
                name="profile"
            >
                <Icon sf="person.crop.circle.fill" />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
