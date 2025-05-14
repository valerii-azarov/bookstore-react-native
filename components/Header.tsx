import React from "react";
import { 
  View, 
  ViewStyle, 
  TextStyle, 
  StyleSheet, 
  StyleProp, 
} from "react-native";

import Typography from "./Typography";

type HeaderProps = {
  title?: string;
  titleSize?: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
};

const Header = ({
  title = "",
  titleSize = 22,
  iconLeft,
  iconRight,
  style,
  titleStyle,
}: HeaderProps) => {
  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        {iconLeft}
      </View>

      <View style={styles.titleContainer}>
        {title && (
          <Typography
            fontSize={titleSize}
            fontWeight="bold"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.title,
              titleStyle,
            ]}
          >
            {title}
          </Typography>
        )}
      </View>

      <View style={styles.iconContainer}>
        {iconRight}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  iconContainer: {
    minWidth: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
});

export default Header;
