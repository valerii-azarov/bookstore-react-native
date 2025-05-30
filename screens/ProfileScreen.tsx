import { View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { selectUser } from "@/selectors/authSelectors";
import { colors } from "@/constants/theme";

import ViewWrapper from "@/components/ViewWrapper";
import Typography from "@/components/Typography";

interface FieldItem {
  key: string;
  label: string;
  value: string;
  isEditable: boolean;
}

const ProfileScreen = () => {  
  const router = useRouter();   
  
  const t = useTranslation();
  const isConnected = useIsConnected();

  const user = useAuthStore(selectUser);

  const fields: FieldItem[] = [
    {
      key: "firstName",
      label: t("screens.profile.fields.firstName.label"),
      value: user?.firstName || "-",
      isEditable: true,
    },
    {
      key: "lastName",
      label: t("screens.profile.fields.lastName.label"),
      value: user?.lastName || "-",
      isEditable: true,
    },
    {
      key: "email",
      label: t("screens.profile.fields.email.label"),
      value: user?.email || "-",
      isEditable: false,
    },
  ];

  return (
    <ViewWrapper 
      title={t("screens.profile.header.title")} 
      onBackPress={() => router.back()}
      hideFooter
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      > 
        <View style={{ flex: 1, padding: 15 }}>
          {fields.map((field, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={colors.gray}
                numberOfLines={1}
                style={{ marginBottom: 2.5 }}
              >
                {field.label}
              </Typography>

              <View 
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
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
                    onPress={() => {
                      if (isConnected) {
                        router.push({
                          pathname: "/edit-profile/[field]",
                          params: { field: field.key },
                        });
                      }
                    }}
                    disabled={!isConnected}
                  >
                    <Typography 
                      fontSize={16}
                      fontWeight="bold"
                      color={isConnected ? colors.black : colors.grayTint5}
                      numberOfLines={1}
                      style={{ 
                        flexShrink: 1,
                        textDecorationLine: "underline",
                      }}
                    >
                      {t("screens.profile.buttons.edit")}
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

export default ProfileScreen;
