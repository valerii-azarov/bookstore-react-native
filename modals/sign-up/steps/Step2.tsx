import { View, StyleSheet } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { useTranslation } from "@/contexts/translateContext";

import Typography from "@/components/Typography";

const Step2 = () => {
  const t = useTranslation();

  return (
    <Animated.View entering={SlideInRight.duration(300)} style={styles.container}>
      <View style={styles.titleContainer}>
        <Typography fontSize={18} fontWeight="bold">
          {t("screens.signUp.step2.title")}
        </Typography>
      </View>

      <View style={styles.notificationContainer}> 
        <Typography fontSize={18} fontWeight="bold" style={styles.title}>
          {t("screens.signUp.step2.notificationTitle")} 🏗️
        </Typography>

        <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
          {t("screens.signUp.step2.notificationSubtitle")}
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
  titleContainer: {
    marginBottom: 15,
  },
  notificationContainer: {
    backgroundColor: colors.orangeTint8,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    marginBottom: 5,
  },
});

export default Step2;
