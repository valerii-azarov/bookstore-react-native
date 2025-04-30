import { View, Linking, StyleSheet } from "react-native";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import { selectBook } from "@/selectors/bookSelectors";
import { colors } from "@/constants/theme";

import ModalTitleWrapper from "@/components/ModalTitleWrapper";
import Typography from "@/components/Typography";

const BookDescriptionModal = () => {
  const t = useTranslation();
  const book = useBookStore(selectBook);

  return (
    <ModalTitleWrapper
      title={t("modals.bookDescription.title")}
    >
      <View style={styles.section}>
        <Typography fontSize={16} fontWeight="medium" color={colors.black}>
          {book?.description}
        </Typography>
      </View>

      <View style={[styles.notice, { marginTop: 15 }]}>
        <Typography fontSize={16} fontWeight="bold" color={colors.black} style={styles.noticeTitle}>
          {t("modals.bookDescription.messages.notice.title")}
        </Typography>

        <Typography fontSize={14} fontWeight="medium" color={colors.blackTint1}>
          {t("modals.bookDescription.messages.notice.text")}{" "}
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

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
  },
  notice: {
    backgroundColor: colors.orangeTint8,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  noticeTitle: {
    marginBottom: 5,
  },
});

export default BookDescriptionModal;
