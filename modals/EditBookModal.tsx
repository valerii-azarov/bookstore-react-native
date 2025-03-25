import React, { useState, useMemo } from "react";
import { View, Alert, TouchableWithoutFeedback, ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "@/contexts/translateContext";
import { useBooksStore } from "@/stores/booksStore";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";
import { genresKeys, languageKeys, coverTypeKeys, bookTypeKeys, paperTypeKeys } from "@/constants/book";
import { BookPricing, EditableBookFields, EditableBookField, EditableBookValueType } from "@/types";

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
  const router = useRouter();
  const { field, data } = useLocalSearchParams<{ field?: string; data?: string }>();
    
  const t = useTranslation();

  const { bookId, bookStatus, updateBook } = useBooksStore();
  
  const bookData = data ? JSON.parse(data) : null;
  const typedField = field as EditableBookField | undefined;
  
  const initialValue = bookData && typedField ? bookData[typedField] : null;
  const [editedValue, setEditedValue] = useState<EditableBookValueType>(initialValue);  
      
  const fields = useMemo<EditableBookFields>(() => {
    const textFields: EditableBookField[] = ["title", "publisher", "size", "isbn", "sku"];
    const numericFields: EditableBookField[] = ["pageCount", "publicationYear", "quantity"];
    const numericNonIntegerFields: EditableBookField[] = ["weight"];

    return {
      ...textFields.reduce((acc, field) => ({
        ...acc,
        [field]: {
          component: (
            <BookField
              field={field}
              initialValue={bookData?.[field]?.toString() || ""}
              onChange={(newValue) => setEditedValue(newValue)}
              isLabelColorWhite
              isEditing
            />
          )
        }
      }), {}),

      ...numericFields.reduce((acc, field) => ({
        ...acc,
        [field]: {
          component: (
            <BookField
              field={field}
              initialValue={bookData?.[field]?.toString() || ""}
              onChange={(newValue) => setEditedValue(newValue ? Number(newValue) : 0)}
              isLabelColorWhite
              isEditing
              isNumeric
              isInteger
            />
          )
        }
      }), {}),

      ...numericNonIntegerFields.reduce((acc, field) => ({
        ...acc,
        [field]: {
          component: (
            <BookField
              field={field}
              initialValue={bookData?.[field]?.toString() || ""}
              onChange={(newValue) => setEditedValue(newValue ? Number(newValue) : 0)}
              isLabelColorWhite
              isEditing
              isNumeric
            />
          )
        }
      }), {}),

      language: {
        component: (
          <BookSelectField
            field="language"
            type="single"
            options={languageKeys.map((key) => ({ label: t(`languages.${key}`), value: key }))}
            initialValue={bookData?.language || ""}
            onChange={(newValue) => setEditedValue(newValue)}
            isLabelColorWhite
            isEditing
          />
        )
      },

      coverType: {
        component: (
          <BookSelectField
            field="coverType"
            type="single"
            options={coverTypeKeys.map((key) => ({ label: t(`coverTypes.${key}`), value: key }))}
            initialValue={bookData?.coverType || ""}
            onChange={(newValue) => setEditedValue(newValue)}
            isLabelColorWhite
            isEditing
          />
        )
      },

      bookType: {
        component: (
          <BookSelectField
            field="bookType"
            type="single"
            options={bookTypeKeys.map((key) => ({ label: t(`bookTypes.${key}`), value: key }))}
            initialValue={bookData?.bookType || ""}
            onChange={(newValue) => setEditedValue(newValue)}
            isLabelColorWhite
            isEditing
          />
        )
      },

      paperType: {
        component: (
          <BookSelectField
            field="paperType"
            type="single"
            options={paperTypeKeys.map((key) => ({ label: t(`paperTypes.${key}`), value: key }))}
            initialValue={bookData?.paperType || ""}
            onChange={(newValue) => setEditedValue(newValue)}
            isLabelColorWhite
            isEditing
          />
        )
      },

      genres: {
        component: (
          <BookSelectField
            field="genres"
            type="multiple"
            options={genresKeys.map((key) => ({ label: t(`genres.${key}`), value: key }))}
            initialValue={bookData?.genres || []}
            onChange={(newValue) => setEditedValue(newValue)}
            isLabelColorWhite
            isEditing
            showSearch
            showSelected
          />
        )
      },

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
    if (!bookId || !typedField) return;

    updateBook(bookId, typedField, editedValue)
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
              loading={bookStatus === "updating"}
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
