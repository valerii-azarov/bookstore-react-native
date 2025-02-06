import { View, ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from "react-native";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/Language";
import { SignUpFormProvider } from "./contexts/SignUpForm";
import { useSignUpFormContext } from "./contexts/SignUpForm";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Typography from "@/components/Typography";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

const SignUpModal = () => {
  const { t } = useLanguageContext();
  const { currentStep, isIncomplete, handleNext } = useSignUpFormContext();

  const steps: Record<number, JSX.Element> = {
    0: <Step1 />,
    1: <Step2 />,
    2: <Step3 />,
  };

  const isLastStep = currentStep === Object.keys(steps).length - 1;
  const isDisabled = currentStep === 0 && isIncomplete;

  const handlePress = () => {
    if (isLastStep) {
      console.log("Finished sign-up process...");
    } else {
      handleNext();
    }
  };

  return (
    <ModalWrapper style={{ backgroundColor: colors.creamTint9 }}>
      <Header
        title={t("screens.signUp.header")}
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
          scrollEnabled={currentStep === 0}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {steps[currentStep] || steps[0]}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handlePress}
          style={styles.button}
          disabled={isDisabled}
        >
          <Typography fontSize={16} fontWeight="bold" color={colors.white}>
            {t(`screens.signUp.button${isLastStep ? "Finish" : "Continue"}`)}
          </Typography>
        </Button>
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
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
});

const SignUpContainer = () => {
  return (
    <SignUpFormProvider>
      <SignUpModal />
    </SignUpFormProvider>
  );
};

export default SignUpContainer;
