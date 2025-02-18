import React from "react";
import { ViewStyle, StyleSheet } from "react-native";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";
import { steps } from "../steps";

import Typography from "@/components/Typography";

const Step = ({ children, style }: { children: React.ReactNode,  style?: ViewStyle }) => {
  const { t } = useLanguageContext();
  const { direction, currentStep } = useCreateBookFormContext();
  
  const totalSteps = steps.length;

  const stepNumber = currentStep + 1;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const defaultAnimation = isFirstStep && direction !== "backward";
  const forwardAnimation = direction === "forward" ? SlideInRight.duration(300) : undefined;
  const backwardAnimation = direction === "backward" ? SlideInLeft.duration(300) : undefined;

  return (
    <Animated.View 
      entering={defaultAnimation ? undefined : forwardAnimation || backwardAnimation} 
      style={[
        styles.container,
        style,
      ]}
    >
      {!isLastStep && (  
        <Typography fontSize={18} fontWeight="bold" style={styles.title}>
          {t(`modals.createBook.step${stepNumber}.title`)}{" "}
          <Typography fontSize={18} fontWeight="bold" style={{ color: colors.gray }}>
            {`${stepNumber}/${totalSteps - 1}`}
          </Typography>
        </Typography>
      )}

      {!isLastStep && (
        <Typography fontSize={14} color={colors.gray} style={styles.subtitle}>
          {t(`modals.createBook.step${stepNumber}.hint`)}
        </Typography>
      )}

      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamTint9,
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 5,
  },
});

export default Step;
