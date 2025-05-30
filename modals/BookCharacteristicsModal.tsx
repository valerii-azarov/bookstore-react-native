import { View, Linking } from "react-native";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import { selectCurrentBook } from "@/selectors/bookSelectors";
import { colors } from "@/constants/theme";

import ModalTitleWrapper from "@/components/ModalTitleWrapper";
import Typography from "@/components/Typography";

interface ParameterItem {
  key: string;
  label: string;
  value: string;
}

const BookCharacteristicsModal = () => {
  const t = useTranslation();
  const currentBook = useBookStore(selectCurrentBook);

  const fields: ParameterItem[] = [
    {
      key: "pageCount",
      label: t("common.parameters.pageCount.label"),
      value: currentBook?.pageCount?.toString() || "-",
    },
    {
      key: "publisher",
      label: t("common.parameters.publisher.label"),
      value: currentBook?.publisher || "-",
    },
    {
      key: "coverType",
      label: t("common.parameters.coverType.label"),
      value: currentBook?.coverType ? t(`common.coverTypes.${currentBook.coverType}`) : "-",
    },
    {
      key: "publicationYear",
      label: t("common.parameters.publicationYear.label"),
      value: currentBook?.publicationYear?.toString() || "-",
    },
    {
      key: "language",
      label: t("common.parameters.language.label"),
      value: currentBook?.language ? t(`common.languages.${currentBook.language}`) : "-",
    },
    {
      key: "size",
      label: t("common.parameters.size.label"),
      value: currentBook?.size || "-",
    },
    {
      key: "weight",
      label: t("common.parameters.weight.label"),
      value: currentBook?.weight?.toString() || "-",
    },
    {
      key: "illustrations",
      label: t("common.parameters.illustrations.label"),
      value: t(`common.parameters.illustrations.values.${currentBook?.illustrations ? "contains" : "notContains"}`),
    },
    {
      key: "bookType",
      label: t("common.parameters.bookType.label"),
      value: currentBook?.bookType ? t(`common.bookTypes.${currentBook.bookType}`) : "-",
    },
    {
      key: "paperType",
      label: t("common.parameters.paperType.label"),
      value: currentBook?.paperType ? t(`common.paperTypes.${currentBook.paperType}`) : "-",
    },
    {
      key: "isbn",
      label: t("common.parameters.isbn.label"),
      value: currentBook?.isbn || "-",
    },
    {
      key: "sku",
      label: t("common.parameters.sku.label"),
      value: currentBook?.sku || "-",
    },     
  ];
  
  return (
    <ModalTitleWrapper
      title={t("modals.bookCharacteristics.header.title")}
    >
      <View 
        style={{
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 15,
        }}
      >
        {fields.map((field, index) => (
          <View key={index}>
            <View 
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {field.label}
              </Typography>

              <Typography
                fontSize={16}
                fontWeight="bold"
                color={colors.black}
                numberOfLines={1}
              >
                {field.value}
              </Typography>
            </View>

            {index < fields.length - 1 && (
              <View
                style={{
                  height: 1.5,
                  backgroundColor: colors.grayTint5,
                  marginVertical: 15,
                  opacity: 0.3,
                }}
              />
            )}
          </View>
        ))}
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
          {t("modals.bookCharacteristics.reportIssue.title")}
        </Typography>

        <Typography fontSize={14} fontWeight="medium" color={colors.blackTint1}>
          {t("modals.bookCharacteristics.reportIssue.subtitle")}{" "}
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

export default BookCharacteristicsModal;
