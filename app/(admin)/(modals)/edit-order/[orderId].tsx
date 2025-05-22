import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const EditOrderScreen = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edit Order Modal for ID: {orderId}</Text>
    </View>
  );
};

export default EditOrderScreen;
