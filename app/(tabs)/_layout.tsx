import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger
                name="index"
                 options={{
                    labelStyle: {
                        fontFamily: "onest",
                        fontSize: 11,
                        fontWeight: "500"
                    },
                    iconColor: "#000",
                }}
            >
                <Label>Home</Label>
                <Icon sf='house.fill'  />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger
                options={{
                    labelStyle: {
                        fontFamily: "onest",
                        fontSize: 11,
                        fontWeight: "500"
                    },
                    iconColor: "#000",
                }}
                name="profile"
            >
                <Icon sf="person.crop.circle.fill" />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
