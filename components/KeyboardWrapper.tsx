import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, ViewStyle } from "react-native";

interface KeyboardWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const KeyboardWrapper = ({ children, style }: KeyboardWrapperProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[styles.keyboardAvoidingView, style]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default KeyboardWrapper;
