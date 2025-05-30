import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ViewStyle,
  Platform,
} from "react-native";

type KeyboardWrapperProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const KeyboardWrapper = ({ children, style }: KeyboardWrapperProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ flex: 1 }, style]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;
