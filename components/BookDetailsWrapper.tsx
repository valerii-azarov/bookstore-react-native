import { ViewStyle, StyleProp, Platform } from "react-native";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";

import ScreenWrapper from "./ScreenWrapper";
import Header from "./Header";
import BackButton from "./BackButton";

interface BookDetailsWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  showHeader?: boolean;
}

const BookDetailsWrapper = ({ children, backgroundColor, style, showHeader = true }: BookDetailsWrapperProps) => {
  return (
    <ScreenWrapper 
      statusBarStyle="dark" 
      style={[
        style, 
        { 
          backgroundColor: backgroundColor || colors.grayTint8,
        }
      ]}
    >
      {showHeader && (
        <Header
          iconLeft={
            <BackButton 
              style={{ 
                backgroundColor: backgroundColor ? colorConverter.lighterHexColor(backgroundColor) : colors.grayTint4,
              }} 
            />
          }
          enableAbsolutePosition
          style={{ 
            paddingTop: Platform.OS === "android" ? 15 : 0,
            paddingHorizontal: 15, 
            backgroundColor: "transparent",
          }}
        />
      )} 
      {children}
    </ScreenWrapper>
  );
};

export default BookDetailsWrapper;
