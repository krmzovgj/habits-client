import { Colors } from "@/constants/theme";
import React, { ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  icon?: ReactNode; // optional right-side icon
} & TextInputProps;

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoFocus,
  icon,
  ...rest
}) => {
  return (
    <View>
      <Text
        style={{
          marginLeft: 6,
          marginBottom: 6,
          fontFamily: "onest",
          fontWeight: "500",
          fontSize: 16,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 2,
          borderColor: Colors.text,
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 4,
        }}
      >
        <TextInput
          {...rest}
          selectionColor={Colors.text}
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={{
            flex: 1,
            fontFamily: "onest",
            fontWeight: "500",
            fontSize: 14,
            paddingVertical: 12,
          }}
        />

        {icon && <View style={{ left: 0 }}>{icon}</View>}
      </View>
    </View>
  );
};

export default Input;
