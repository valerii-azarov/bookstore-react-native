import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import authApi from "@/api/authApi";

const MenuScreen = () => {
  const handleLogout = async () => {
    await authApi.logout();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Menu User Screen</Text>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <TouchableOpacity style={styles.button} onPress={() => { router.push("/profile"); }}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { router.push("/favorites"); }}>
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { router.push("/viewing-history"); }}>
          <Text style={styles.buttonText}>Viewing History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
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
