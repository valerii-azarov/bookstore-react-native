import { useState, useEffect } from "react";
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
import { colors } from "@/constants/theme";
import { 
  genresKeys, 
  languageKeys,
  coverTypeKeys,
  bookTypeKeys,
  paperTypeKeys, 
} from "@/constants/book";
import { converter } from "@/helpers/converter";
import { BookField, BookFormValues, DirectionType } from "@/types";

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
  backgroundColor: "",
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
  const resetBookOperationState = useBookStore(selectResetBookOperationState);

  const isCreating = createBookStatus === "creating";
  const status = createBookResponse?.status;
  const message = createBookResponse?.message;

  const [formValues, setFormValues] = useState<BookFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormValues, string | null>>>({});
  const [direction, setDirection] = useState<DirectionType>("forward");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const validateField = (field: BookField, value: any): string | null => {
    if (field !== "additionalImages" && (value === undefined || value === null || value === "")) {
      return t(`validators.${field}Required`);
    }

    if (Array.isArray(value) && value.length === 0 && field !== "additionalImages") {
      return t(`validators.${field}Required`);
    }
    
    if (field === "title" || field === "publisher" || field === "size" || field === "sku") {
      if (typeof value === "string" && value.length < 2) {
        return t(`validators.${field}MinLength`);
      }
    }
    
    if (field === "authors") {
      if (value.length > 5) {
        return t("validators.authorsMaxCount");
      }
      if (value.some((author: string) => author.length < 2)) {
        return t("validators.authorsInvalid");
      }
    }
  
    if (field === "genres") {
      if (value.length > 5) {
        return t("validators.genresMaxCount");
      }
    }
  
    if (field === "additionalImages" && value.length > 5) {
      return t("validators.additionalImagesMaxCount");
    }

    if (field === "price" || field === "originalPrice") {
      if (isNaN(value) || value < 0) {
        return t(`validators.${field}Invalid`);
      }
      if (value > 10000) {
        return t(`validators.${field}Max`);
      }
      if (field === "originalPrice" && value <= 0) {
        return t("validators.originalPriceRequired");
      }
    }
  
    if (field === "discount") {
      if (isNaN(value) || value < 0 || value > 100) {
        return t("validators.discountInvalid");
      }
    }
  
    if (field === "pageCount" || field === "weight") {
      if (isNaN(value) || value <= 0) {
        return t(`validators.${field}Required`);
      }
      if (field === "pageCount" && value > 10000) {
        return t("validators.pageCountMax");
      }
      if (field === "weight" && value > 10000) {
        return t("validators.weightMax");
      }
    }
  
    if (field === "availableQuantity") {
      if (isNaN(value) || value < 0) {
        return t("validators.availableQuantityInvalid");
      }
      if (value > 100) {
        return t("validators.availableQuantityMax");
      }
    }

    if (field === "description" && typeof value === "string" && value.length < 500) {
      return t("validators.descriptionMinLength");
    }
  
    if (field === "language" || field === "coverType" || field === "bookType" || field === "paperType") {
      if (!value) {
        return t(`validators.${field}Invalid`);
      }
    }
  
    if (field === "publicationYear") {
      const currentYear = new Date().getFullYear();
      if (isNaN(value) || value < 1800 || value > currentYear) {
        return t("validators.publicationYearInvalid");
      }
    }
  
    if (field === "isbn" && typeof value === "string" && !isbnRegex.test(value)) {
      return t("validators.isbnInvalid");
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

  const steps = [
    {
      title: t("modals.createBook.titles.step1"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.title")}
            </Typography>
      
            <Field
              type="input"
              value={formValues.title}
              onChangeText={(value) => handleInputChange("title", value)}
              placeholder={t("modals.createBook.placeholders.title")}
              error={errors.title}
              keyboardType="default"
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.authors")}
            </Typography>
      
            <TagsField
              initialValue={formValues.authors}
              onChange={(value) => handleInputChange("authors", value)}
              placeholder={t("modals.createBook.placeholders.authors")}
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
      title: t("modals.createBook.titles.step2"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.genres")}
            </Typography>

            <MultiDropdown 
              options={genresKeys.map((key) => ({ label: t(`genres.${key}`), value: key }))}
              initialValues={formValues.genres}
              onChange={(value) => handleInputChange("genres", value)}
              placeholder={t("modals.createBook.options.genres")}
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
      title: t("modals.createBook.titles.step3"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.description")}
            </Typography> 

            <Field
              type="textarea"
              value={formValues.description}
              onChangeText={(value) => handleInputChange("description", value)}
              placeholder={t("modals.createBook.placeholders.description")}
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
      title: t("modals.createBook.titles.step4"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.pageCount")}
            </Typography> 

            <Field
              type="input"
              value={formValues.pageCount === 0 ? "" : formValues.pageCount.toString()}
              onChangeText={(value) => handleInputChange("pageCount", converter.toNumericValue(value) ?? 0)}
              placeholder={t("modals.createBook.placeholders.pageCount")}
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
      title: t("modals.createBook.titles.step5"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View>
            <Typography fontSize={16} fontWeight="medium" color={colors.black} style={{ marginBottom: 10 }}>
              {t("modals.createBook.labels.illustrations")}
            </Typography>

            <View style={{ alignItems: "flex-start" }}>
              <Checkbox
                checked={formValues.illustrations}
                onPress={() => handleInputChange("illustrations", !formValues.illustrations)}
                label={t("modals.createBook.checkboxes.illustrations")}
                labelSize={16}
              />
            </View>
          </View>
        </View>
      ),
    },
    {
      title: t("modals.createBook.titles.step6"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.language")}
            </Typography>

            <Dropdown 
              options={languageKeys.map((key) => ({ label: t(`languages.${key}`), value: key }))}
              initialValue={formValues.language}
              onChange={(value) => handleInputChange("language", value)}
              placeholder={t("modals.createBook.options.language")}
              error={errors.language}
              shape="rounded"
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.language,
    },
    {
      title: t("modals.createBook.titles.step7"),
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
              coverImage: t("modals.createBook.labels.coverImage"),
              additionalImages: t("modals.createBook.labels.additionalImages"),
            }}
            prompts={{
              coverImage: t("modals.createBook.prompts.coverImage"),
              additionalImages: t("modals.createBook.prompts.additionalImages"),
            }}
            messages={{
              denied: {
                text: t("modals.createBook.messages.denied.text"),
                subText: t("modals.createBook.messages.denied.subText"),
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
      title: t("modals.createBook.titles.step8"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View>
            <Typography fontSize={16} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.backgroundColor")}
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
      title: t("modals.createBook.titles.step9"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.publisher")}
            </Typography> 

            <Field
              type="input"
              value={formValues.publisher}
              onChangeText={(value) => handleInputChange("publisher", value)}
              placeholder={t("modals.createBook.placeholders.publisher")}
              error={errors.publisher}
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.publicationYear")}
            </Typography> 

            <Field
              type="input"
              value={formValues.publicationYear === 0 ? "" : formValues.publicationYear.toString()}
              onChangeText={(value) => handleInputChange("publicationYear", converter.toNumericValue(value) ?? 0)}
              placeholder={t("modals.createBook.placeholders.publicationYear")}
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
      title: t("modals.createBook.titles.step10"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.isbn")}
            </Typography> 

            <Field
              type="input"
              value={formValues.isbn}
              onChangeText={(value) => handleInputChange("isbn", value)}
              placeholder={t("modals.createBook.placeholders.isbn")}
              error={errors.isbn}
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.isbn && !errors.isbn,
    },
    {
      title: t("modals.createBook.titles.step11"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.coverType")}
            </Typography>

            <Dropdown 
              options={coverTypeKeys.map((key) => ({ label: t(`coverTypes.${key}`), value: key }))}
              initialValue={formValues.coverType}
              onChange={(value) => handleInputChange("coverType", value)}
              placeholder={t("modals.createBook.options.coverType")}
              error={errors.coverType}
              shape="rounded"
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.bookType")}
            </Typography>

            <Dropdown 
              options={bookTypeKeys.map((key) => ({ label: t(`bookTypes.${key}`), value: key }))}
              initialValue={formValues.bookType}
              onChange={(value) => handleInputChange("bookType", value)}
              placeholder={t("modals.createBook.options.bookType")}
              error={errors.bookType}
              shape="rounded"
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.paperType")}
            </Typography>

            <Dropdown 
              options={paperTypeKeys.map((key) => ({ label: t(`paperTypes.${key}`), value: key }))}
              initialValue={formValues.paperType}
              onChange={(value) => handleInputChange("paperType", value)}
              placeholder={t("modals.createBook.options.paperType")}
              error={errors.paperType}
              shape="rounded"
            />
          </View>
        </View>
      ),
      validate: (form: BookFormValues) => !!form.coverType && !!form.bookType && !!form.paperType,
    },
    {
      title: t("modals.createBook.titles.step12"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.size")}
            </Typography> 

            <Field
              type="input"
              value={formValues.size}
              onChangeText={(value) => handleInputChange("size", value)}
              placeholder={t("modals.createBook.placeholders.size")}
              error={errors.size}
            />
          </View>

          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.weight")}
            </Typography> 

            <Field
              type="input"
              value={formValues.weight === 0 ? "" : formValues.weight.toString()}
              onChangeText={(value) => handleInputChange("weight", converter.toNumericValue(value) ?? 0)}
              placeholder={t("modals.createBook.placeholders.weight")}
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
      title: t("modals.createBook.titles.step13"),
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
              originalPrice: t("modals.createBook.labels.originalPrice"),
              discount: t("modals.createBook.labels.discount"),
              price: t("modals.createBook.labels.price"),
            }}
            placeholders={{
              originalPrice: t("modals.createBook.placeholders.originalPrice"),
              discount: t("modals.createBook.placeholders.discount"),
              price: t("modals.createBook.placeholders.price"),
            }}
            checkboxes={{
              manual: t("modals.createBook.checkboxes.manual"),
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
      title: t("modals.createBook.titles.step14"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.availableQuantity")}
            </Typography> 

            <Field
              type="input"
              value={formValues.availableQuantity === 0 ? "" : formValues.availableQuantity.toString()}
              onChangeText={(value) => handleInputChange("availableQuantity", converter.toNumericValue(value) ?? 0)}
              placeholder={t("modals.createBook.placeholders.availableQuantity")}
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
      title: t("modals.createBook.titles.step15"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.createBook.labels.sku")}
            </Typography> 

            <Field
              type="input"
              value={formValues.sku}
              onChangeText={(value) => handleInputChange("sku", value)}
              placeholder={t("modals.createBook.placeholders.sku")}
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
            {t(`modals.createBook.messages.${status === "success" ? "success" : "error"}.text`) || message}
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
    return () => resetBookOperationState("create");
  }, []);

  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title={t("modals.createBook.header.text")}
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
            next: t(`modals.createBook.buttons.${status === "error" ? "return" : isLastStep ? "complete" : isSecondToLastStep ? "create" : "continue"}.text`),
            previous: t("modals.createBook.buttons.back.text"),
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
