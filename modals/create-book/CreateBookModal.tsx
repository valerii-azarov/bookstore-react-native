import React, { useEffect, useMemo } from "react";
import { useRouter } from "expo-router";
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withDelay, withTiming } from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { CreateBookFormProvider } from "./contexts/CreateBookForm";
import { useCreateBookFormContext } from "./contexts/CreateBookForm";
import { validationRules } from "./validations/validationRules";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Typography from "@/components/Typography";

import { steps } from "./steps";

const CreateBookModal = () => {
  const { t } = useLanguageContext();
  const { form, isLoading, response, currentStep, submit, nextStep, prevStep } = useCreateBookFormContext();
  const router = useRouter();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isSecondToLastStep = currentStep === steps.length - 2;
  const isError = response?.status === "error";

  const backWidth = useSharedValue(0);
  const continueWidth = useSharedValue(100);
  const backTextOpacity = useSharedValue(0);
  const continueTextOpacity = useSharedValue(1);

  const handlePrev = () => {
    prevStep();
  };

  const handleNext = () => {
    if (isLastStep) {
      return isError ? router.back() : router.dismiss();
    }
    
    isSecondToLastStep ? submit() : nextStep();
  };  

  useEffect(() => {
    const buttonWidth = isFirstStep || isLastStep ? [0, 100] : [50, 50];

    backWidth.value = withTiming(buttonWidth[0], { duration: 200 });
    continueWidth.value = withTiming(buttonWidth[1], { duration: 200 });

    backTextOpacity.value = withSequence(
      withTiming(buttonWidth[0] === 0 ? 0 : backTextOpacity.value, {
        duration: 100,
      }),
      withDelay(
        150,
        withTiming(!isFirstStep && !isLastStep ? 1 : 0, { duration: 100 })
      )
    );

    continueTextOpacity.value = withSequence(
      withTiming(buttonWidth[1] === 100 ? 0 : continueTextOpacity.value, {
        duration: 100,
      }),
      withDelay(
        150,
        withTiming(1, { duration: 100 })
      )
    );
  }, [currentStep]);

  const animatedStyles = {
    backButton: useAnimatedStyle(() => ({
      width: `${backWidth.value}%`
    })),
    continueButton: useAnimatedStyle(() => ({
      width: `${continueWidth.value}%`,
    })),
    backText: useAnimatedStyle(() => ({
      opacity: backTextOpacity.value
    })),
    continueText: useAnimatedStyle(() => ({
      opacity: continueTextOpacity.value,
    })),
  };

  const isNextStepDisabled = useMemo(() => (
    validationRules[currentStep] || []).some(rule => !rule(form)
  ), [form, currentStep]);

  const CurrentStep = steps[currentStep] || steps[0];

  return (
    <ModalWrapper style={{ backgroundColor: colors.creamTint9 }}>
      <Header
        title={t("modals.createBook.header")}
        iconLeft={
          <BackButton style={{ backgroundColor: colors.orangeTint5 }} />
        }
        style={styles.headerContainer}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContainer}
        >
          <CurrentStep />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <Animated.View style={animatedStyles.backButton}>
          <Button
            onPress={handlePrev}
            style={{ backgroundColor: colors.grayTint5 }}
          >
            <Animated.View style={animatedStyles.backText}>
              <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                {t("modals.createBook.buttonBack")}
              </Typography>
            </Animated.View>
          </Button>
        </Animated.View>

        <Animated.View style={animatedStyles.continueButton}>
          <Button
            onPress={handleNext}
            loading={isLoading}
            disabled={isNextStepDisabled}
          >
            <Animated.View style={animatedStyles.continueText}>
              <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                {t(`modals.createBook.button${isError ? "Exit" : isSecondToLastStep ? "Create" : isLastStep ? "Complete" : "Continue"}`)}
              </Typography>
            </Animated.View>
          </Button>
        </Animated.View>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    gap: 10,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default () => (
  <CreateBookFormProvider>
    <CreateBookModal />
  </CreateBookFormProvider>
);
