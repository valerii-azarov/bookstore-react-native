import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { orderHandler } from "@/helpers/orderHandler";
import { useTranslation } from "@/contexts/translateContext";
import { OrderStatusType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";

const OrderStatusModal = () => {
  const t = useTranslation();
  const { state } = useLocalSearchParams<{ state: OrderStatusType }>();

  const orderSteps = orderHandler.getOrderTimelineSteps(state || "processing", t);

  return (
    <ModalWrapper>
      <Header
        title={t("modals.orderStatus.header.title")}
        titleSize={18}
        iconLeft={<BackButton />}
        style={{
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      />

      <View style={{ flex: 1, padding: 15 }}>
        <Timeline 
          steps={orderSteps} 
          scrollEnabled={false}
        />
      </View>
    </ModalWrapper>
  );
};

export default OrderStatusModal;
