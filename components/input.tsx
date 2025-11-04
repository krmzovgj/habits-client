import { Colors } from "@/constants/theme";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
} & TextInputProps; // allows passing native TextInput props like keyboardType, secureTextEntry, etc.

const Input: React.FC<InputProps> = ({ label, value, onChangeText, placeholder, secureTextEntry, autoFocus, ...rest }) => {
    return (
        <View>
            <Text style={{marginLeft: 6, marginBottom: 6, fontFamily: "onest", fontWeight: 500, fontSize: 16}}>{label}</Text>
            <TextInput selectionColor={Colors.text} autoFocus={autoFocus} secureTextEntry={secureTextEntry} placeholder={placeholder} value={value} onChangeText={onChangeText} style={{paddingHorizontal: 20, fontFamily: "onest", fontWeight: 500, paddingVertical: 16, borderRadius: 20, borderWidth: 2, borderColor: Colors.text, fontSize: 14 }} />
        </View>
    );
};

export default Input;
