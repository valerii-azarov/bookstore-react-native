import { router } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const SignInScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign In Screen</Text>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/sign-up")}
        >
          <Text style={styles.buttonText}>Go to Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(admin)/(tabs)/books")}
        >
          <Text style={styles.buttonText}>Go to Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(user)/(tabs)/books")}
        >
          <Text style={styles.buttonText}>Go to User</Text>
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

export default SignInScreen;
