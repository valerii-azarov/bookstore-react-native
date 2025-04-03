import { useState, useEffect } from "react";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNovaPostStore } from "@/stores/novaPostStore";
import { useOrderStore } from "@/stores/orderStore";
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
} from "@/selectors/orderSelectors";
import { colors } from "@/constants/theme";
import { OrderFormValues, OptionType, DirectionType } from "@/types";

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
  const { bookIds, totalPrice } = useLocalSearchParams<{ bookIds?: string; totalPrice?: string }>();

  const parsedBookIds = bookIds ? JSON.parse(bookIds) : [];
  const parsedTotalPrice = totalPrice ? parseFloat(totalPrice) : 0;

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

  const isLoadingCities = citiesStatus === "loading";
  const isEmptyCities = !isLoadingCities && cities.length === 0;
  const isErrorCities = !isLoadingCities && citiesResponse?.status === "error";

  const isLoadingWarehouses = warehousesStatus === "loading";
  const isEmptyWarehouses = !isLoadingWarehouses && warehouses.length === 0;
  const isErrorWarehouses = !isLoadingWarehouses && warehousesResponse?.status === "error";

  const isOrderCreating = orderStatus === "creating";
  const isOrderSuccess = orderResponse?.status === "success";
  const isOrderError = orderResponse?.status === "error";

  const orderMessage = orderResponse?.message;  

  const cityOptions: OptionType[] = cities.map((city: any) => ({
    label: city.description,
    value: city.ref,
  }));

  const warehouseOptions: OptionType[] = warehouses.map((warehouse: any) => ({
    label: warehouse.description,
    value: warehouse.ref,
  }));
  
  const [formValues, setFormValues] = useState<OrderFormValues>(initialValues);
  const [direction, setDirection] = useState<DirectionType>("forward");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<OptionType | null>(null);

  const handleCitySearch = (text: string) => {
    text.trim() ? searchCities(text) : resetCities();
  };

  const handleCitySelect = (selectedOption: OptionType | null) => {
    setSelectedCity(selectedOption);
    setSelectedWarehouse(null);
    setFormValues((prev) => ({ ...prev, city: selectedOption?.label || "" }));

    selectedOption ? searchWarehouses(selectedOption.value) : resetWarehouses();
  };

  const handleWarehouseSearch = (text: string) => {
    if (selectedCity) {
      searchWarehouses(selectedCity.value, text.trim());
    }
  };

  const handleWarehouseSelect = (selectedOption: OptionType | null) => {
    setSelectedWarehouse(selectedOption);
    setFormValues((prev) => ({ ...prev, warehouse: selectedOption?.label || "" }));
  };

  const steps = [
    {
      title: "Доставка",
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              Оберіть пункт
            </Typography>

            <SearchDropdown
              data={cityOptions}
              onSelect={handleCitySelect}
              onSearch={handleCitySearch}
              searchPlaceholder="Пошук пункту..."
              shape="rounded"
              isLoading={isLoadingCities}
              isEmpty={isEmptyCities}
              isError={isErrorCities}
              loadingMessage="Завантаження пунктів..."
              emptyMessage="Пункт не знайдено"
              errorMessage="Помилка при завантаженні пунктів"
            />
          </View>
          
          <View style={{ flex: 1, minHeight: 75, marginBottom: 10 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              Оберіть відділення
            </Typography>

            <SearchDropdown
              data={warehouseOptions}
              onSelect={handleWarehouseSelect}
              onSearch={handleWarehouseSearch}
              searchPlaceholder="Пошук відділення..."
              shape="rounded"
              isLoading={isLoadingWarehouses}
              isEmpty={isEmptyWarehouses}
              isError={isErrorWarehouses}
              loadingMessage="Завантаження відділень..."
              emptyMessage="Відділення не знайдено"
              errorMessage="Помилка при завантаженні відділень"
              disabled={!selectedCity}
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
              Виберіть місто та відділення Нової Пошти, щоб ми доставили замовлення саме туди, де вам зручно.
            </Typography>
          </View>
        </View>
      ),
      validate: (form: OrderFormValues) => !!form.city && !!form.warehouse,
    },
    {
      title: "Контактні дані",
      component: (
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              Прізвище
            </Typography>
      
            <Input
              value={formValues.lastName}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, lastName: text }))}
              placeholder="Введіть прізвище"
              keyboardType="default"
            />
          </View>
      
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              Ім'я
            </Typography>
      
            <Input 
              value={formValues.firstName}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, firstName: text }))}
              placeholder="Введіть ім'я"
              keyboardType="default"
            />
          </View>  
      
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              По батькові (необов’язково)
            </Typography>
      
            <Input 
              value={formValues.middleName}
              onChangeText={(text) => setFormValues((prev) => ({ ...prev, middleName: text }))}
              placeholder="Введіть по батькові"
              keyboardType="default"
            />
          </View>
      
          <View style={{ flex: 1, minHeight: 75 }}>
            <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
              Номер телефону
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
      title: "Спосіб оплати",
      component: (
        <View>
          <View style={{ flexDirection: "column" }}>
            <Typography fontSize={16} fontWeight="medium" style={{ marginBottom: 5 }}>
              Загальна сума до сплати: 
            </Typography>
            
            <Typography fontSize={28} fontWeight="bold" numberOfLines={1} ellipsizeMode="tail" color={colors.black}>
            {`${parsedTotalPrice.toFixed(2)}₴`}  
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
            Оберіть спосіб оплати
          </Typography>

          <View style={{ alignItems: "flex-start" }}>
            <Checkbox
              checked={formValues.paymentMethod === "cash"}
              onPress={() => setFormValues((prev) => ({ ...prev, paymentMethod: "cash" }))}
              label="Готівкою"
              labelSize={16}
              style={{ marginBottom: 15 }}
            />

            <Checkbox
              checked={formValues.paymentMethod === "cod"}
              onPress={() => setFormValues((prev) => ({ ...prev, paymentMethod: "cod" }))}
              label="Накладений платіж"
              labelSize={16}
              style={{ marginBottom: 15 }}
            />

            <Checkbox
              checked={formValues.paymentMethod === "card"}
              onPress={() => setFormValues((prev) => ({ ...prev, paymentMethod: "card" }))}
              label="Банківською карткою"
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
              ❗Зверніть увагу 
            </Typography>

            <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
              Оплата банківською карткою тимчасово недоступна.
              Можна оплатити замовлення при отриманні у відділенні Нова Пошта.
            </Typography>
          </View>
        </View>
      ),
      validate: (form: OrderFormValues) => !!form.paymentMethod,
    },
    {
      title: "Підтвердження",
      component: (
        <View>
          <Typography fontSize={16} fontWeight="medium" color={colors.black} style={{ marginBottom: 15 }}>
            Будь ласка, перевірте ваші дані
          </Typography>
      
          <View style={{ marginBottom: 15 }}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={{ marginBottom: 2.5 }}>
              Адреса доставки:
            </Typography>
      
            <Typography fontSize={16} fontWeight="medium" color={colors.black} numberOfLines={2}>
              {selectedCity?.label && selectedWarehouse?.label ? `${selectedCity.label}, ${selectedWarehouse.label}` : "Не вказано місто та відділення"}
            </Typography>
          </View>
      
          <View style={{ marginBottom: 15 }}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={{ marginBottom: 2.5 }}>
              Отримувач:
            </Typography>
      
            <Typography fontSize={16} fontWeight="medium" color={colors.black} numberOfLines={1}>
              {formValues.lastName || formValues.firstName ? `${formValues.lastName || ""} ${formValues.firstName || ""} ${formValues.middleName || ""}`.trim() : "Не вказано прізвище та ім'я"}
            </Typography>
          </View>
      
          <View style={{ marginBottom: 15 }}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={{ marginBottom: 2.5 }}>
              Номер телефону:
            </Typography>
      
            <Typography fontSize={16} fontWeight="medium" color={colors.black} numberOfLines={1}>
              {formValues.phoneNumber || "Не вказано номер телефону"}
            </Typography>
          </View>
      
          <View style={{ marginBottom: 15 }}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} style={{ marginBottom: 2.5 }}>
              Спосіб оплати:
            </Typography>
      
            <Typography fontSize={16} fontWeight="medium" color={colors.black} numberOfLines={1}>
              {formValues.paymentMethod === "cash" ? "Готівкою" : formValues.paymentMethod === "card" ? "Банківською карткою" : formValues.paymentMethod === "cod" ? "Накладений платіж" : "Не обрано спосіб оплати"}
            </Typography>
          </View>
        </View>
      ),
    },
    {
      title: "Оплата",
      component: (
        <View 
          style={{
            backgroundColor: colors.orangeTint8,
            borderRadius: 12,
            padding: 20,
          }}
        > 
          <Typography fontSize={18} fontWeight="bold" style={{ marginBottom: 10 }}>
            Платіжна система в розробці 🚀
          </Typography>

          <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
            Зараз триває бета-тестування. Ми активно працюємо над додаванням платіжної системи.  
            Трішки терпіння — і все буде готово! Дякуємо за розуміння! 
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
            {isOrderSuccess ? "Ваше замовлення успішно оформлено" : "Помилка ❌"}
          </Typography>
          
          <Typography fontSize={16} fontWeight="medium" color={colors.blackTint5} style={{ textAlign: "center" }}>
            {isOrderSuccess ? "Очікуйте на повідомлення з деталями доставки. Дякуємо, що обрали нас!" : orderMessage || "Будь ласка, спробуйте ще раз пізніше"}
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
      return isOrderError ? router.back() : router.dismissAll();
    }
    if (isSecondToLastStep && !isOrderCreating) {
      createOrder(formValues, parsedBookIds);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setDirection("backward");
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (isSecondToLastStep && !isOrderCreating && orderResponse) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isOrderCreating, isSecondToLastStep, orderResponse]);

  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title="Оформлення"
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
            next: isOrderError ? "Повернутись" : isLastStep ? "Завершити" : isSecondToLastStep ? "Підтвердити" : "Продовжити",
            previous: "Назад",
          }}
          buttonProps={{ 
            next: { 
              disabled: isOrderCreating, 
              loading: isOrderCreating,
            },
            previous: { disabled: isFirstStep },
          }}
        />
      </KeyboardWrapper>
    </ModalWrapper>
  );
};

export default CheckoutModal;
