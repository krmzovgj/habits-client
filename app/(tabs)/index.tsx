import { AddSquare, NotificationBing } from "iconsax-react-nativejs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";
import { Colors } from "@/constants/theme";

const Habits = () => {
    return (
        <SafeAreaView style={{ padding: 10, paddingHorizontal: 20, flex: 1 }}>
            <Header
                title="Habits"
                headerRight={
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 10,
                            display: "flex",
                        }}
                    >
                        <AddSquare
                            variant="Bold"
                            size={25}
                            color={Colors.text}
                        />
                        <NotificationBing
                            variant="Bold"
                            size={25}
                            color={Colors.text}
                        />
                    </View>
                }
            />
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={styles.text}>Habits</Text>
            </View>
        </SafeAreaView>
    );
};

export default Habits;

const styles = StyleSheet.create({
    text: {
        fontFamily: "onest",
        fontWeight: 500,
    },
});
