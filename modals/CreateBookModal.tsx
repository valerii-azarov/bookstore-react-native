import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, SlideInLeft, SlideInRight } from "react-native-reanimated";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useBookStore } from "@/stores/bookStore";
import { colors } from "@/constants/theme";
import { genresKeys, languageKeys, coverTypeKeys, bookTypeKeys, paperTypeKeys } from "@/constants/book";
import { CreateBook, DirectionType, BookStepComponentType } from "@/types";

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

const initialValues: CreateBook = {
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
  quantity: 0,
  sku: "",
};

const CreateBookModal = () => {
  const { t } = useLanguageContext();
  const router = useRouter();

  const { isCreating, response, createBook } = useBookStore();

  const isFirstRender = useRef(true);
  const [form, setForm] = useState<CreateBook>(initialValues);
  const [direction, setDirection] = useState<DirectionType>("forward");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const backWidth = useSharedValue(0);
  const nextWidth = useSharedValue(100);
  const backTextOpacity = useSharedValue(0);
  const nextTextOpacity = useSharedValue(1);

  const steps = useMemo<BookStepComponentType[]>(() => {
    return [
      {
        title: t("modals.createBook.titles.step1"),
        component: (
          <View style={styles.contentContainer}>
            <BookField
              field="title"
              initialValue={form.title}
              onChange={(value) => setForm({ ...form, title: value })}
            />

            <BookTagsField
              field="authors"
              initialValue={form.authors}
              onChange={(value) => setForm({ ...form, authors: value })}
            />
          </View>
        ),
        validate: (form) => !!form.title && form.authors.length > 0,
      },
      {
        title: t("modals.createBook.titles.step2"),
        component: (
          <View style={styles.contentContainer}>
            <BookSelectField
              field="genres"
              type="multiple"
              options={genresKeys.map((key) => ({ label: t(`genres.${key}`), value: key }))}
              initialValue={form.genres}
              onChange={(value) => setForm({ ...form, genres: value as string[] })}
              showSearch
              showSelected
            />
          </View>
        ),
        validate: (form) => form.genres.length > 0,
      },
      {
        title: t("modals.createBook.titles.step3"),
        component: (
          <View style={styles.contentContainer}>
            <BookTextareaField
              field="description"
              initialValue={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
            />
          </View>
        ),
        validate: (form) => form.description.trim().length >= 10,
      },
      {
        title: t("modals.createBook.titles.step4"),
        component: (
          <View style={styles.contentContainer}>
            <BookField
              field="pageCount"
              initialValue={form.pageCount === 0 ? "" : form.pageCount.toString()}
              onChange={(value) => setForm({ ...form, pageCount: value ? Number(value) : 0 })}
              isNumeric
              isInteger
            />
          </View>
        ),
        validate: (form) => form.pageCount > 0,
      },
      {
        title: t("modals.createBook.titles.step5"),
        component: (
          <View style={styles.contentContainer}>
            <BookCheckboxField
              field="illustrations"
              initialValue={form.illustrations}
              onChange={(value) => setForm({ ...form, illustrations: value })}
            />
          </View>
        ),
      },
      {
        title: t("modals.createBook.titles.step6"),
        component: (
          <View style={styles.contentContainer}>
            <BookSelectField
              field="language"
              type="single"
              options={languageKeys.map((key) => ({ label: t(`languages.${key}`), value: key }))}
              initialValue={form.language}
              onChange={(value) => setForm({ ...form, language: value as string })}
            />
          </View>
        ),
        validate: (form) => !!form.language,
      },
      {
        title: t("modals.createBook.titles.step7"),
        component: (
          <View style={styles.contentContainer}>
            <BookImagesField
              initialValues={{
                coverImage: form.coverImage,
                additionalImages: form.additionalImages,
              }}
              onChange={(value) => {
                setForm({
                  ...form,
                  coverImage: value.coverImage,
                  additionalImages: value.additionalImages,
                });
              }}
            />
          </View>
        ),
        validate: (form) => !!form.coverImage,
      },
      {
        title: t("modals.createBook.titles.step8"),
        component: (
          <View style={styles.contentContainer}>
            <ColorChanger
              initialColor={form.backgroundColor || colors.creamTint9}
              onColorChange={(hex) => setForm({ ...form, backgroundColor: hex })}
            />
          </View>
        ),
        validate: form => !!form.backgroundColor,
      },
      {
        title: t("modals.createBook.titles.step9"),
        component: (
          <View style={styles.contentContainer}>
            <BookField
              field="publisher"
              initialValue={form.publisher}
              onChange={(value) => setForm({ ...form, publisher: value })}
            />

            <BookField
              field="publicationYear"
              initialValue={form.publicationYear === 0 ? "" : form.publicationYear.toString()}
              onChange={(value) => setForm({ ...form, publicationYear: value ? Number(value) : 0 })}
              isNumeric
              isInteger
            />
          </View>
        ),
        validate: (form) => {
          const currentYear = new Date().getFullYear();
          return !!form.publisher && form.publicationYear >= 1800 && form.publicationYear <= currentYear;
        },
      },
      {
        title: t("modals.createBook.titles.step10"),
        component: (
          <View style={styles.contentContainer}>
            <BookField
              field="isbn"
              initialValue={form.isbn}
              onChange={(value) => setForm({ ...form, isbn: value })}
            />
          </View>
        ),
        validate: (form) => !!form.isbn,
      },
      {
        title: t("modals.createBook.titles.step11"),
        component: (
          <View style={[styles.contentContainer, { gap: 15 }]}>
            <BookSelectField
              field="coverType"
              type="single"
              options={coverTypeKeys.map((key) => ({ label: t(`coverTypes.${key}`), value: key }))}
              initialValue={form.coverType}
              onChange={(value) => setForm({ ...form, coverType: value as string })}
            />

            <BookSelectField
              field="bookType"
              type="single"
              options={bookTypeKeys.map((key) => ({ label: t(`bookTypes.${key}`), value: key }))}
              initialValue={form.bookType}
              onChange={(value) => setForm({ ...form, bookType: value as string })}
            />

            <BookSelectField
              field="paperType"
              type="single"
              options={paperTypeKeys.map((key) => ({ label: t(`paperTypes.${key}`), value: key }))}
              initialValue={form.paperType}
              onChange={(value) => setForm({ ...form, paperType: value as string })}
            />
          </View>
        ),
        validate: (form) => !!form.coverType && !!form.bookType && !!form.paperType,
      },
      {
        title: t("modals.createBook.titles.step12"),
        component: (
          <View style={styles.contentContainer}>
            <BookField
              field="size"
              initialValue={form.size}
              onChange={(value) => setForm({ ...form, size: value })}
            />

            <BookField
              field="weight"
              initialValue={form.weight === 0 ? "" : form.weight.toString()}
              onChange={(value) => setForm({ ...form, weight: value ? Number(value) : 0 })}
              isNumeric
            />
          </View>
        ),
        validate: (form) => !!form.size && form.weight > 0,
      },
      {
        title: t("modals.createBook.titles.step13"),
        component: (
          <View style={styles.contentContainer}>
            <BookPricingField
              initialValues={{
                price: form.price,
                originalPrice: form.originalPrice,
                discount: form.discount,
              }}
              onPriceChange={(values) => {
                setForm({
                  ...form,
                  price: values.price,
                  originalPrice: values.originalPrice || 0,
                  discount: values.discount || 0,
                });
              }}
            />
          </View>
        ),
        validate: (form) => form.originalPrice > 0,
      },
      {
        title: t("modals.createBook.titles.step14"),
        component: (
          <View style={styles.contentContainer}>
            <BookField
              field="quantity"
              initialValue={form.quantity === 0 ? "" : form.quantity.toString()}
              onChange={(value) => setForm({ ...form, quantity: value ? Number(value) : 0 })}
              isNumeric
              isInteger
            />
          </View>
        ),
        validate: (form) => form.quantity > 0,
      },
      {
        title: t("modals.createBook.titles.step15"),
        component: (
          <View style={styles.contentContainer}>
            <BookField
              field="sku"
              initialValue={form.sku}
              onChange={(value) => setForm({ ...form, sku: value })}
            />
          </View>
        ),
        validate: (form) => !!form.sku,
      },
      {
        title: "",
        component: (
          <View 
            style={[
              styles.contentContainer,
              {
                padding: 20,
                justifyContent: "center", 
                alignItems: "center",
              },
            ]}
          >
            <Typography fontSize={24} fontWeight="bold" style={styles.contentTitle}>
              {t(`modals.createBook.messages.${response?.status || "error"}.text`)}{" "}
              {response?.status === "error" && "❌"}
            </Typography>
            
            <Typography fontSize={16} fontWeight="medium" color={colors.blackTint5} style={styles.contentSubtitle}>
              {response?.message || t(`modals.createBook.messages.${response?.status || "error"}.subText`)}
            </Typography>
          </View>
        ),
      },
    ]
  }, [t, form, response]);

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isSecondToLastStep = currentStep === steps.length - 2;
  const isError = response?.status === "error";

  const isNextStepDisabled = useMemo(() => steps[currentStep].validate?.(form) === false, [form, currentStep]);

  const handleNext = useCallback(() => {
    setDirection("forward");
    if (isLastStep) {
      return isError ? router.back() : router.dismiss();
    }
    if (isSecondToLastStep && !isCreating) {
      createBook(form);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  }, [isLastStep, isSecondToLastStep, isCreating, isError, form, createBook]);

  const handlePrevious = useCallback(() => {
    setDirection("backward");
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    if (isSecondToLastStep && !isCreating && response) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isCreating, response, isSecondToLastStep]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    const buttonWidth = isFirstStep || isLastStep ? [0, 100] : [50, 50];
    backWidth.value = withTiming(buttonWidth[0], { duration: 200 });
    nextWidth.value = withTiming(buttonWidth[1], { duration: 200 });

    backTextOpacity.value = withSequence(
      withTiming(buttonWidth[0] === 0 ? 0 : backTextOpacity.value, { duration: 100 }),
      withDelay(150, withTiming(!isFirstStep && !isLastStep ? 1 : 0, { duration: 100 }))
    );

    nextTextOpacity.value = withSequence(
      withTiming(buttonWidth[1] === 100 ? 0 : nextTextOpacity.value, { duration: 100 }),
      withDelay(150, withTiming(1, { duration: 100 }))
    );
  }, [currentStep, backWidth, nextWidth, backTextOpacity, nextTextOpacity]);

  const animatedStyles = {
    backButton: useAnimatedStyle(() => ({
      width: `${backWidth.value}%`,
    })),
    nextButton: useAnimatedStyle(() => ({
      width: `${nextWidth.value}%`,
    })),
    backText: useAnimatedStyle(() => ({
      opacity: backTextOpacity.value,
    })),
    nextText: useAnimatedStyle(() => ({
      opacity: nextTextOpacity.value,
    })),
  };

  const enteringAnimation = direction === "forward" ? SlideInRight : SlideInLeft;

  return (
    <ModalWrapper style={{ backgroundColor: colors.creamTint9 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Header
            title={t("modals.createBook.header")}
            iconLeft={<BackButton style={{ backgroundColor: colors.orangeTint5 }} />}
            style={styles.header}
            titleStyle={styles.headerTitle}
          />

          <ScrollView
            scrollEnabled={!isLastStep}
            contentContainerStyle={[
              styles.scrollViewContent,
              isLastStep && { justifyContent: "center" },
            ]}
          >
            {!isLastStep && (
              <View style={styles.stepTitleContainer}>
                <Typography fontSize={18} fontWeight="bold" style={styles.stepTitle}>
                  {steps[currentStep].title}
                </Typography>

                <Typography fontSize={18} fontWeight="bold" color={colors.gray}>
                  {` ${currentStep + 1}/${totalSteps - 1}`}
                </Typography>
              </View>
            )}

            <Animated.View
              key={currentStep}
              entering={isFirstRender.current ? undefined : enteringAnimation.duration(300)}
            >
              {steps[currentStep].component}
            </Animated.View>
          </ScrollView>

          <View 
            style={[
              styles.buttonContainer,
              !(isFirstStep || isLastStep) && { gap: 10 },
            ]}
          >
            <Animated.View style={animatedStyles.backButton}>
              <Button 
                onPress={handlePrevious}
                style={{ backgroundColor: colors.grayTint5 }} 
              >
                <Animated.View style={animatedStyles.backText}>
                  <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                    {t("modals.createBook.buttons.back.text")}
                  </Typography>
                </Animated.View>
              </Button>
            </Animated.View>

            <Animated.View style={animatedStyles.nextButton}>
              <Button 
                onPress={handleNext} 
                loading={isCreating} 
                disabled={isNextStepDisabled || isCreating}
              >
                <Animated.View style={animatedStyles.nextText}>
                  <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                    {t(`modals.createBook.buttons.${isError ? "exit" : isSecondToLastStep ? "create" : isLastStep ? "complete" : "continue"}.text`)}
                  </Typography>
                </Animated.View>
              </Button>
            </Animated.View>
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
    color: colors.black,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  stepTitleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  stepTitle: {
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
  },
  contentTitle: {
    marginBottom: 5,
    textAlign: "center",
  },
  contentSubtitle: {
    textAlign: "center",
  },
  buttonContainer: {
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default CreateBookModal;
