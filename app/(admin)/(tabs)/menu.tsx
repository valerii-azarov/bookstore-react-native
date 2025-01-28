import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MenuScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Menu Admin Screen</Text>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <TouchableOpacity style={styles.button} onPress={() => { router.push("/"); }}>
          <Text style={styles.buttonText}>Logout</Text>
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

export default MenuScreen;
