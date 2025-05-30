import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useBookStore } from "@/stores/bookStore";
import {
  selectCreateBookStatus,
  selectCreateBookResponse,
  selectCreateBook,
  selectResetBookOperationState,
} from "@/selectors/bookSelectors";
import { isbnRegex } from "@/constants/regex";
import { 
  genresKeys, 
  languageKeys,
  coverTypeKeys,
  bookTypeKeys,
  paperTypeKeys, 
} from "@/constants/book";
import { colors } from "@/constants/theme";
import { converter } from "@/helpers/converter";
import { BookField, BookFormValues, DirectionType, Step } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import ImagesField from "@/components/ImagesField";
import Checkbox from "@/components/Checkbox";
import ColorPicker from "@/components/ColorPicker";
import Dropdown from "@/components/Dropdown";
import FormStepper from "@/components/FormStepper";
import Field from "@/components/Field";
import MultiDropdown from "@/components/MultiDropdown";
import RateCalculator from "@/components/RateCalculator";
import TagsField from "@/components/TagsField";
import Typography from "@/components/Typography";

const initialValues: BookFormValues = {
  title: "",
  authors: [],
  price: 0,
  originalPrice: 0,
  discount: 0,
  coverImage: "",
  additionalImages: [],
  backgroundColor: colors.white,
  description: "",
  genres: [],
  language: "",
  publisher: "",
  publicationYear: 0,
  isbn: "",
  pageCount: 0,
  coverType: "",
  bookType: "",
  paperType: "",
  size: "",
  weight: 0,
  illustrations: false,
  availableQuantity: 0,
  sku: "",
};

