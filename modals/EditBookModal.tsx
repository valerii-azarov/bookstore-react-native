import { useState, useEffect } from "react";
import { View, Alert, ScrollView, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { isEqual } from "lodash";
import { bookHandler } from "@/helpers/bookHandler";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
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
import Input from "@/components/Input";
import ImagesField from "@/components/ImagesField";
import Checkbox from "@/components/Checkbox";
import ColorPicker from "@/components/ColorPicker";
import Dropdown from "@/components/Dropdown";
import MultiDropdown from "@/components/MultiDropdown";
import RateCalculator from "@/components/RateCalculator";
import TagsField from "@/components/TagsField";
import Textarea from "@/components/Textarea";
import Typography from "@/components/Typography";

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
  const resetBookOperationState = useBookStore(selectResetBookOperationState);

  const isUpdating = updateBookStatus === "updating";
  const status = updateBookResponse?.status;
  const message = updateBookResponse?.message;

  const typedField = field as EditableBookField | undefined;

  const initialValue = typedField
    ? bookHandler.getInitialBookValue(currentBook, typedField)
    : null;

  const [newValue, setNewValue] = useState<EditableBookValue | null>(initialValue);
  
  const isValueChanged = initialValue !== null && newValue !== null && !isEqual(initialValue, newValue);

  const handleUpdate = () => {
    if (!bookId || !typedField || newValue === null) return;

    if (isValueChanged) {
      updateBook(bookId, typedField, newValue);
    }
  };

  useEffect(() => {
    if (status === "error" && message) {
      Alert.alert(
        t("modals.editBook.alerts.updateBook.responses.error.title"),
        message || t("modals.editBook.alerts.updateBook.responses.error.message")
      );
    }
    return () => resetBookOperationState("update");
  }, [status, message]);
  
  useEffect(() => {
    if (status === "success") {
      Alert.alert(
        t("modals.editBook.alerts.updateBook.responses.success.title"),
        t("modals.editBook.alerts.updateBook.responses.success.message"),
        [{ text: "OK", onPress: () => setTimeout(() => router.back(), 500) }]
      );
    }
    return () => resetBookOperationState("update");
  }, [status, router]);

  const textFields: EditableBookField[] = ["title", "publisher", "size", "isbn", "sku"];
  const numericFields: EditableBookField[] = ["pageCount", "publicationYear", "availableQuantity"];
  const numericNonIntegerFields: EditableBookField[] = ["weight"];

  const hiddenLabelFields: EditableBookField[] = ["backgroundColor", "rates", "images"];

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
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, styles.padded]}>
            {typedField && newValue !== null && ( 
              <View style={styles.field}>
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
                  <Input 
                    value={newValue}
                    onChangeText={(text) => setNewValue(text)}
                    placeholder={t(`common.parameters.${typedField}.editedPlaceholder`)}
                  />
                )}

                {numericFields.includes(typedField) && (newValue === "" || typeof newValue === "number") && (
                  <Input
                    value={newValue.toString()}
                    onChangeText={(value) => setNewValue(converter.preserveEmptyOrNumber(value))}              
                    placeholder={t(`common.parameters.${typedField}.editedPlaceholder`)}
                    isNumeric
                    isInteger
                  />
                )}
                
                {numericNonIntegerFields.includes(typedField) && (newValue === "" || typeof newValue === "number") && (
                  <Input
                    value={newValue.toString()}
                    onChangeText={(value) => setNewValue(converter.preserveEmptyOrNumber(value))}
                    placeholder={t(`common.parameters.${typedField}.editedPlaceholder`)}
                    isNumeric
                  />
                )}

                {typedField === "description" && typeof newValue === "string" && (
                  <Textarea 
                    value={newValue}
                    onChangeText={(text) => setNewValue(text)}
                    placeholder={t("common.parameters.description.editedPlaceholder")}
                    minHeight={100}
                    maxHeight={500}
                    shape="rounded"
                  />
                )}
                
                {typedField === "illustrations" && typeof newValue === "boolean" && (
                  <View style={{ alignItems: "flex-start" }}>
                    <Checkbox
                      checked={newValue}
                      onPress={() => setNewValue(!newValue)}
                      label={t("common.parameters.illustrations.values.contains")}
                      labelSize={16}
                    />
                  </View>
                )}
                
                {typedField === "authors" && Array.isArray(newValue) && (
                  <TagsField
                    initialValue={newValue}
                    onChange={(value) => setNewValue(value)}
                    placeholder={t("common.parameters.authors.editedPlaceholder")}
                  />
                )}

                {typedField === "language" && typeof newValue === "string" && (
                  <Dropdown
                    options={languageKeys.map((key) => ({ label: t(`common.languages.${key}`), value: key }))}
                    initialValue={newValue}
                    onChange={(value) => setNewValue(value)}
                    placeholder={t("common.parameters.language.editedOption")}
                    shape="rounded"
                  />
                )}

                {typedField === "coverType" && typeof newValue === "string" && (
                  <Dropdown
                    options={coverTypeKeys.map((key) => ({ label: t(`common.coverTypes.${key}`), value: key }))}
                    initialValue={newValue}
                    onChange={(value) => setNewValue(value)}
                    placeholder={t("common.parameters.coverType.editedOption")}
                    shape="rounded"
                  />
                )}
                
                {typedField === "bookType" && typeof newValue === "string" && (
                  <Dropdown
                    options={bookTypeKeys.map((key) => ({ label: t(`common.bookTypes.${key}`), value: key }))}
                    initialValue={newValue}
                    onChange={(value) => setNewValue(value)}
                    placeholder={t("common.parameters.bookType.editedOption")}
                    shape="rounded"
                  />
                )}
                
                {typedField === "paperType" && typeof newValue === "string" && (
                  <Dropdown
                    options={paperTypeKeys.map((key) => ({ label: t(`common.paperTypes.${key}`), value: key }))}
                    initialValue={newValue}
                    onChange={(value) => setNewValue(value)}
                    placeholder={t("common.parameters.paperType.editedOption")}
                    shape="rounded"
                  />
                )}
                
                {typedField === "genres" && Array.isArray(newValue) && (
                  <MultiDropdown 
                    options={genresKeys.map((key) => ({ label: t(`common.genres.${key}`), value: key }))}
                    initialValues={newValue}
                    onChange={(value) => setNewValue(value)}
                    placeholder={t("common.parameters.genres.editedOption")}
                    showTags
                    shape="rounded"
                  />
                )}

                {typedField === "backgroundColor" && typeof newValue === "string" && (
                  <ColorPicker
                    initialColor={newValue}
                    onColorChange={(hex) => setNewValue(hex)}
                  />
                )}

                {typedField === "rates" && typeof newValue === "object" && "price" in newValue && (
                  <RateCalculator 
                    initialRates={newValue}
                    onRatesChange={(rates) => setNewValue(rates)}
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
                    onImagesChange={(images) => setNewValue(images)}
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

        <View style={styles.buttonContainer}>
          <Button 
            onPress={handleUpdate}
            loading={isUpdating}
            disabled={isUpdating || !isValueChanged || !isConnected}
          >
            <Typography fontSize={16} fontWeight="bold" color={colors.white}>
              {t("modals.editBook.buttons.save")}
            </Typography>
          </Button>
        </View> 
      </KeyboardWrapper>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  field: { 
    minHeight: 75,
  },
  buttonContainer: {
    backgroundColor: colors.grayTint9,
    padding: 10,
    paddingHorizontal: 15,
  },
  padded: {
    padding: 15,
  },
});

export default EditBookModal;
