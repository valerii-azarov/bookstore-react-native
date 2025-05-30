import React, { useRef, useState, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { isEqual } from "lodash";
import { bookHandler } from "@/helpers/bookHandler";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import { isbnRegex } from "@/constants/regex";
import {
  selectBookId,
  selectCurrentBook,
  selectUpdateBookStatus,
  selectUpdateBookResponse,
  selectUpdateBook, 
  selectResetBookOperationState,
} from "@/selectors/bookSelectors";
import { 
  genresKeys, 
  languageKeys,
  coverTypeKeys,
  bookTypeKeys,
  paperTypeKeys, 
} from "@/constants/book";
import { colors } from "@/constants/theme";
import { converter } from "@/helpers/converter";
import { EditableBookField, EditableBookValue } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import ImagesField from "@/components/ImagesField";
import Checkbox from "@/components/Checkbox";
import ColorPicker from "@/components/ColorPicker";
import Dropdown from "@/components/Dropdown";
import Field from "@/components/Field";
import MultiDropdown from "@/components/MultiDropdown";
import RateCalculator from "@/components/RateCalculator";
import TagsField from "@/components/TagsField";
import Typography from "@/components/Typography";

type ValidationError = string | null | { [key: string]: string | null };

const EditBookModal = () => {
  const router = useRouter();
  const { field } = useLocalSearchParams<{ field: EditableBookField }>();

  const t = useTranslation();
  const isConnected = useIsConnected();
  
  const bookId = useBookStore(selectBookId);
  const currentBook = useBookStore(selectCurrentBook);
  const updateBookStatus = useBookStore(selectUpdateBookStatus);
  const updateBookResponse = useBookStore(selectUpdateBookResponse);

  const updateBook = useBookStore(selectUpdateBook);
  const resetState = useBookStore(selectResetBookOperationState);

  const status = updateBookResponse?.status;
  const message = updateBookResponse?.message;

  const typedField = field as EditableBookField | undefined;

  const initialValueRef = useRef<EditableBookValue | null>(null);

  const [newValue, setNewValue] = useState<EditableBookValue | null>(null);
  const [validationError, setValidationError] = useState<ValidationError | null>(null);

  const isValueChanged = initialValueRef.current !== null && newValue !== null && !isEqual(initialValueRef.current, newValue);

  const validateField = (field: EditableBookField, value: any): ValidationError => {
    if (field !== "images" && (value === undefined || value === null || value === "")) {
      return t(`modals.editBook.validators.${field}.required`);
    }

    if (Array.isArray(value) && value.length === 0 && field !== "images") {
      return t(`modals.editBook.validators.${field}.required`);
    }
    
    if (field === "title" || field === "publisher" || field === "size" || field === "sku") {
      if (typeof value === "string" && value.length < 2) {
        return t(`modals.editBook.validators.${field}.minLength`);
      }
    }
    
    if (field === "authors") {
      if (value.length > 5) {
        return t(`modals.editBook.validators.${field}.maxCount`);
      }
      if (value.some((author: string) => author.length < 2)) {
        return t(`modals.editBook.validators.${field}.invalid`);
      }
    }
    
    if (field === "genres") {
      if (value.length > 5) {
        return t(`modals.editBook.validators.${field}.maxCount`);
      }
    }
    
    if (field === "images") {
      const errors: { coverImage: string | null; additionalImages: string | null } = {
        coverImage: null,
        additionalImages: null,
      };

      if (!value || typeof value !== "object") {
        return null;
      }

      if (!value.coverImage) {
        errors.coverImage = t(`modals.editBook.validators.images.coverImage.required`);
      }

      if (value.additionalImages && Array.isArray(value.additionalImages) && value.additionalImages.length > 5) {
        errors.additionalImages = t(`modals.editBook.validators.images.additionalImages.maxCount`);
      }

      if (errors.coverImage || errors.additionalImages) {
        return errors;
      }
    }

    if (field === "rates") {
      const errors: { originalPrice: string | null; discount: string | null; price: string | null } = {
        originalPrice: null,
        discount: null,
        price: null,
      };

      if (!value || typeof value !== "object") {
        return null;
      }

      if (value.originalPrice === undefined || value.originalPrice === null || isNaN(value.originalPrice) || value.originalPrice <= 0) {
        errors.originalPrice = t(`modals.editBook.validators.rates.originalPrice.required`);
      } 
      
      if (value.originalPrice > 10000) {
        errors.originalPrice = t(`modals.editBook.validators.rates.originalPrice.max`);
      }

      if (value.discount !== undefined && (isNaN(value.discount) || value.discount < 0 || value.discount > 100)) {
        errors.discount = t(`modals.editBook.validators.rates.discount.invalid`);
      }
      
      if (value.price === undefined || value.price === null || isNaN(value.price) || value.price < 0) {
        errors.price = t(`modals.editBook.validators.rates.price.invalid`);
      } 
      
      if (value.price > 10000) {
        errors.price = t(`modals.editBook.validators.rates.price.max`);
      }

      if (errors.originalPrice || errors.discount || errors.price) {
        return errors;
      }
    }

    if (field === "pageCount" || field === "weight") {
      if (isNaN(value) || value <= 0) {
        return t(`modals.editBook.validators.${field}.required`);
      }
      if (field === "pageCount" && value > 10000) {
        return t(`modals.editBook.validators.${field}.max`);
      }
      if (field === "weight" && value > 10000) {
        return t(`modals.editBook.validators.${field}.max`);
      }
    }

    if (field === "availableQuantity") {
      if (isNaN(value) || value < 0) {
        return t(`modals.editBook.validators.${field}.invalid`);
      }
      if (value > 100) {
        return t(`modals.editBook.validators.${field}.max`);
      }
    }

    if (field === "description" && typeof value === "string" && value.length < 500) {
      return t(`modals.editBook.validators.${field}.minLength`);
    }

    if (field === "language" || field === "coverType" || field === "bookType" || field === "paperType") {
      if (!value) {
        return t(`modals.editBook.validators.${field}.invalid`);
      }
    }

    if (field === "publicationYear") {
      const currentYear = new Date().getFullYear();
      if (isNaN(value) || value < 1800 || value > currentYear) {
        return t(`modals.editBook.validators.${field}.invalid`);
      }
    }

    if (field === "isbn" && typeof value === "string" && !isbnRegex.test(value)) {
      return t(`modals.editBook.validators.${field}.invalid`);
    }

    return null;
  };
  
  const handleInputChange = (value: EditableBookValue) => {
    if (!typedField) return;
    
    setNewValue(value);

    const error = validateField(typedField, value);
    setValidationError(error);
  };

  const handleUpdate = () => {
    if (!bookId || !typedField || newValue === null) return;

    if (isValueChanged) {
      updateBook(bookId, typedField, newValue);
    }
  };
  
  useEffect(() => {
    const value = typedField 
      ? bookHandler.getInitialBookValue(currentBook, typedField) 
      : null;

    initialValueRef.current = value;
    setNewValue(value);
  }, [typedField, currentBook]);

  useEffect(() => {
    if (status === "error" && message) {
      Alert.alert(
        t("modals.editBook.alerts.updateBook.responses.error.title"),
        message || t("modals.editBook.alerts.updateBook.responses.error.message")
      );
    }

    if (status === "success") {
      Alert.alert(
        t("modals.editBook.alerts.updateBook.responses.success.title"),
        t("modals.editBook.alerts.updateBook.responses.success.message"),
        [{ text: "OK", onPress: () => setTimeout(() => router.back(), 500) }]
      );
    }    

    return () => resetState("update");
  }, [status, message]);

  const textFields: EditableBookField[] = ["title", "publisher", "size", "isbn", "sku"];
  const numericFields: EditableBookField[] = ["pageCount", "publicationYear", "availableQuantity"];
  const numericNonIntegerFields: EditableBookField[] = ["weight"];

  const hiddenLabelFields: EditableBookField[] = ["backgroundColor", "rates", "images"];

  const isUpdating = updateBookStatus === "updating";
  const isSaveDisabled = isUpdating || !isValueChanged || !isConnected || !!validationError;

  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title={t(`modals.editBook.header.title.${field}`)}
          titleSize={18}
          iconLeft={<BackButton />}
          style={{
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        />
        
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, padding: 15 }}>
            {typedField && newValue !== null && ( 
              <View style={{ minHeight: 75 }}>
                {!hiddenLabelFields.includes(typedField) && (
                  <Typography
                    fontSize={typedField === "illustrations" ? 16 : 14}
                    fontWeight="medium"
                    color={colors.black}
                    style={{ 
                      marginBottom: typedField === "illustrations" ? 10 : 5,
                    }}
                  >
                    {t(
                      typedField === "illustrations"
                        ? "common.parameters.illustrations.checkboxLabel"
                        : `common.parameters.${typedField}.editedLabel`
                    )}
                  </Typography>
                )}

                {textFields.includes(typedField) && typeof newValue === "string" && (
                  <Field 
                    type="input"
                    value={newValue}
                    onChangeText={(text) => handleInputChange(text)}
                    placeholder={t(`common.parameters.${typedField}.editedPlaceholder`)}
                    error={validationError as string | null}
                  />
                )}

                {numericFields.includes(typedField) && (newValue === "" || typeof newValue === "number") && (
                  <Field
                    type="input"
                    value={newValue.toString()}              
                    onChangeText={(value) => handleInputChange(converter.preserveEmptyOrNumber(value))}
                    placeholder={t(`common.parameters.${typedField}.editedPlaceholder`)}
                    error={validationError as string | null}
                    isNumeric
                    isInteger
                  />
                )}
                
                {numericNonIntegerFields.includes(typedField) && (newValue === "" || typeof newValue === "number") && (
                  <Field
                    type="input"
                    value={newValue.toString()}
                    onChangeText={(value) => handleInputChange(converter.preserveEmptyOrNumber(value))}
                    placeholder={t(`common.parameters.${typedField}.editedPlaceholder`)}
                    error={validationError as string | null}
                    isNumeric
                  />
                )}

                {typedField === "description" && typeof newValue === "string" && (
                  <Field 
                    type="textarea"
                    value={newValue}
                    onChangeText={(text) => handleInputChange(text)}
                    placeholder={t("common.parameters.description.editedPlaceholder")}
                    error={validationError as string | null}
                    minHeight={100}
                    maxHeight={500}
                    shape="rounded"
                  />
                )}
                
                {typedField === "illustrations" && typeof newValue === "boolean" && (
                  <View style={{ alignItems: "flex-start" }}>
                    <Checkbox
                      checked={newValue}
                      onPress={() => handleInputChange(!newValue)}
                      label={t("common.parameters.illustrations.values.contains")}
                      labelSize={16}
                    />
                  </View>
                )}
                
                {typedField === "authors" && Array.isArray(newValue) && (
                  <TagsField
                    initialValue={newValue}
                    onChange={(value) => handleInputChange(value)}
                    placeholder={t("common.parameters.authors.editedPlaceholder")}
                    error={validationError as string | null}
                  />
                )}

                {typedField === "language" && typeof newValue === "string" && (
                  <Dropdown
                    options={languageKeys.map((key) => ({ label: t(`common.languages.${key}`), value: key }))}
                    initialValue={newValue}
                    onChange={(value) => handleInputChange(value)}
                    placeholder={t("common.parameters.language.editedOption")}
                    error={validationError as string | null}
                    shape="rounded"
                  />
                )}

                {typedField === "coverType" && typeof newValue === "string" && (
                  <Dropdown
                    options={coverTypeKeys.map((key) => ({ label: t(`common.coverTypes.${key}`), value: key }))}
                    initialValue={newValue}
                    onChange={(value) => handleInputChange(value)}
                    placeholder={t("common.parameters.coverType.editedOption")}
                    error={validationError as string | null}
                    shape="rounded"
                  />
                )}
                
                {typedField === "bookType" && typeof newValue === "string" && (
                  <Dropdown
                    options={bookTypeKeys.map((key) => ({ label: t(`common.bookTypes.${key}`), value: key }))}
                    initialValue={newValue}
                    onChange={(value) => handleInputChange(value)}
                    placeholder={t("common.parameters.bookType.editedOption")}
                    error={validationError as string | null}
                    shape="rounded"
                  />
                )}
                
                {typedField === "paperType" && typeof newValue === "string" && (
                  <Dropdown
                    options={paperTypeKeys.map((key) => ({ label: t(`common.paperTypes.${key}`), value: key }))}
                    initialValue={newValue}
                    onChange={(value) => handleInputChange(value)}
                    placeholder={t("common.parameters.paperType.editedOption")}
                    error={validationError as string | null}
                    shape="rounded"
                  />
                )}
                
                {typedField === "genres" && Array.isArray(newValue) && (
                  <MultiDropdown 
                    options={genresKeys.map((key) => ({ label: t(`common.genres.${key}`), value: key }))}
                    initialValues={newValue}
                    onChange={(value) => handleInputChange(value)}
                    placeholder={t("common.parameters.genres.editedOption")}
                    error={validationError as string | null}
                    showTags
                    shape="rounded"
                  />
                )}

                {typedField === "backgroundColor" && typeof newValue === "string" && (
                  <ColorPicker
                    initialColor={newValue}
                    onColorChange={(hex) => handleInputChange(hex)}
                  />
                )}

                {typedField === "rates" && typeof newValue === "object" && "price" in newValue && (
                  <RateCalculator 
                    initialRates={newValue}
                    onRatesChange={(rates) => handleInputChange(rates)}
                    errors={
                      validationError && typeof validationError === "object"
                        ? {
                            originalPrice: validationError.originalPrice || null,
                            discount: validationError.discount || null,
                            price: validationError.price || null,
                          }
                        : { originalPrice: null, discount: null, price: null }
                    }
                    labels={{
                      originalPrice: t("common.parameters.originalPrice.editedLabel"),
                      discount: t("common.parameters.discount.editedLabel"),
                      price: t("common.parameters.price.editedLabel"),
                    }}
                    placeholders={{
                      originalPrice: t("common.parameters.originalPrice.editedPlaceholder"),
                      discount: t("common.parameters.discount.editedPlaceholder"),
                      price: t("common.parameters.price.editedPlaceholder"),
                    }}
                    checkboxes={{
                      manual: t("common.parameters.manual.checkboxLabel"),
                    }}
                  />
                )}

                {typedField === "images" && typeof newValue === "object" && "coverImage" in newValue && (
                  <ImagesField 
                    initialImages={newValue}
                    onImagesChange={(images) => handleInputChange(images)}
                    errors={
                      validationError && typeof validationError === "object"
                        ? {
                            coverImage: validationError.coverImage || null,
                            additionalImages: validationError.additionalImages || null,
                          }
                        : { coverImage: null, additionalImages: null }
                    }
                    labels={{
                      coverImage: t("common.parameters.coverImage.editedLabel"),
                      additionalImages: t("common.parameters.additionalImages.editedLabel"),
                    }}
                    prompts={{
                      coverImage: t("common.parameters.coverImage.prompt"),
                      additionalImages: t("common.parameters.additionalImages.prompt"),
                    }}
                    messages={{
                      denied: {
                        text: t("common.parameters.coverImage.alerts.denied.title"),
                        subText: t("common.parameters.coverImage.alerts.denied.subtitle"),
                      }
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>

        <View 
          style={{
            backgroundColor: colors.grayTint9,
            padding: 10,
            paddingHorizontal: 15,
          }}
        >
          <Button onPress={handleUpdate} loading={isUpdating} disabled={isSaveDisabled}>
            <Typography fontSize={16} fontWeight="bold" color={colors.white}>
              {t("modals.editBook.buttons.save")}
            </Typography>
          </Button>
        </View> 
      </KeyboardWrapper>
    </ModalWrapper>
  );
};

export default EditBookModal;
