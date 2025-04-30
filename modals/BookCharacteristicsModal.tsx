import { View, Linking, StyleSheet } from "react-native";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import { selectBook } from "@/selectors/bookSelectors";
import { colors } from "@/constants/theme";

import ModalTitleWrapper from "@/components/ModalTitleWrapper";
import Typography from "@/components/Typography";

const BookCharacteristicsModal = () => {
  const t = useTranslation();
  const book = useBookStore(selectBook);
  
  return (
    <ModalTitleWrapper
      title={t("modals.bookCharacteristics.title")}
    >
      <View style={styles.section}>
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.pageCount")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={2}
          >
            {book?.pageCount || "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />

        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.publisher")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.publisher || "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />

        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.coverType")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.coverType ? t(`coverTypes.${book.coverType}`) : "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.publicationYear")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.publicationYear || "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.language")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.language ? t(`languages.${book.language}`) : "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.size")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.size || "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.weight")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.weight || "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.illustrations")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.illustrations ? t(`modals.bookCharacteristics.values.illustrations.${book.illustrations ? "contains" : "notContains"}`) : "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.bookType")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.bookType ? t(`bookTypes.${book.bookType}`) : "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.paperType")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.paperType ? t(`paperTypes.${book.paperType}`) : "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.isbn")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.isbn || "-"}
          </Typography>
        </View>

        <View
          style={[
            styles.divider,
            {
              marginVertical: 15,
            },
          ]}
        />
        
        <View style={styles.parameterColumn}>
          <Typography
            fontSize={14}
            fontWeight="medium"
            color={colors.gray}
            numberOfLines={1}
            style={{ marginBottom: 2.5 }}
          >
            {t("modals.bookCharacteristics.labels.sku")}
          </Typography>

          <Typography
            fontSize={16}
            fontWeight="bold"
            color={colors.black}
            numberOfLines={1}
          >
            {book?.sku || "-"}
          </Typography>
        </View>
      </View>

      <View style={[styles.notice, { marginTop: 15 }]}>
        <Typography fontSize={16} fontWeight="bold" color={colors.black} style={styles.noticeTitle}>
          {t("modals.bookCharacteristics.messages.notice.title")}
        </Typography>

        <Typography fontSize={14} fontWeight="medium" color={colors.blackTint1}>
          {t("modals.bookCharacteristics.messages.notice.text")}{" "}
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
  parameterColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.grayTint5,
    opacity: 0.3,
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

export default BookCharacteristicsModal;
