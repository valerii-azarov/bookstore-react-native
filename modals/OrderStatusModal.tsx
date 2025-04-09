import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { orderHandler } from "@/helpers/orderHandler";
import { useTranslation } from "@/contexts/translateContext";
import { OrderStateType } from "@/types";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";

const OrderStatusModal = () => {
  const t = useTranslation();
  const { state } = useLocalSearchParams<{ state: OrderStateType }>();

  const orderSteps = orderHandler.getOrderTimelineSteps(state || "pending", t);

  return (
    <ModalWrapper>
      <Header 
        title={t("modals.orderStatus.header")}
        titleSize={18}
        iconLeft={<BackButton />} 
        style={[
          styles.padded, 
          {
            marginBottom: 15,
          }
        ]}
      />

      <View style={styles.content}>
        <Timeline 
          steps={orderSteps} 
          style={{
            paddingHorizontal: 15,
          }}
        />
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 15,
  },
});

export default OrderStatusModal;
