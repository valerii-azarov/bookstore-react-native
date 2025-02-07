import { View, StyleSheet } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useSignUpFormContext } from "../contexts/SignUpForm";

import Typography from "@/components/Typography";

const Step3 = () => {
  const { t } = useLanguageContext();
  const { response } = useSignUpFormContext();
  
  const isSuccess = response?.status === "success";
  const errorMessage = response?.message;

  return (
    <Animated.View entering={SlideInRight.duration(300)} style={styles.container}>
      <View style={styles.messageContainer}> 
        <Typography fontSize={24} fontWeight="bold" style={styles.title}>
          {t(`screens.signUp.step3.${isSuccess ? "success" : "error"}Title`)} {isSuccess ? "🎉" : "❌"}
        </Typography>

        <Typography fontSize={16} fontWeight="medium" color={colors.gray} style={styles.subtitle}>
          {errorMessage || t(`screens.signUp.step3.${isSuccess ? "success" : "error"}Subtitle`)}
        </Typography>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creamTint9,
  },
  messageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center", 
  },
});

export default Step3;