const CreateBookModal = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const createBookStatus = useBookStore(selectCreateBookStatus);
  const createBookResponse = useBookStore(selectCreateBookResponse);
  
  const createBook = useBookStore(selectCreateBook);
  const resetState = useBookStore(selectResetBookOperationState);

  const isCreating = createBookStatus === "creating";
  const status = createBookResponse?.status;
  const message = createBookResponse?.message;

  const [formValues, setFormValues] = useState<BookFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormValues, string | null>>>({});
  const [direction, setDirection] = useState<DirectionType>("forward");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const validateField = (field: BookField, value: any): string | null => {
    if (field !== "additionalImages" && (value === undefined || value === null || value === "")) {
      return t(`modals.createBook.validators.${field}.required`);
    }

    if (Array.isArray(value) && value.length === 0 && field !== "additionalImages") {
      return t(`modals.createBook.validators.${field}.required`);
    }
    
    if (field === "title" || field === "publisher" || field === "size" || field === "sku") {
      if (typeof value === "string" && value.length < 2) {
        return t(`modals.createBook.validators.${field}.minLength`);
      }
    }
    
    if (field === "authors") {
      if (value.length > 5) {
        return t(`modals.createBook.validators.${field}.maxCount`);
      }
      if (value.some((author: string) => author.length < 2)) {
        return t(`modals.createBook.validators.${field}.invalid`);
      }
    }
  
    if (field === "genres") {
      if (value.length > 5) {
        return t(`modals.createBook.validators.${field}.maxCount`);
      }
    }
  
    if (field === "additionalImages" && value.length > 5) {
      return t(`modals.createBook.validators.${field}.maxCount`);
    }

    if (field === "price" || field === "originalPrice") {
      if (isNaN(value) || value < 0) {
        return t(`modals.createBook.validators.${field}.invalid`);
      }
      if (value > 10000) {
        return t(`modals.createBook.validators.${field}.max`);
      }
      if (field === "originalPrice" && value <= 0) {
        return t(`modals.createBook.validators.${field}.required`);
      }
    }
  
    if (field === "discount") {
      if (isNaN(value) || value < 0 || value > 100) {
        return t(`modals.createBook.validators.${field}.invalid`);
      }
    }
  
    if (field === "pageCount" || field === "weight") {
      if (isNaN(value) || value <= 0) {
        return t(`modals.createBook.validators.${field}.required`);
      }
      if (field === "pageCount" && value > 10000) {
        return t(`modals.createBook.validators.${field}.max`);
      }
      if (field === "weight" && value > 10000) {
        return t(`modals.createBook.validators.${field}.max`);
      }
    }
  
    if (field === "availableQuantity") {
      if (isNaN(value) || value < 0) {
        return t(`modals.createBook.validators.${field}.invalid`);
      }
      if (value > 100) {
        return t(`modals.createBook.validators.${field}.max`);
      }
    }

    if (field === "description" && typeof value === "string" && value.length < 500) {
      return t(`modals.createBook.validators.${field}.minLength`);
    }
  
    if (field === "language" || field === "coverType" || field === "bookType" || field === "paperType") {
      if (!value) {
        return t(`modals.createBook.validators.${field}.invalid`);
      }
    }
  
    if (field === "publicationYear") {
      const currentYear = new Date().getFullYear();
      if (isNaN(value) || value < 1800 || value > currentYear) {
        return t(`modals.createBook.validators.${field}.invalid`);
      }
    }
  
    if (field === "isbn" && typeof value === "string" && !isbnRegex.test(value)) {
      return t(`modals.createBook.validators.${field}.invalid`);
    }

    return null;
  };
    
  const handleInputChange = <K extends keyof BookFormValues>(field: K, value: BookFormValues[K]) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validateField(field, value),
    }));
  };

  const steps: Step<BookFormValues>[] = [
    {
      title: t("modals.createBook.steps.step1.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step1.fields.title.label")}
            </Typography>
      
            <Field
              type="input"
              value={formValues.title}
              onChangeText={(value) => handleInputChange("title", value)}
              placeholder={t("modals.createBook.steps.step1.fields.title.placeholder")}
              error={errors.title}
              keyboardType="default"
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step1.fields.authors.label")}
            </Typography>
      
            <TagsField
              initialValue={formValues.authors}
              onChange={(value) => handleInputChange("authors", value)}
              placeholder={t("modals.createBook.steps.step1.fields.authors.placeholder")}
              error={errors.authors}
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => {
        const errors = {
          title: validateField("title", form.title),
          authors: validateField("authors", form.authors),
        };
        return !errors.title && !errors.authors;
      },
      scrollEnabled: true,
    },
    {
      title: t("modals.createBook.steps.step2.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step2.fields.genres.label")}
            </Typography>

            <MultiDropdown 
              options={genresKeys.map((key) => ({ label: t(`common.genres.${key}`), value: key }))}
              initialValues={formValues.genres}
              onChange={(value) => handleInputChange("genres", value)}
              placeholder={t("modals.createBook.steps.step2.fields.genres.option")}
              error={errors.genres}
              showTags
              shape="rounded"
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => form.genres.length > 0 && !errors.genres,
    },
    {
      title: t("modals.createBook.steps.step3.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step3.fields.description.label")}
            </Typography> 

            <Field
              type="textarea"
              value={formValues.description}
              onChangeText={(value) => handleInputChange("description", value)}
              placeholder={t("modals.createBook.steps.step3.fields.description.placeholder")}
              error={errors.description}
              minHeight={100}
              maxHeight={500}
              shape="rounded"
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.description && !errors.description,
      scrollEnabled: true,
    },
    {
      title: t("modals.createBook.steps.step4.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step4.fields.pageCount.label")}
            </Typography> 

            <Field
              type="input"
              value={formValues.pageCount === 0 ? "" : formValues.pageCount.toString()}
              onChangeText={(value) => handleInputChange("pageCount", converter.toNumericValue(value) ?? 0)}
              placeholder={t("modals.createBook.steps.step4.fields.pageCount.placeholder")}
              error={errors.pageCount}
              isNumeric
              isInteger
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.pageCount && !errors.pageCount,
    },
    {
      title: t("modals.createBook.steps.step5.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View>
            <Typography fontSize={16} fontWeight="medium" color={colors.black} style={{ marginBottom: 10 }}>
              {t("modals.createBook.steps.step5.fields.illustrations.checkboxLabel")}
            </Typography>

            <View style={{ alignItems: "flex-start" }}>
              <Checkbox
                checked={formValues.illustrations}
                onPress={() => handleInputChange("illustrations", !formValues.illustrations)}
                label={t("modals.createBook.steps.step5.fields.illustrations.values.contains")}
                labelSize={16}
              />
            </View>
          </View>
        </View>
      ),
    },
    {
      title: t("modals.createBook.steps.step6.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step6.fields.language.label")}
            </Typography>

            <Dropdown 
              options={languageKeys.map((key) => ({ label: t(`common.languages.${key}`), value: key }))}
              initialValue={formValues.language}
              onChange={(value) => handleInputChange("language", value)}
              placeholder={t("modals.createBook.steps.step6.fields.language.option")}
              error={errors.language}
              shape="rounded"
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.language,
    },
    {
      title: t("modals.createBook.steps.step7.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <ImagesField 
            initialImages={{
              coverImage: formValues.coverImage,
              additionalImages: formValues.additionalImages,
            }}
            onImagesChange={(images) => {
              handleInputChange("coverImage", images.coverImage);
              handleInputChange("additionalImages", images.additionalImages);
            }}
            errors={{
              coverImage: errors.coverImage ?? null,
              additionalImages: errors.additionalImages ?? null,
            }}
            labels={{
              coverImage: t("modals.createBook.steps.step7.fields.coverImage.label"),
              additionalImages: t("modals.createBook.steps.step7.fields.additionalImages.label"),
            }}
            prompts={{
              coverImage: t("modals.createBook.steps.step7.fields.coverImage.prompt"),
              additionalImages: t("modals.createBook.steps.step7.fields.additionalImages.prompt"),
            }}
            messages={{
              denied: {
                text: t("modals.createBook.steps.step7.fields.coverImage.alerts.denied.title"),
                subText: t("modals.createBook.steps.step7.fields.alerts.coverImage.denied.subtitle"),
              }
            }}
          />
        </View>
      ),
      validate: (form: BookFormValues) => {
        const errors = {
          coverImage: validateField("coverImage", form.coverImage),
          additionalImages: validateField("additionalImages", form.additionalImages),
        };
        return !errors.coverImage && !errors.additionalImages;
      },
      scrollEnabled: true,
    },
    {
      title: t("modals.createBook.steps.step8.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View>
            <Typography fontSize={16} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step8.fields.backgroundColor.label")}
            </Typography>

            <ColorPicker
              initialColor={formValues.backgroundColor}
              onColorChange={(hex) => handleInputChange("backgroundColor", hex)}
            />
          </View>
        </View>
      ),
    },
    {
      title: t("modals.createBook.steps.step9.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step9.fields.publisher.label")}
            </Typography> 

            <Field
              type="input"
              value={formValues.publisher}
              onChangeText={(value) => handleInputChange("publisher", value)}
              placeholder={t("modals.createBook.steps.step9.fields.publisher.placeholder")}
              error={errors.publisher}
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step9.fields.publicationYear.label")}
            </Typography> 

            <Field
              type="input"
              value={formValues.publicationYear === 0 ? "" : formValues.publicationYear.toString()}
              onChangeText={(value) => handleInputChange("publicationYear", converter.toNumericValue(value) ?? 0)}
              placeholder={t("modals.createBook.steps.step9.fields.publicationYear.placeholder")}
              error={errors.publicationYear}
              isNumeric
              isInteger
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => {
        const errors = {
          publisher: validateField("publisher", form.publisher),
          publicationYear: validateField("publicationYear", form.publicationYear),
        };
        return !errors.publisher && !errors.publicationYear;
      },
    },
    {
      title: t("modals.createBook.steps.step10.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step10.fields.isbn.label")}
            </Typography> 

            <Field
              type="input"
              value={formValues.isbn}
              onChangeText={(value) => handleInputChange("isbn", value)}
              placeholder={t("modals.createBook.steps.step10.fields.isbn.placeholder")}
              error={errors.isbn}
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.isbn && !errors.isbn,
    },
    {
      title: t("modals.createBook.steps.step11.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step11.fields.coverType.label")}
            </Typography>

            <Dropdown 
              options={coverTypeKeys.map((key) => ({ label: t(`common.coverTypes.${key}`), value: key }))}
              initialValue={formValues.coverType}
              onChange={(value) => handleInputChange("coverType", value)}
              placeholder={t("modals.createBook.steps.step11.fields.coverType.option")}
              error={errors.coverType}
              shape="rounded"
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step11.fields.bookType.label")}
            </Typography>

            <Dropdown 
              options={bookTypeKeys.map((key) => ({ label: t(`common.bookTypes.${key}`), value: key }))}
              initialValue={formValues.bookType}
              onChange={(value) => handleInputChange("bookType", value)}
              placeholder={t("modals.createBook.steps.step11.fields.bookType.option")}
              error={errors.bookType}
              shape="rounded"
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step11.fields.paperType.label")}
            </Typography>

            <Dropdown 
              options={paperTypeKeys.map((key) => ({ label: t(`common.paperTypes.${key}`), value: key }))}
              initialValue={formValues.paperType}
              onChange={(value) => handleInputChange("paperType", value)}
              placeholder={t("modals.createBook.steps.step11.fields.paperType.option")}
              error={errors.paperType}
              shape="rounded"
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.coverType && !!form.bookType && !!form.paperType,
    },
    {
      title: t("modals.createBook.steps.step12.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step12.fields.size.label")}
            </Typography> 

            <Field
              type="input"
              value={formValues.size}
              onChangeText={(value) => handleInputChange("size", value)}
              placeholder={t("modals.createBook.steps.step12.fields.size.placeholder")}
              error={errors.size}
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step12.fields.weight.label")}
            </Typography> 

            <Field
              type="input"
              value={formValues.weight === 0 ? "" : formValues.weight.toString()}
              onChangeText={(value) => handleInputChange("weight", converter.toNumericValue(value) ?? 0)}
              placeholder={t("modals.createBook.steps.step12.fields.weight.placeholder")}
              error={errors.weight}
              isNumeric
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => {
        const errors = {
          size: validateField("size", form.size),
          weight: validateField("weight", form.weight),
        };
        return !errors.size && !errors.weight;
      },
    },
    {
      title: t("modals.createBook.steps.step13.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <RateCalculator 
            initialRates={{
              originalPrice: formValues.originalPrice,
              discount: formValues.discount,
              price: formValues.price,
            }}
            onRatesChange={(rates) => {
              handleInputChange("originalPrice", rates.originalPrice);
              handleInputChange("discount", rates.discount);
              handleInputChange("price", rates.price);
            }}
            errors={{
              originalPrice: errors.originalPrice ?? null,
              discount: errors.discount ?? null,
              price: errors.price ?? null,
            }}
            labels={{
              originalPrice: t("modals.createBook.steps.step13.fields.originalPrice.label"),
              discount: t("modals.createBook.steps.step13.fields.discount.label"),
              price: t("modals.createBook.steps.step13.fields.price.label"),
            }}
            placeholders={{
              originalPrice: t("modals.createBook.steps.step13.fields.originalPrice.placeholder"),
              discount: t("modals.createBook.steps.step13.fields.discount.placeholder"),
              price: t("modals.createBook.steps.step13.fields.price.placeholder"),
            }}
            checkboxes={{
              manual: t("modals.createBook.steps.step13.fields.manual.checkboxLabel"),
            }}
          />
        </View>
      ),
      validate: (form: BookFormValues) => {
        const errors = {
          originalPrice: validateField("originalPrice", form.originalPrice),
          discount: validateField("discount", form.discount),
          price: validateField("price", form.price),
        };
        return !errors.originalPrice && !errors.discount && !errors.price;
      },
    },
    {
      title: t("modals.createBook.steps.step14.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step14.fields.availableQuantity.label")}
            </Typography> 

            <Field
              type="input"
              value={formValues.availableQuantity === 0 ? "" : formValues.availableQuantity.toString()}
              onChangeText={(value) => handleInputChange("availableQuantity", converter.toNumericValue(value) ?? 0)}
              placeholder={t("modals.createBook.steps.step14.fields.availableQuantity.placeholder")}
              error={errors.availableQuantity}
              isNumeric
              isInteger
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.availableQuantity && !errors.availableQuantity,
    },
    {
      title: t("modals.createBook.steps.step15.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.steps.step15.fields.sku.label")}
            </Typography> 

            <Field
              type="input"
              value={formValues.sku}
              onChangeText={(value) => handleInputChange("sku", value)}
              placeholder={t("modals.createBook.steps.step15.fields.sku.placeholder")}
              error={errors.sku}
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.sku && !errors.sku,
    },
    {
      title: "",
      hideTitle: true,
      component: ( 
        <View 
          style={{
            padding: 20,
            justifyContent: "center", 
            alignItems: "center",
          }}
        >
          <Typography fontSize={24} fontWeight="bold" style={{ marginBottom: 10, textAlign: "center" }}>
            {t(`modals.createBook.messages.${status === "success" ? "success" : "error"}.title`)}
          </Typography>
          
          <Typography fontSize={16} fontWeight="medium" color={colors.blackTint5} style={{ textAlign: "center" }}>
            {t(`modals.createBook.messages.${status === "success" ? "success" : "error"}.subtitle`) || message}
          </Typography>
        </View>
      ),
    },
  ];

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isSecondToLastStep = currentStep === steps.length - 2;

  const handleNext = () => {
    setDirection("forward");
    if (isLastStep) {
      return status === "error" ? router.back() : router.dismiss();
    }
    if (isSecondToLastStep && !isCreating && isConnected) {
      createBook(formValues);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setDirection("backward");
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (isSecondToLastStep && !isCreating && createBookResponse) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isCreating, isSecondToLastStep, createBookResponse]);

  useEffect(() => {
    return () => resetState("create");
  }, []);

  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title={t("modals.createBook.header.title")}
          titleSize={18}
          iconLeft={<BackButton />}
          style={{
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        />

        <FormStepper<BookFormValues>
          steps={steps}
          currentStep={currentStep}
          direction={direction}
          stepStatus={{ 
            isFirst: isFirstStep, 
            isLast: isLastStep,
            isSecondToLast: isSecondToLastStep 
          }}
          onNext={handleNext}
          onPrevious={handlePrevious}
          form={formValues}
          buttonLabels={{
            next: t(`modals.createBook.buttons.${status === "error" ? "return" : isLastStep ? "complete" : isSecondToLastStep ? "create" : "continue"}`),
            previous: t("modals.createBook.buttons.back"),
          }}
          buttonProps={{ 
            next: { 
              disabled: isCreating || !isConnected, 
              loading: isCreating, 
            },
            previous: { disabled: isFirstStep },
          }}
        />
      </KeyboardWrapper>
    </ModalWrapper>
  );
};

export default CreateBookModal;
