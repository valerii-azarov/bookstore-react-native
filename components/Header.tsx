import React from "react";
import { View, ViewStyle, TextStyle, StyleSheet } from "react-native";

import Typography from "./Typography";

type HeaderProps = {
  title?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
};

const Header = ({ title = "", iconLeft, iconRight, style, titleStyle }: HeaderProps) => {
  return (
    <View 
      style={[
        styles.container,
        style
      ]
    }>
      {iconLeft && <View style={styles.icon}>{iconLeft}</View>}

      {title && (
        <Typography 
          fontSize={22} 
          fontWeight="bold" 
          style={[
            styles.title, 
            titleStyle
          ]}
        >
          {title}
        </Typography>
      )}
      
      {iconRight && <View style={styles.icon}>{iconRight}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: 0,
  },
  icon: {
    alignItems: "center",
    zIndex: 5,
  },
});

export default Header;
