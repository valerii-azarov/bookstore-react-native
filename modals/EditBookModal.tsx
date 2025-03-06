import React, { useState, useMemo } from "react";
import { View, Alert, TouchableWithoutFeedback, ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useBook } from "@/hooks/useBook";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";
import { genresKeys, languageKeys, coverTypeKeys, bookTypeKeys, paperTypeKeys } from "@/constants/book";
import { BookPricing, BookFieldType, BookSelectFieldType, EditableBookFields, EditableBookField, EditableBookValueType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import ColorChanger from "@/components/ColorChanger";
import Typography from "@/components/Typography";

import BookField from "@/components/BookField";
import BookImagesField from "@/components/BookImagesField";
import BookPricingField from "@/components/BookPricingField";
import BookSelectField from "@/components/BookSelectField";
import BookTagsField from "@/components/BookTagsField";
import BookTextareaField from "@/components/BookTextareaField";
import BookCheckboxField from "@/components/BookCheckboxField";

const EditBookModal = () => {
  const { t } = useLanguageContext();
  const { field, data } = useLocalSearchParams<{ field?: string; data?: string }>();
  const router = useRouter();

  const bookData = data ? JSON.parse(data) : null;
  const typedField = field as EditableBookField | undefined;
  
  const { isUpdating, updateBook } = useBook(bookData.id);

  const initialValue = bookData && typedField ? bookData[typedField] : null;
  const [editedValue, setEditedValue] = useState<EditableBookValueType>(initialValue);  
  
  const createTextField = ({ field, value }: BookFieldType) => ({
    component: (
      <BookField
        field={field}
        initialValue={value?.toString() || ""}
        onChange={(newValue) => setEditedValue(newValue)}
        isLabelColorWhite
        isEditing
      />
    ),
  });

  const createNumericField = ({ field, value, props }: BookFieldType) => ({
    component: (
      <BookField
        field={field}
        initialValue={value?.toString() || ""}
        onChange={(newValue) => setEditedValue(newValue ? Number(newValue) : 0)}
        isLabelColorWhite
        isEditing
        {...props}
      />
    ),
  });

  const createSingleSelectField = ({ field, options, value }: BookSelectFieldType) => ({
    component: (
      <BookSelectField
        field={field}
        type="single"
        options={options}
        initialValue={typeof value === "string" ? value : ""}
        onChange={(newValue) => setEditedValue(newValue)}
        isLabelColorWhite
        isEditing
      />
    )
  });
  
  const createMultipleSelectField = ({ field, options, value, props }: BookSelectFieldType) => ({
    component: (
      <BookSelectField
        field={field}
        type="multiple"
        options={options}
        initialValue={Array.isArray(value) ? value : []}
        onChange={(newValue) => setEditedValue(newValue)}
        isLabelColorWhite
        isEditing
        {...props}
      />
    )
  });
    
  const fields = useMemo<EditableBookFields>(() => {
    const textFields: EditableBookField[] = ["title", "publisher", "size", "isbn", "sku"];
    
    const numericFields: EditableBookField[] = ["pageCount", "publicationYear", "quantity"];
    const numericNonIntegerFields: EditableBookField[] = ["weight"];

    const singleSelectFields: BookSelectFieldType[] = [
      { 
        field: "language",
        options: languageKeys.map((key) => ({ label: t(`languages.${key}`), value: key })),
        value: bookData?.language || "",
      },
      { 
        field: "coverType",
        options: coverTypeKeys.map((key) => ({ label: t(`coverTypes.${key}`), value: key })),
        value: bookData?.coverType || "",
      },
      { 
        field: "bookType",
        options: bookTypeKeys.map((key) => ({ label: t(`bookTypes.${key}`), value: key })),
        value: bookData?.bookType || "",
      },
      { 
        field: "paperType",
        options: paperTypeKeys.map((key) => ({ label: t(`paperTypes.${key}`), value: key })),
        value: bookData?.paperType || "",
      },
    ];
    
    const multipleSelectFields: BookSelectFieldType[] = [
      { 
        field: "genres",
        options: genresKeys.map((key) => ({ label: t(`genres.${key}`), value: key })),
        value: bookData?.genres || [],
        props: { showSearch: true, showSelected: true },
      },
    ];    

    return {
      ...textFields.reduce((acc, field) => ({
        ...acc,
        [field]: createTextField({ field, value: bookData?.[field] }),
      }), {}),

      ...numericFields.reduce((acc, field) => ({
        ...acc,
        [field]: createNumericField({ field, value: bookData?.[field], props: { isNumeric: true, isInteger: true } }),
      }), {}),

      ...numericNonIntegerFields.reduce((acc, field) => ({
        ...acc,
        [field]: createNumericField({ field, value: bookData?.[field], props: { isNumeric: true } }),
      }), {}),

      ...singleSelectFields.reduce((acc, config) => ({
        ...acc,
        [config.field]: createSingleSelectField(config)
      }), {}),

      ...multipleSelectFields.reduce((acc, config) => ({
        ...acc,
        [config.field]: createMultipleSelectField(config)
      }), {}),

      backgroundColor: { 
        component: (
          <ColorChanger
            initialColor={bookData?.backgroundColor || colors.creamTint9}
            onColorChange={(hex) => setEditedValue(hex)}
          />
        )
      },

      images: { 
        component: (
          <BookImagesField
            initialValues={{
              coverImage: bookData?.coverImage || "",
              additionalImages: bookData?.additionalImages || [],
            }}
            onChange={(value) => setEditedValue(value)}
            isLabelColorWhite
            isBorderColorWhite
          />
        )
      },

      pricing: { 
        component: (
          <BookPricingField
            initialValues={{
              price: bookData?.price || 0,
              originalPrice: bookData?.originalPrice || 0,
              discount: bookData?.discount || 0,
            }}
            onPriceChange={(values) => setEditedValue(values)}
            isLabelColorWhite
          />
        )
      },

      authors: { 
        component: (
          <BookTagsField
            field="authors"
            initialValue={bookData?.authors || []}
            onChange={(value) => setEditedValue(value)}
            isLabelColorWhite
            isEditing
          />
        )
      },

      description: { 
        component: (
          <BookTextareaField
            field="description"
            initialValue={bookData?.description || ""}
            onChange={(value) => setEditedValue(value)}
            isLabelColorWhite
            isEditing
          />
        )
      },

      illustrations: { 
        component: (
          <BookCheckboxField
            field="illustrations"
            initialValue={bookData?.illustrations || false}
            onChange={(value) => setEditedValue(value)}
            checkboxColor={bookData?.backgroundColor}
            isCheckboxColorDarker
            isLabelColorWhite
          />
        )
      },
    };
  }, [t, bookData]);
  
  const handleSave = () => {
    if (!typedField) return;
  
    updateBook(typedField, editedValue)
      .then(() => {
        setTimeout(() => {
          router.back();
        }, 500);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to save changes.");
      });
  };  

  const isValueChanged = useMemo(() => {
    if (initialValue === editedValue) return false;

    if (typedField === "pricing" && initialValue && editedValue) {
      const { price, originalPrice, discount } = initialValue as BookPricing;
      const { price: newPrice, originalPrice: newOriginalPrice, discount: newDiscount } = editedValue as BookPricing;

      return (
        price !== newPrice ||
        originalPrice !== newOriginalPrice ||
        discount !== newDiscount
      );
    }

    if (Array.isArray(initialValue) && Array.isArray(editedValue)) {
      return (
        initialValue.length !== editedValue.length ||
        !initialValue.every((item, index) => item === editedValue[index])
      );
    }

    return initialValue !== editedValue;
  }, [initialValue, editedValue, typedField]);

  return (
    <ModalWrapper style={{ backgroundColor: bookData.backgroundColor || colors.creamTint9 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Header
            title={t(`modals.editBook.header.${field}`)}
            iconLeft={
              <BackButton
                style={{
                  backgroundColor: bookData.backgroundColor
                    ? colorConverter.lighterHexColor(bookData.backgroundColor)
                    : colors.grayTint4,
                }}
              />
            }
            style={styles.header}
            titleStyle={styles.headerTitle}
          />

          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollViewContent}
          >
            {typedField && fields[typedField]?.component}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleSave}
              style={{
                backgroundColor: isValueChanged
                  ? bookData.backgroundColor
                    ? colorConverter.darkerHexColor(bookData.backgroundColor)
                    : colors.gray
                  : colors.grayTint4,
              }}
              loading={isUpdating}
              disabled={!isValueChanged}
            >
              <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                {t("modals.editBook.buttons.save.text")}
              </Typography>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  headerTitle: {
    color: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  buttonContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});

export default EditBookModal;
