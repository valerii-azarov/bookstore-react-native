import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OrdersScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Orders Screen</Text>

      <View style={{ flexDirection: "column", gap: 10 }}>
        <TouchableOpacity style={styles.button} onPress={() => { router.push("/(admin)/(modals)/edit-order"); }}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { router.navigate("/(admin)/order/1"); }}>
          <Text style={styles.buttonText}>Order Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default OrdersScreen;
