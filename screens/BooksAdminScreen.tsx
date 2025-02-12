import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import FloatingActionButton from "@/components/FloatingButton"; 

const BooksAdminScreen = () => {
  const router = useRouter();

  return (
    <ScreenWrapper statusBarStyle="dark" disableTopInset>
      <Header
        style={[
          styles.headerContainer,
          {
            backgroundColor: colors.white,
            borderBottomColor: colors.grayTint7,
            borderBottomWidth: 1,
          },
        ]}
        enableTopInset
      />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
          
        </View>
      </ScrollView>

      <FloatingActionButton
        onPress={() => router.push("/(admin)/(modals)/create-book")}
        icon={
          <Icon name="add" size={32} color={colors.white} />
        }
      />  
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 15,
  },
  contentContainer: {
    flex: 1,
  },
});

export default BooksAdminScreen;