import { useState, useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useCartStore } from "@/stores/cartStore";
import { useNovaPostStore } from "@/stores/novaPostStore";
import { useOrderStore } from "@/stores/orderStore";
import { selectGetTotal } from "@/selectors/cartSelectors";
import {
  selectCities,
  selectWarehouses,
  selectCitiesStatus,
  selectCitiesResponse,
  selectWarehousesStatus,
  selectWarehousesResponse,
  selectSearchCities,
  selectSearchWarehouses,
  selectResetCities,
  selectResetWarehouses,
} from "@/selectors/novaPostSelectors";
import { 
  selectOrderStatus,
  selectOrderResponse,
  selectCreateOrder,
  selectResetOrder,
} from "@/selectors/orderSelectors";
import { colors } from "@/constants/theme";
import { OrderFormValues, Option, DirectionType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import FormStepper from "@/components/FormStepper";
import SearchDropdown from "@/components/SearchDropdown";
import Typography from "@/components/Typography";

const initialValues: OrderFormValues = {
  city: "",
  warehouse: "",
  firstName: "",
  lastName: "",
  middleName: "",
  phoneNumber: "",
  paymentMethod: "",
};

const CheckoutModal = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const total = useCartStore(selectGetTotal)();

  const cities = useNovaPostStore(selectCities);
  const citiesStatus = useNovaPostStore(selectCitiesStatus);
  const citiesResponse = useNovaPostStore(selectCitiesResponse);
  
  const warehouses = useNovaPostStore(selectWarehouses);
  const warehousesStatus = useNovaPostStore(selectWarehousesStatus);
  const warehousesResponse = useNovaPostStore(selectWarehousesResponse);
  
  const searchCities = useNovaPostStore(selectSearchCities);
  const searchWarehouses = useNovaPostStore(selectSearchWarehouses);
  const resetCities = useNovaPostStore(selectResetCities);
  const resetWarehouses = useNovaPostStore(selectResetWarehouses);

  const orderStatus = useOrderStore(selectOrderStatus);
  const orderResponse = useOrderStore(selectOrderResponse);

  const createOrder = useOrderStore(selectCreateOrder);
  const resetOrder = useOrderStore(selectResetOrder);

  const isLoadingCities = citiesStatus === "loading";
  const isEmptyCities = !isLoadingCities && cities.length === 0;
  const isErrorCities = !isLoadingCities && citiesResponse?.status === "error";

  const isLoadingWarehouses = warehousesStatus === "loading";
  const isEmptyWarehouses = !isLoadingWarehouses && warehouses.length === 0;
  const isErrorWarehouses = !isLoadingWarehouses && warehousesResponse?.status === "error";

  const isCreating = orderStatus === "creating";
  const status = orderResponse?.status;
  const message = orderResponse?.message;

  const cityOptions: Option<string>[] = cities.map((city: any) => ({
    label: city.description,
    value: city.ref,
  }));

  const warehouseOptions: Option<string>[] = warehouses.map((warehouse: any) => ({
    label: warehouse.description,
    value: warehouse.ref,
  }));
  
  const [formValues, setFormValues] = useState<OrderFormValues>(initialValues);
  const [direction, setDirection] = useState<DirectionType>("forward");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [selectedCity, setSelectedCity] = useState<Option<string> | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Option<string> | null>(null);

  const handleCitySearch = (text: string) => {
    text.trim() ? searchCities(text) : resetCities();
  };

  const handleCitySelect = (selectedOption: Option<string> | null) => {
    setSelectedCity(selectedOption);
    setSelectedWarehouse(null);
    setFormValues((prev) => ({ ...prev, city: selectedOption?.label || "" }));

    if (selectedOption && isConnected) {
      searchWarehouses(selectedOption.value);
    } else {
      resetWarehouses();
    }
  };

  const handleWarehouseSearch = (text: string) => {
    if (selectedCity && isConnected) {
      searchWarehouses(selectedCity.value, text.trim());
    }
  };

  const handleWarehouseSelect = (selectedOption: Option<string> | null) => {
    setSelectedWarehouse(selectedOption);
    setFormValues((prev) => ({ ...prev, warehouse: selectedOption?.label || "" }));
  };

  const steps = [
    {
      title: t("modals.checkout.steps.step1.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.checkout.steps.step1.fields.city.label")}
            </Typography>

            <SearchDropdown
              data={cityOptions}
              onSelect={handleCitySelect}
              onSearch={handleCitySearch}
              searchPlaceholder={t("modals.checkout.steps.step1.fields.city.placeholder")}
              shape="rounded"
              isLoading={isLoadingCities}
              isEmpty={isEmptyCities}
              isError={isErrorCities}
              loadingMessage={t("modals.checkout.steps.step1.fields.city.responses.loading")}
              emptyMessage={t("modals.checkout.steps.step1.fields.city.responses.empty")}
              errorMessage={t("modals.checkout.steps.step1.fields.city.responses.error")}
              disabled={!isConnected}
            />
          </View>
          
          <View style={{ flex: 1, minHeight: 75, marginBottom: 10 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.checkout.steps.step1.fields.warehouse.label")}
            </Typography>

            <SearchDropdown
              data={warehouseOptions}
              onSelect={handleWarehouseSelect}
              onSearch={handleWarehouseSearch}
              searchPlaceholder={t("modals.checkout.steps.step1.fields.warehouse.placeholder")}
              shape="rounded"
              isLoading={isLoadingWarehouses}
              isEmpty={isEmptyWarehouses}
              isError={isErrorWarehouses}
              loadingMessage={t("modals.checkout.steps.step1.fields.warehouse.responses.loading")}
              emptyMessage={t("modals.checkout.steps.step1.fields.warehouse.responses.empty")}
              errorMessage={t("modals.checkout.steps.step1.fields.warehouse.responses.error")}
              disabled={!selectedCity || !isConnected}
            />
          </View>

          <View
            style={{
              backgroundColor: colors.orangeTint8,
              borderRadius: 12,
              paddingVertical: 15,
              paddingHorizontal: 20,
            }}
          >
            <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
              {t("modals.checkout.steps.step1.notice.subtitle")}
            </Typography>
          </View>
        </View>
      ),
      validate: (form: OrderFormValues) => !!form.city && !!form.warehouse,
    },
    {
      title: t("modals.checkout.steps.step2.title"),
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.checkout.steps.step2.fields.lastName.label")}
            </Typography>
      
            <Input
              value={formValues.lastName}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, lastName: text }))}
              placeholder={t("modals.checkout.steps.step2.fields.lastName.placeholder")}
              keyboardType="default"
            />
          </View>
      
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.checkout.steps.step2.fields.firstName.label")}
            </Typography>
      
            <Input 
              value={formValues.firstName}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, firstName: text }))}
              placeholder={t("modals.checkout.steps.step2.fields.firstName.placeholder")}
              keyboardType="default"
            />
          </View>  
      
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.checkout.steps.step2.fields.middleName.label")}
            </Typography>
      
            <Input 
              value={formValues.middleName}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, middleName: text }))}
              placeholder={t("modals.checkout.steps.step2.fields.middleName.placeholder")}
              keyboardType="default"
            />
          </View>
      
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              {t("modals.checkout.steps.step2.fields.phoneNumber.label")}
            </Typography>
      
            <Input 
              value={formValues.phoneNumber}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, phoneNumber: text }))}
              placeholder="+380XXXXXXXXX"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      ),      
      validate: (form: OrderFormValues) => !!form.lastName && !!form.firstName && !!form.phoneNumber,
      scrollEnabled: true,
    },
    {
      title: t("modals.checkout.steps.step3.title"),
      component: (
        <View>
          <View style={{ flexDirection: "column" }}>
            <Typography fontSize={16} fontWeight="medium" style={{ marginBottom: 5 }}>
              {t("modals.checkout.steps.step3.labels.totalAmount")}
            </Typography>
            
            <Typography fontSize={28} fontWeight="bold" numberOfLines={1} ellipsizeMode="tail" color={colors.black}>
              {total.toFixed(2)}₴
            </Typography>
          </View>

          <View
            style={{
              height: 1.5,
              backgroundColor: colors.grayTint5,
              marginVertical: 15,
            }}
          />
          
          <Typography fontSize={16} fontWeight="medium" color={colors.black} style={{ marginBottom: 10 }}>
            {t("modals.checkout.steps.step3.fields.paymentMethod.label")}
          </Typography>

          <View style={{ alignItems: "flex-start" }}>
            <Checkbox
              checked={formValues.paymentMethod === "cod"}
              onPress={() => setFormValues((prev) => ({ ...prev, paymentMethod: "cod" }))}
              label={t("modals.checkout.steps.step3.fields.paymentMethod.values.cod")}
              labelSize={16}
              style={{ marginBottom: 15 }}
            />

            <Checkbox
              checked={formValues.paymentMethod === "card"}
              onPress={() => setFormValues((prev) => ({ ...prev, paymentMethod: "card" }))}
              label={t("modals.checkout.steps.step3.fields.paymentMethod.values.card")}
              labelSize={16}
              labelColor={colors.grayTint5}
              style={{
                marginBottom: 15,
                pointerEvents: formValues.paymentMethod === "card" ? "auto" : "none",
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: colors.orangeTint8,
              borderRadius: 12,
              paddingVertical: 15,
              paddingHorizontal: 20,
            }}
          >
            <Typography fontSize={16} fontWeight="bold" style={{ marginBottom: 5 }}>
              {t("modals.checkout.steps.step3.notice.title")} 
            </Typography>

            <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
              {t("modals.checkout.steps.step3.notice.subtitle")}
            </Typography>
          </View>
        </View>
      ),
      validate: (form: OrderFormValues) => !!form.paymentMethod,
    },
    {
      title: t("modals.checkout.steps.step4.title"),
      component: (
        <View>
          <Typography fontSize={16} fontWeight="medium" color={colors.black} style={{ marginBottom: 15 }}>
            {t("modals.checkout.steps.step4.labels.check")}
          </Typography>
      
          <View style={{ marginBottom: 15 }}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={{ marginBottom: 2.5 }}>
              {t("modals.checkout.steps.step4.fields.deliveryAddress.label")}
            </Typography>
      
            <Typography fontSize={16} fontWeight="medium" color={colors.black} numberOfLines={2}>
              {selectedCity?.label && selectedWarehouse?.label 
                ? `${selectedCity.label}, ${selectedWarehouse.label}` 
                : t("modals.checkout.steps.step4.fields.deliveryAddress.notSpecified")}
            </Typography>
          </View>
      
          <View style={{ marginBottom: 15 }}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={{ marginBottom: 2.5 }}>
              {t("modals.checkout.steps.step4.fields.recipient.label")}
            </Typography>
      
            <Typography fontSize={16} fontWeight="medium" color={colors.black} numberOfLines={1}>
              {formValues.lastName || formValues.firstName 
                ? `${formValues.lastName || ""} ${formValues.firstName || ""} ${formValues.middleName || ""}`.trim() 
                : t("modals.checkout.steps.step4.fields.recipient.notSpecified")}
            </Typography>
          </View>
      
          <View style={{ marginBottom: 15 }}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={{ marginBottom: 2.5 }}>
              {t("modals.checkout.steps.step4.fields.phoneNumber.label")}
            </Typography>
      
            <Typography fontSize={16} fontWeight="medium" color={colors.black} numberOfLines={1}>
              {formValues.phoneNumber || t("modals.checkout.steps.step4.fields.phoneNumber.notSpecified")}
            </Typography>
          </View>
      
          <View style={{ marginBottom: 15 }}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={{ marginBottom: 2.5 }}>
              {t("modals.checkout.steps.step4.fields.paymentMethod.label")}
            </Typography>
      
            <Typography fontSize={16} fontWeight="medium" color={colors.black} numberOfLines={1}>
              {t(`modals.checkout.steps.step4.fields.paymentMethod.${formValues.paymentMethod ? `values.${formValues.paymentMethod}` : "notSpecified"}`)}
            </Typography>
          </View>
        </View>
      ),
    },
    {
      title: t("modals.checkout.steps.step5.title"),
      component: (
        <View 
          style={{
            backgroundColor: colors.orangeTint8,
            borderRadius: 12,
            padding: 20,
          }}
        > 
          <Typography fontSize={18} fontWeight="bold" style={{ marginBottom: 10 }}>
            {t("modals.checkout.steps.step5.notice.title")}
          </Typography>

          <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
            {t("modals.checkout.steps.step5.notice.subtitle")} 
          </Typography>
        </View>
      ),
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
            {t(`modals.checkout.messages.${status === "success" ? "success" : "error"}.title`)}
          </Typography>
          
          <Typography fontSize={16} fontWeight="medium" color={colors.blackTint5} style={{ textAlign: "center" }}>
            {t(`modals.checkout.messages.${status === "success" ? "success" : "error"}.subtitle`) || message}
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
      return status === "error" ? router.back() : router.dismissAll();
    }
    if (isSecondToLastStep && !isCreating && isConnected) {
      createOrder(formValues);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setDirection("backward");
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (isSecondToLastStep && !isCreating && orderResponse) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isCreating, isSecondToLastStep, orderResponse]);

  useEffect(() => {
    return () => {
      resetOrder();
      resetCities();
      resetWarehouses();
    };
  }, []);

  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title={t("modals.checkout.header.title")}
          iconLeft={<BackButton />}
          style={{
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        />

        <FormStepper<OrderFormValues>
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
            next: t(`modals.checkout.buttons.${status === "error" ? "return" : isLastStep ? "complete" : isSecondToLastStep ? "confirm" : "continue"}`),
            previous: t("modals.checkout.buttons.back"),
          }}
          buttonProps={{ 
            next: { 
              disabled: isCreating || !isConnected, 
              loading: isCreating 
            },
            previous: { disabled: isFirstStep },
          }}
        />
      </KeyboardWrapper>
    </ModalWrapper>
  );
};

export default CheckoutModal;
