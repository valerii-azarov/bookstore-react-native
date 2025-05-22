import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const OrderDetailScreen = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Order Detail Screen for ID: {orderId}</Text>
    </View>
  );
};

export default OrderDetailScreen;
