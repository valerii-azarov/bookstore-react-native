import React, { useRef, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, SlideInLeft, SlideInRight } from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { Step, DirectionType } from "@/types";

import Button from "./Button";
import Typography from "./Typography";

interface FormStepperProps<T> {
  steps: Step<T>[];
  currentStep: number;
  direction: DirectionType;
  stepStatus: {
    isFirst: boolean;
    isLast: boolean;
    isSecondToLast: boolean;
  };
  onNext: () => void;
  onPrevious: () => void;
  form: T;
  buttonLabels?: {
    next?: string;
    previous?: string;
  };
  buttonProps?: {
    next?: { disabled?: boolean; loading?: boolean };
    previous?: { disabled?: boolean };
  };
  containerStyle?: object;
  buttonContainerStyle?: object;
}

const FormStepper = <T,>({
  steps,
  currentStep,
  direction,
  stepStatus,
  onNext,
  onPrevious,
  form,
  buttonLabels = { next: "Next", previous: "Previous" },
  buttonProps = {},
  containerStyle,
  buttonContainerStyle,
}: FormStepperProps<T>) => {
  const isFirstRender = useRef(true);

  const backWidth = useSharedValue(0);
  const nextWidth = useSharedValue(100);
  const backTextOpacity = useSharedValue(0);
  const nextTextOpacity = useSharedValue(1);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    const buttonWidth = stepStatus.isFirst || stepStatus.isLast ? [0, 100] : [50, 50];
    backWidth.value = withTiming(buttonWidth[0], { duration: 200 });
    nextWidth.value = withTiming(buttonWidth[1], { duration: 200 });

    backTextOpacity.value = withSequence(
      withTiming(buttonWidth[0] === 0 ? 0 : backTextOpacity.value, { duration: 100 }),
      withDelay(150, withTiming(!stepStatus.isFirst && !stepStatus.isLast ? 1 : 0, { duration: 100 }))
    );

    nextTextOpacity.value = withSequence(
      withTiming(buttonWidth[1] === 100 ? 0 : nextTextOpacity.value, { duration: 100 }),
      withDelay(150, withTiming(1, { duration: 100 }))
    );
  }, [currentStep]);

  const animatedStyles = {
    backButton: useAnimatedStyle(() => ({ width: `${backWidth.value}%` })),
    nextButton: useAnimatedStyle(() => ({ width: `${nextWidth.value}%` })),
    backText: useAnimatedStyle(() => ({ opacity: backTextOpacity.value })),
    nextText: useAnimatedStyle(() => ({ opacity: nextTextOpacity.value })),
  };

  const enteringAnimation = direction === "forward" ? SlideInRight : SlideInLeft;

  const Wrapper = steps[currentStep].scrollEnabled ? ScrollView : View;
  
  return (
    <View style={[styles.container, containerStyle]}>
      <Wrapper
        {...(steps[currentStep].scrollEnabled
          ? {
              contentContainerStyle: styles.scrollViewContent,
              keyboardShouldPersistTaps: "handled",
            }
          : {
              style: [
                styles.content,
                stepStatus.isLast && { justifyContent: "center" },
              ],
            })
        }
      >
        {!steps[currentStep].hideTitle && steps[currentStep].title && (
          <View style={styles.titleContainer}>
            <Typography fontSize={18} fontWeight="bold" style={styles.title}>
              {steps[currentStep].title}
            </Typography>
            
            {!steps[currentStep].hideStepCount && (
              <Typography fontSize={18} fontWeight="bold" color={colors.gray}>
                {` ${currentStep + 1}/${steps[currentStep].useFullStepCount ? steps.length : steps.length - 1}`}
              </Typography>
            )}
          </View>
        )}

        <Animated.View
          key={currentStep}
          entering={isFirstRender.current ? undefined : enteringAnimation.duration(300)}
        >
          {steps[currentStep].component}
        </Animated.View>
      </Wrapper>
      
      <View style={[styles.buttonContainer, !(stepStatus.isFirst || stepStatus.isLast) && { gap: 10 }, buttonContainerStyle]}>
        {!stepStatus.isFirst && (
          <Animated.View style={animatedStyles.backButton}>
            <Button 
              onPress={onPrevious}
              style={styles.buttonPrevious}
              disabled={buttonProps.previous?.disabled}
              accessibilityLabel={buttonLabels.previous}
            >
              <Animated.View style={animatedStyles.backText}>
                <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                  {buttonLabels.previous}
                </Typography>
              </Animated.View>
            </Button>
          </Animated.View>
        )}

        <Animated.View style={animatedStyles.nextButton}>
          <Button 
            onPress={onNext}
            disabled={
              buttonProps.next?.disabled || (steps[currentStep].validate ? !steps[currentStep].validate?.(form) : false)
            }
            loading={buttonProps.next?.loading}
            accessibilityLabel={buttonLabels.next}
          >
            <Animated.View style={animatedStyles.nextText}>
              <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                {buttonLabels.next}
              </Typography>
            </Animated.View>
          </Button>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayTint9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  title: {
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: colors.grayTint9,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonPrevious: {
    backgroundColor: colors.grayTint5,
  },
});

export default FormStepper;
