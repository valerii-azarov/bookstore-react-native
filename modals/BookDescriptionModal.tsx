import { View, Linking } from "react-native";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import { selectCurrentBook } from "@/selectors/bookSelectors";
import { colors } from "@/constants/theme";

import ModalTitleWrapper from "@/components/ModalTitleWrapper";
import Typography from "@/components/Typography";

const BookDescriptionModal = () => {
  const t = useTranslation();
  const currentBook = useBookStore(selectCurrentBook);

  return (
    <ModalTitleWrapper
      title={t("modals.bookDescription.header.title")}
    >
      <View 
        style={{
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 15,
        }}
      >
        <Typography fontSize={16} fontWeight="medium" color={colors.black}>
          {currentBook?.description}
        </Typography>
      </View>

      <View 
        style={{ 
          backgroundColor: colors.orangeTint8,
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          marginTop: 15,
        }}
      >
        <Typography 
          fontSize={16} 
          fontWeight="bold" 
          color={colors.black} 
          style={{ marginBottom: 5 }}
        >
          {t("modals.bookDescription.reportIssue.title")}
        </Typography>

        <Typography fontSize={14} fontWeight="medium" color={colors.blackTint1}>
          {t("modals.bookDescription.reportIssue.subtitle")}{" "}
          <Typography
            fontSize={14}
            fontWeight="bold"
            color={colors.blackTint1}
            style={{ textDecorationLine: "underline" }}
            onPress={() => Linking.openURL("mailto:support@knigarnya.com")}
          >
            support@knigarnya.com
          </Typography>
        </Typography>
      </View>
    </ModalTitleWrapper>
  );
};

export default BookDescriptionModal;
