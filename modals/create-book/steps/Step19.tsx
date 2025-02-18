import { StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useCreateBookFormContext } from "../contexts/CreateBookForm";

import Step from "../components/Step";
import Typography from "@/components/Typography";

const Step19 = () => {
  const { t } = useLanguageContext();
  const { response } = useCreateBookFormContext();
  
  return (
    <Step style={styles.container}>
      <Typography fontSize={24} fontWeight="bold" style={styles.title}>
        {t(`modals.createBook.step19.${response?.status || "error"}Title`)} {response?.status === "error" && "❌"}
      </Typography>

      <Typography fontSize={16} fontWeight="medium" color={colors.gray} style={styles.subtitle}>
        {response?.message || t(`modals.createBook.step19.${response?.status || "error"}Subtitle`)}
      </Typography>
    </Step>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default Step19;
