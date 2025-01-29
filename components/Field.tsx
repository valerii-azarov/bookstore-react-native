import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { wp, hp } from "@/helpers/common";
import COLORS from "@/constants/colors";

type KeyboardType =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "decimal-pad"
  | "visible-password";

interface FieldProps {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  fieldIconName?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onTogglePassword?: () => void;
  onPressField?: () => void;
  onSubmitEditing?: () => void;
  inputRef?: React.RefObject<TextInput>;
  keyboardType?: KeyboardType;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  isFieldEnabled?: boolean;
  hideError?: boolean;
  hideLabel?: boolean;
  hideFieldIfEmpty?: boolean;
}

const Field = ({
  label,
  iconName,
  fieldIconName,
  placeholder,
  value,
  error,
  onChange,
  onTogglePassword,
  onPressField,
  onSubmitEditing,
  inputRef,
  keyboardType = "default",
  isPassword = false,
  isPasswordVisible = false,
  isFieldEnabled = false,
  hideError = false,
  hideLabel = false,
  hideFieldIfEmpty = false,
}: FieldProps) => {
  return (
    <View style={styles.container}>
      {!hideLabel && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          { borderColor: hideError || !error ? COLORS.GRAY : COLORS.RED },
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={24} color={COLORS.GRAY} />
        </View>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.GRAY}
          secureTextEntry={isPassword && !isPasswordVisible}
          returnKeyType={isPassword ? "done" : "next"}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={onTogglePassword}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={COLORS.GRAY_DARK}
            />
          </TouchableOpacity>
        )}
        {isFieldEnabled && !(hideFieldIfEmpty && value.trim() === "") && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={onPressField}
          >
            <Ionicons
              name={fieldIconName}
              size={24}
              color={COLORS.GRAY_DARK}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.errorContainer}>
        {!hideError && error && (
          <Text style={styles.errorText} numberOfLines={1} ellipsizeMode="tail">
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
  },
  label: {
    fontSize: hp(2),
    fontFamily: "Montserrat-Medium",
    color: "black",
    marginBottom: 4,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: COLORS.WHITE,
    padding: 8,
    width: "100%",
  },
  iconContainer: {
    padding: 4,
  },
  textInput: {
    flex: 1,
    fontSize: hp(2),
    fontFamily: "Montserrat-Medium",
    color: COLORS.BLACK,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  toggleButton: {
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 12,
    padding: 4,
  },
  errorContainer: {
    height: hp(2),
    marginTop: 4,
    marginLeft: 10,
  },
  errorText: {
    fontSize: hp(1.5),
    fontFamily: "Montserrat-Medium",
    color: COLORS.RED,
    maxWidth: "90%",
  },
});

export default Field;
