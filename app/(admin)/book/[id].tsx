import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const BookDetailScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Book Detail Screen for ID: {id}</Text>
    </View>
  );
};

export default BookDetailScreen;
