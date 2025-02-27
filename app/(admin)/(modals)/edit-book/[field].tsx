import { useLocalSearchParams } from "expo-router";
import { colors } from "@/constants/theme";

import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";
import { View } from "react-native";

type EditFieldType = {
  images: string;
  backgroundColor: string;
  title: string;
  authors: string;
  price: string;
  genres: string;
  pageCount: string;
  publisher: string;
  coverType: string;
  publicationYear: string;
  language: string;
  size: string;
  weight: string;
  illustrations: boolean;
  bookType: string;
  paperType: string;
  isbn: string;
  quantity: number;
  sku: string;
  description: string;
};

const EditBookScreen = () => {
  const { field } = useLocalSearchParams<{ field: keyof EditFieldType }>();

  console.log(field);

  return (
    <ModalWrapper style={{ backgroundColor: colors.creamTint9 }}>
      <Header
        title="Edit Book Modal"
        iconLeft={
          <BackButton style={{ backgroundColor: colors.orangeTint5 }} />
        }
        style={{
          paddingHorizontal: 15,
          marginBottom: 15,
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        <Typography fontSize={16} fontWeight="bold" color={colors.black}>
          {field}
        </Typography>
      </View>
    </ModalWrapper>
  );
};

export default EditBookScreen;
