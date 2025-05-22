import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { orderHandler } from "@/helpers/orderHandler";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useOrderStore } from "@/stores/orderStore";
import { 
  selectCurrentOrder,
  selectFetchOrderStatus,
  selectFetchOrderResponse,
  selectUpdateStatusStatus, 
  selectUpdateStatusResponse, 
  selectSetOrderById,
  selectLoadOrderById,
  selectUpdateStatus,
  selectResetOrderOperationState,
} from "@/selectors/orderSelectors";
import { trackingNumberRegex } from "@/constants/regex";
import { colors } from "@/constants/theme";
import { OrderStatusType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Dropdown from "@/components/Dropdown";
import Field from "@/components/Field";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const EditOrderModal = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const t = useTranslation();
  const isConnected = useIsConnected();
  
  const currentOrder = useOrderStore(selectCurrentOrder);
  const fetchOrderStatus = useOrderStore(selectFetchOrderStatus);
  const fetchOrderResponse = useOrderStore(selectFetchOrderResponse);
  const updateStatusStatus = useOrderStore(selectUpdateStatusStatus);
  const updateStatusResponse = useOrderStore(selectUpdateStatusResponse);
  
  const setOrderById = useOrderStore(selectSetOrderById);
  const loadOrderById = useOrderStore(selectLoadOrderById);
  const updateStatus = useOrderStore(selectUpdateStatus);
  const resetOrderOperationState = useOrderStore(selectResetOrderOperationState);

  const isLoading = fetchOrderStatus === "loading";
  const isError = !isLoading && fetchOrderResponse?.status === "error";
    
  const status = updateStatusResponse?.status;
  const message = updateStatusResponse?.message;

  const [newStatus, setNewStatus] = useState<OrderStatusType>("processing");
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [trackingNumberError, setTrackingNumberError] = useState<string | null>(null);

  const validateTrackingNumber = (value: string): string | null => {
    if (!value) {
      return t("modals.editOrder.validators.trackingNumber.required");
    }

    if (!trackingNumberRegex.test(value)) {
      return t("modals.editOrder.validators.trackingNumber.invalid");
    }

    return null;
  };

  const handleTrackingNumberChange = (value: string) => {
    setTrackingNumber(value);

    const error = validateTrackingNumber(value);
    setTrackingNumberError(error);
  };

  const handleUpdate = () => {
    if (orderId && currentOrder?.status !== newStatus && isConnected) {
      updateStatus(orderId, newStatus, trackingNumber);
    }
  };

  useEffect(() => {
    if (currentOrder?.status) {
      setNewStatus(currentOrder.status);
      setTrackingNumber(currentOrder.trackingNumber || "");
    }
  }, [currentOrder?.status, currentOrder?.trackingNumber]);

  useEffect(() => {
    if (orderId && isConnected) {
      setOrderById(orderId);
      loadOrderById();
    }
    return () => resetOrderOperationState("fetch");
  }, [orderId, isConnected]);

  useEffect(() => {
    if (status === "error" && message) {
      Alert.alert(
        t("modals.editOrder.alerts.statusUpdate.responses.error.title"),
        message || t("modals.editOrder.alerts.statusUpdate.responses.error.message")
      );
    }

    if (status === "success") {
      Alert.alert(
        t("modals.editOrder.alerts.statusUpdate.responses.success.title"),
        t("modals.editOrder.alerts.statusUpdate.responses.success.message"),
        [{ text: "OK", onPress: () => setTimeout(() => router.back(), 500) }]
      );
    }

    return () => resetOrderOperationState("updateStatus");
  }, [status, message, router]);

  const isShipped = newStatus === "shipped";
  const isUpdating = updateStatusStatus === "updating";
  const isSaveDisabled = isUpdating || currentOrder?.status === newStatus || (isShipped && (!!trackingNumberError || !trackingNumber));

  const allowedStatuses = orderHandler.getAllowedStatusesForUpdate(currentOrder?.status ?? "processing");

  return (
    <ModalWrapper>
      <KeyboardWrapper>
        <Header
          title={t("modals.editOrder.header.title")}
          titleSize={18}
          iconLeft={<BackButton />}
          style={{
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        />

        {!isConnected && (
          <ErrorNetwork 
            message={t("common.messages.errorNetwork.title")}
            subMessage={t("common.messages.errorNetwork.subtitle")}
          />
        )}

        {isConnected && isLoading && (
          <Loading size="small" color={colors.orange} />
        )}

        {isConnected && isError && !isLoading && (
          <ErrorWithRetry 
            message={t("common.messages.failedLoad.title")}
            subMessage={t("common.messages.failedLoad.subtitle")}
            hideButton 
          />
        )}

        {isConnected && !isLoading && !isError && currentOrder && (
          <>
            <View style={[styles.content, styles.padded]}>
              <View style={{ flexDirection: "column", gap: 15 }}>
                {currentOrder?.status !== "received" && (
                  <View style={{ minHeight: 75 }}>
                    <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
                      {t("modals.editOrder.fields.status.label")}
                    </Typography>

                    <Dropdown
                      options={allowedStatuses.map((key) => ({ label: t(`common.orderStatus.${key}.title`), value: key as OrderStatusType }))}
                      initialValue={newStatus}
                      onChange={(value) => setNewStatus(value)}
                      placeholder={t("modals.editOrder.fields.status.option")}
                      shape="rounded"
                    />
                  </View>
                )}

                {["shipped", "delivered", "received"].includes(newStatus) && (
                  <View style={{ minHeight: 75 }}>
                    <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
                      {t("modals.editOrder.fields.trackingNumber.label")}
                    </Typography>

                    <Field
                      type="input" 
                      value={trackingNumber}
                      onChangeText={(text) => handleTrackingNumberChange(text)}
                      placeholder={t("modals.editOrder.fields.trackingNumber.placeholder")}
                      error={trackingNumberError}
                      editable={
                        newStatus === "shipped" && !currentOrder?.trackingNumber
                      }
                      containerStyle={{
                        backgroundColor:
                          isShipped && !currentOrder?.trackingNumber
                            ? colors.white
                            : colors.grayTint7,
                        borderColor: trackingNumberError ? colors.redTint1 : colors.gray,
                        borderWidth: 1,
                      }}
                    />
                  </View>
                )}
              </View>  
            </View> 

            <View style={styles.buttonContainer}>
              <Button onPress={handleUpdate} loading={isUpdating} disabled={isSaveDisabled}>
                <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                  {t("modals.editOrder.buttons.save")}
                </Typography>
              </Button>
            </View>
          </>
        )} 
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
  buttonContainer: {
    backgroundColor: colors.grayTint9,
    padding: 10,
    paddingHorizontal: 15,
  },
  padded: {
    padding: 15,
  },
});

export default EditOrderModal;
