import { Text, View  } from "react-native";
import { useLocalSearchParams } from "expo-router";

const SearchScreen = () => {
  const { query } = useLocalSearchParams();

  console.log(query);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search Screen</Text>
    </View>
  );
};

export default SearchScreen;
