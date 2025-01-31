import React from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputProps, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import { hp } from "@/helpers/common";

type KeyboardType = 
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "decimal-pad"
  | "visible-password";

type AutoCapitalizeType = 
  | "none" 
  | "sentences" 
  | "words" 
  | "characters";

type TextContentTypeType = 
  | "none"
  | "familyName"
  | "givenName"
  | "emailAddress"
  | "password"
  | "username"
  | "telephoneNumber"
  | "oneTimeCode";

type ReturnKeyType = 
  | "done" 
  | "go" 
  | "next" 
  | "search" 
  | "send";

interface FieldProps extends TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  error?: string | null;
  iconName: keyof typeof Ionicons.glyphMap;
  fieldIconName?: keyof typeof Ionicons.glyphMap;
  onChangeText: (value: string) => void;
  onTogglePassword?: () => void;
  onPressField?: () => void;
  onSubmitEditing?: () => void;
  inputRef?: React.RefObject<TextInput>;
  keyboardType?: KeyboardType;
  autoCapitalize?: AutoCapitalizeType;
  autoCorrect?: boolean;
  textContentType?: TextContentTypeType;
  returnKeyType?: ReturnKeyType;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  isFieldEnabled?: boolean;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  hideError?: boolean;
  hideLabel?: boolean;
  hideFieldIfEmpty?: boolean;
}  

const Field = ({
  label,
  placeholder,
  value,
  error,
  iconName,
  fieldIconName,
  onChangeText,
  onTogglePassword,
  onPressField,
  onSubmitEditing,
  inputRef,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  textContentType = "none",
  returnKeyType = Platform.OS === "ios" ? "done" : "next",
  maxLength = 100,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  selectTextOnFocus = false,
  isPassword = false,
  isPasswordVisible = false,
  isFieldEnabled = false,
  hideError = false,
  hideLabel = false,
  hideFieldIfEmpty = false,
  ...rest
}: FieldProps) => {
  if (hideFieldIfEmpty && !value.trim()) return null;

  return (
    <View style={{ marginBottom: hp(1) }}>
      {!hideLabel && (
        <Text style={{ fontSize: hp(2), fontFamily: "Montserrat-Medium", color: COLORS.BLACK, marginBottom: 4, marginLeft: 10 }}>
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 16,
          backgroundColor: COLORS.WHITE,
          paddingHorizontal: 10,
          paddingVertical: Platform.OS === "ios" ? 10 : 4,
          borderColor: hideError || !error ? COLORS.GRAY_TINT_3 : COLORS.RED,
        }}
      >
        <Ionicons name={iconName} size={24} color={COLORS.GRAY_TINT_3} style={{ marginRight: 8 }} />

        <TextInput
          ref={inputRef}
          style={{
            flex: 1,
            fontSize: hp(2),
            fontFamily: "Montserrat-Medium",
            color: COLORS.BLACK,
            paddingVertical: 8,
            textAlignVertical: multiline ? "top" : "center",
          }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.GRAY_TINT_5}
          secureTextEntry={isPassword && !isPasswordVisible}
          returnKeyType={returnKeyType}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          textContentType={textContentType}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          keyboardAppearance={Platform.OS === "ios" ? "default" : undefined} 
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity 
            style={{ 
              backgroundColor: COLORS.GRAY_TINT_8,
              borderRadius: 12,
              padding: 4,
            }} 
            onPress={onTogglePassword}
          >
            <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color={COLORS.GRAY} />
          </TouchableOpacity>
        )}

        {isFieldEnabled && fieldIconName && (
          <TouchableOpacity 
            style={{ 
              backgroundColor: COLORS.GRAY_TINT_8,
              borderRadius: 12,
              padding: 4,
            }} 
            onPress={onPressField}
          >
            <Ionicons name={fieldIconName} size={24} color={COLORS.GRAY_TINT_2} />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={{
          fontSize: hp(1.5),
          fontFamily: "Montserrat-Medium",
          color: error && !hideError ? COLORS.RED : "transparent",
          minHeight: hp(2),
          marginLeft: 10,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {error || " "}
      </Text>
    </View>
  );
};

export default Field;
