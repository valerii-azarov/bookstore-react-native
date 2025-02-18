import React, { createContext, useContext, useState, useCallback } from "react";
import booksApi from "@/api/booksApi";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { ResponseType, CreateBookType, DirectionType } from "@/types";

interface CreateBookFormContextType {
  form: CreateBookType;
  isLoading: boolean;
  response: ResponseType | null;
  direction: DirectionType | null;
  currentStep: number;
  submit: () => void;
  updateForm: <K extends keyof CreateBookType>(key: K, value: CreateBookType[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const CreateBookFormContext = createContext<CreateBookFormContextType>({} as CreateBookFormContextType);

const initialBookValues: CreateBookType = {
  title: "",
  authors: [],
  description: "",
  genres: [],
  language: "",
  publisher: "",
  publicationYear: "",
  isbn: "",
  pageCount: "",
  coverType: "",
  bookType: "",
  paperType: "",
  size: "",
  weight: "",
  illustrations: false,
  coverImage: "",
  price: "",
  sku: "",
};

export const CreateBookFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguageContext();
  
  const [form, setForm] = useState<CreateBookType>(initialBookValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [direction, setDirection] = useState<DirectionType | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);  

  const submit = useCallback(async () => {
    setIsLoading(true);
  
    await booksApi.createBook(form)
      .then(() => {
        setResponse({ status: "success" });
      })
      .catch((error) => {
        let message = error.message;
        
        if (error.message.includes("image/invalid-image-object")) {
          message = t("errorMessages.image.invalidImageObject");
        }

        if (error.message.includes("image/no-secure-url")) {
          message = t("errorMessages.image.noSecureUrl");
        }

        if (error.message.includes("books/upload-failed")) {
          message = t("errorMessages.books.uploadFailed");
        }
        
        setResponse({ status: "error", message });
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentStep((prev) => prev + 1);
      });
  }, [form]);

  const updateForm = <K extends keyof CreateBookType>(key: K, value: CreateBookType[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = useCallback(() => {
    setDirection("forward");
    setCurrentStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setDirection("backward");
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  return (
    <CreateBookFormContext.Provider 
      value={{ 
        form, 
        isLoading, 
        response,
        direction, 
        currentStep,
        submit,
        updateForm, 
        nextStep, 
        prevStep,
      }}
    >
      {children}
    </CreateBookFormContext.Provider>
  );
};

export const useCreateBookFormContext = (): CreateBookFormContextType => useContext(CreateBookFormContext);