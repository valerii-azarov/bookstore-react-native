import { useState } from "react";
import { View, Alert, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { BoookImages } from "@/types";

import Typography from "@/components/Typography";

type BookImagesFieldProps = {
  initialValues: BoookImages;
  onChange: (values: BoookImages) => void;
  isLabelColorWhite?: boolean;
  isBorderColorWhite?: boolean;
};

const BookImagesField = ({ 
  initialValues, 
  onChange, 
  isLabelColorWhite = false,
  isBorderColorWhite = false,
}: BookImagesFieldProps) => {
  const t = useTranslation();
  const [images, setImages] = useState<BoookImages>(initialValues);

  const pickImage = async (isCover: boolean, index?: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        t("components.images.messages.denied.text"), 
        t("components.images.messages.denied.subText"),
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.5,
      base64: false,
    });

    if (!result.canceled && result.assets[0].uri) {
      const newImages = { 
        ...images,
        [isCover ? "coverImage" : "additionalImages"]: 
          isCover 
            ? result.assets[0].uri 
            : index !== undefined 
              ? images.additionalImages.map((image, i) => i === index ? result.assets[0].uri : image)
              : [...images.additionalImages, result.assets[0].uri]
      };
      setImages(newImages);
      onChange(newImages);
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = { 
      ...images, 
      additionalImages: images.additionalImages.filter((_, i) => i !== index) 
    };
    setImages(newImages);
    onChange(newImages);
  };

  const clearImage = () => {
    const newImages = { ...images, coverImage: "" };
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <Typography fontSize={14} color={isLabelColorWhite ? colors.white : colors.black} style={styles.label}>
          {t("components.images.coverImage.label")}
        </Typography>

        <View style={styles.coverImageContainer}>
          <TouchableOpacity 
            style={[
              styles.imageButton, 
              { 
                width: 250,
                height: 367,
                borderColor: isBorderColorWhite ? colors.white : colors.black, 
                borderRadius: 10,
              },
            ]}
            onPress={() => pickImage(true)}
          >
            {images.coverImage ? (
              <>
                <Image
                  source={{ uri: images.coverImage }}
                  style={[
                    styles.imageButton, 
                    { 
                      width: 250, 
                      height: 367, 
                      borderRadius: 10,
                    },
                  ]}
                  resizeMode="cover"
                />

                <TouchableOpacity 
                  onPress={clearImage} 
                  style={[
                    styles.deleteIcon, 
                    { 
                      width: verticalScale(30), 
                      height: verticalScale(30), 
                      top: 10, 
                      right: 10, 
                    },
                  ]}
                >
                  <Icon name="close-outline" size={24} color={colors.white} />
                </TouchableOpacity>
              </>
            ) : (
              <Typography fontSize={16} fontWeight="medium" color={isLabelColorWhite ? colors.white : colors.black} style={{ textAlign: "center"}}>
                {t("components.images.coverImage.tapToSelect")}
              </Typography>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageSection}>
        <Typography fontSize={14} color={isLabelColorWhite ? colors.white : colors.black} style={styles.label}>
          {t("components.images.additionalImages.label")}
        </Typography>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.additionalImagesContainer}
          style={styles.additionalImagesScroll}
        >
          {images.additionalImages.map((imageUrl, index) => (
            <View 
              key={index} 
              style={styles.additionalImageEditContainer}
            >
              <TouchableOpacity
                style={[
                  styles.imageButton, 
                  { 
                    width: 100, 
                    height: 147, 
                    borderRadius: 5,
                  },
                ]}
                onPress={() => pickImage(false, index)}
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={[
                    styles.imageButton, 
                    { 
                      width: 100, 
                      height: 147,
                      borderRadius: 5,
                    },
                  ]}
                  resizeMode="cover"
                />

                <TouchableOpacity
                  onPress={() => removeAdditionalImage(index)}
                  style={[
                    styles.deleteIcon, 
                    { 
                      width: verticalScale(25), 
                      height: verticalScale(25), 
                      top: 5, 
                      right: 5,
                    },
                  ]}
                >
                  <Icon name="close-outline" size={18} color={colors.white} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => pickImage(false)}
            style={[
              styles.imageButton, 
              { 
                width: 100, 
                height: 147,
                borderColor: isBorderColorWhite ? colors.white : colors.black, 
                borderRadius: 5,
              },
            ]}
          >
            <Typography fontSize={10} fontWeight="medium" color={isLabelColorWhite ? colors.white : colors.black} style={{ textAlign: "center"}}>
              {t("components.images.additionalImages.tapToAdd")}
            </Typography>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSection: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  coverImageContainer: {
    paddingVertical: 5,
    alignItems: "center",
  },
  imageButton: {
    backgroundColor: "transparent",
    borderColor: colors.white,
    borderStyle: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  additionalImagesScroll: {
    maxHeight: 167,
  },
  additionalImagesContainer: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  additionalImageEditContainer: {
    marginRight: 10,
  },
  deleteIcon: {
    backgroundColor: colors.grayTint3,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default BookImagesField;
