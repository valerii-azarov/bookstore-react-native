import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Order Detail Screen for ID: {id}</Text>
    </View>
  );
};

export default OrderDetailScreen;
