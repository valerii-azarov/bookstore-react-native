import React, { forwardRef } from "react";
import { 
  ViewStyle, 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleProp, 
  StyleSheet, 
} from "react-native";
import { colors } from "@/constants/theme";
import { SizeType } from "@/types";

type FloatingButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  icon: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  size?: SizeType;
};

type ButtonRef = React.ComponentRef<typeof TouchableOpacity>;

const FloatingButton = forwardRef<ButtonRef, FloatingButtonProps>(
  (
    {
      onPress, 
      icon, 
      style, 
      size = "medium", 
      ...props 
    }, 
    ref
  ) => {
    const buttonSize: Record<SizeType, number> = {
      small: 45,
      medium: 55,
      large: 65,
    };
    
    const adjustedSize = buttonSize[size];

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[
          styles.button,
          {
            width: adjustedSize,
            height: adjustedSize,
          },
          style,
        ]}
        {...props}
      >
        {icon}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    borderColor: colors.orangeTint8,
    borderRadius: 30,
    borderWidth: 1,
    position: "absolute",
    bottom: 15,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingButton;
