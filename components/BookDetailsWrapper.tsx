import { ViewStyle, StyleProp } from "react-native";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";

import ScreenWrapper from "./ScreenWrapper";
import Header from "./Header";
import BackButton from "./BackButton";

interface BookDetailsWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  enableHeader?: boolean;
}

const BookDetailsWrapper = ({ children, backgroundColor, style, enableHeader = true }: BookDetailsWrapperProps) => {
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
      {enableHeader && (
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
