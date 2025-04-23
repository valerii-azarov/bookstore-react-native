import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { selectUser } from "@/selectors/authSelectors";
import { colors } from "@/constants/theme";

import ViewWrapper from "@/components/ViewWrapper";
import Typography from "@/components/Typography";

const ProfileScreen = () => {  
  const router = useRouter();   
  
  const t = useTranslation();
  const user = useAuthStore(selectUser);

  const fields = [
    {
      key: "firstName",
      label: t("screens.profile.fields.firstName"),
      value: user?.firstName || "-",
      isEditable: true,
    },
    {
      key: "lastName",
      label: t("screens.profile.fields.lastName"),
      value: user?.lastName || "-",
      isEditable: true,
    },
    {
      key: "email",
      label: t("screens.profile.fields.email"),
      value: user?.email || "-",
      isEditable: false,
    },
  ];

  return (
    <ViewWrapper 
      title={t("screens.profile.header")} 
      onBackPress={() => router.back()}
      hideFooter
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      > 
        <View style={[styles.content, styles.padded]}>
          {fields.map((field, index) => (
            <View 
              key={index} 
              style={styles.field}
            >
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {field.label}
              </Typography>

              <View style={styles.fieldRow}>
                <Typography
                  fontSize={16}
                  fontWeight="bold"
                  color={colors.black}
                  numberOfLines={1}
                  style={{ flexShrink: 1 }}
                >
                  {field.value}
                </Typography>

                {field.isEditable && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/(user)/(modals)/edit-profile/[field]",
                        params: { field: field.key },
                      })
                    }
                  >
                    <Typography 
                      fontSize={16}
                      fontWeight="bold"
                      color={colors.black}
                      numberOfLines={1}
                      style={{ 
                        flexShrink: 1,
                        textDecorationLine: "underline",
                      }}
                    >
                      {t("screens.profile.button")}
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>  
      </ScrollView>     
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  field: {
    marginBottom: 15,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  padded: {
    padding: 15,
  },
});

export default ProfileScreen;
