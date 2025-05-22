import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
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
import { orderStatusKeys } from "@/constants/order";
import { colors } from "@/constants/theme";
import { OrderStatusType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Dropdown from "@/components/Dropdown";
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
  
  const handleUpdate = () => {
    if (orderId && currentOrder?.status !== newStatus && isConnected) {
      updateStatus(orderId, newStatus);
    }
  };

  useEffect(() => {
    if (currentOrder?.status) {
      setNewStatus(currentOrder.status);
    }
  }, [currentOrder?.status]);

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
              <View style={styles.field}>
                <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
                  {t("modals.editOrder.fields.status.label")}
                </Typography>

                <Dropdown
                  options={orderStatusKeys.map((key) => ({ label: t(`common.orderStatus.${key}.title`), value: key as OrderStatusType }))}
                  initialValue={newStatus}
                  onChange={(value) => setNewStatus(value)}
                  placeholder={t("modals.editOrder.fields.status.option")}
                  shape="rounded"
                />
              </View>
            </View> 

            <View style={styles.buttonContainer}>
              <Button 
                onPress={handleUpdate}
                loading={updateStatusStatus === "updating"} 
                disabled={updateStatusStatus === "updating" || currentOrder?.status === newStatus}
              >
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
  field: {
    flex: 1, 
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

export default EditOrderModal;
