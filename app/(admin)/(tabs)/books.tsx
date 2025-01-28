import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BooksScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Books Admin Screen</Text>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <TouchableOpacity style={styles.button} onPress={() => { router.push("/(admin)/(modals)/create-book"); }}>
          <Text style={styles.buttonText}>Create Book</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { router.push("/(admin)/(modals)/edit-book"); }}>
          <Text style={styles.buttonText}>Edit Book</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => { router.navigate("/(admin)/book/1"); }}>
          <Text style={styles.buttonText}>Book Details</Text>
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

export default BooksScreen;
