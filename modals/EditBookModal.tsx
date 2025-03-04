import React, { useState, useMemo, } from "react";
import { View, Alert, TouchableWithoutFeedback, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useBook } from "@/hooks/useBook";
import { useMemoizedOptions } from "@/hooks/useMemoizedOptions";
import { colors } from "@/constants/theme";
import { converter } from "@/helpers/converter";
import { colorConverter } from "@/helpers/colorConverter";
import { genresKeys, languageKeys, coverTypeKeys, bookTypeKeys, paperTypeKeys } from "@/constants/book";
import { BookPriceType, EditBookFieldType, EditBookValueType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import ColorChanger from "@/components/ColorChanger";
import Typography from "@/components/Typography";

import BookField from "@/components/BookField";
import BookImages from "@/components/BookImages";
import BookPricing from "@/components/BookPricing";
import BookSelectField from "@/components/BookSelectField";
import BookTagsField from "@/components/BookTagsField";
import BookTextareaField from "@/components/BookTextareaField";
import BookCheckboxField from "@/components/BookCheckboxField";

const EditBookModal = () => {
  const { t } = useLanguageContext();
  const { field, data } = useLocalSearchParams<{ field?: string; data?: string }>();
  const router = useRouter();

  const bookData = data ? JSON.parse(data) : null;
  const typedField = field as EditBookFieldType | undefined;
  
  const { isUpdating, updateBook } = useBook(bookData.id);

  const initialValue = bookData && typedField ? bookData[typedField] : null;
  const [editedValue, setEditedValue] = useState<EditBookValueType>(initialValue);

  const memoizedOptions = {
    genres: useMemoizedOptions(genresKeys, "genres"),
    languages: useMemoizedOptions(languageKeys, "languages"),
    coverTypes: useMemoizedOptions(coverTypeKeys, "coverTypes"),
    bookTypes: useMemoizedOptions(bookTypeKeys, "bookTypes"),
    paperTypes: useMemoizedOptions(paperTypeKeys, "paperTypes"),
  };

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
      const { price, originalPrice, discount } = initialValue as BookPriceType;
      const { price: newPrice, originalPrice: newOriginalPrice, discount: newDiscount } = editedValue as BookPriceType;

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
          style={{ flex: 1 }}
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
            style={{ paddingHorizontal: 15, marginBottom: 15 }}
            titleStyle={{ color: colors.white }}
          />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingBottom: 15,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {typedField && ["title", "publisher", "size", "isbn", "sku"].includes(typedField) && (
              <BookField
                field={typedField}
                initialValue={bookData[typedField]}
                onChange={(value) => setEditedValue(value)}
                isEditing
              />
            )}

            {typedField && ["pageCount", "publicationYear", "weight", "quantity"].includes(typedField) && (
              <BookField
                field={typedField}
                initialValue={String(bookData[typedField] || "")}
                onChange={(value) => setEditedValue(converter.toNumericValue(value))}
                isNumeric
                isEditing
              />
            )}

            {typedField === "pricing" && (
              <BookPricing
                initialPrice={bookData.price}
                initialOriginalPrice={bookData.originalPrice}
                initialDiscount={bookData.discount}
                onPriceChange={(values) => setEditedValue(values)}
              />
            )}

            {typedField === "genres" && (
              <BookSelectField
                field={typedField}
                type="multiple"
                options={memoizedOptions.genres}
                initialValue={bookData[typedField]}
                onChange={(value) => setEditedValue(value)}
                showSearch
                showSelected
              />
            )}

            {typedField === "language" && (
              <BookSelectField
                field={typedField}
                type="single"
                options={memoizedOptions.languages}
                initialValue={bookData[typedField]}
                onChange={(value) => setEditedValue(value)}
              />
            )}

            {typedField === "coverType" && (
              <BookSelectField
                field={typedField}
                type="single"
                options={memoizedOptions.coverTypes}
                initialValue={bookData[typedField]}
                onChange={(value) => setEditedValue(value)}
              />
            )}

            {typedField === "bookType" && (
              <BookSelectField
                field={typedField}
                type="single"
                options={memoizedOptions.bookTypes}
                initialValue={bookData[typedField]}
                onChange={(value) => setEditedValue(value)}
              />
            )}

            {typedField === "paperType" && (
              <BookSelectField
                field={typedField}
                type="single"
                options={memoizedOptions.paperTypes}
                initialValue={bookData[typedField]}
                onChange={(value) => setEditedValue(value)}
              />
            )}
            
            {typedField === "authors" && (
              <BookTagsField 
                field={typedField} 
                initialValue={bookData.authors} 
                onChange={(value) => setEditedValue(value)} 
              />
            )}

            {typedField === "description" && (
              <BookTextareaField
                field={typedField} 
                initialValue={bookData[typedField]} 
                onChange={(value) => setEditedValue(value)}
              />
            )}

            {typedField === "illustrations" && (
              <BookCheckboxField
                field={typedField} 
                initialColor={bookData.backgroundColor}
                initialValue={bookData[typedField]} 
                onChange={(value) => setEditedValue(value)}
              />
            )}

            {typedField === "backgroundColor" && (
              <ColorChanger 
                initialColor={bookData.backgroundColor || colors.creamTint9} 
                onColorChange={(hex) => setEditedValue(hex)}
              />
            )}        

            {typedField === "images" && (
              <BookImages
                initialValue={{
                  coverImage: bookData?.coverImage || "",
                  additionalImages: bookData?.additionalImages || [],
                }}
                onChange={(value) => setEditedValue(value)}
              />
            )}
          </ScrollView>

          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 15,
              paddingBottom: 15,
            }}
          >
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

export default EditBookModal;
