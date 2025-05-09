import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Alert, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { Images } from "@/types";

import Icon from "./Icon";
import Typography from "./Typography";

type ImagesFieldProps = {
  initialImages: Images;
  onImagesChange: (images: Images) => void;
  errors?: Partial<Record<keyof Images, string | null>>;
  labels?: Partial<Record<keyof Images, string>>;
  prompts?: Partial<Record<keyof Images, string>>;
  messages?: {
    denied: {
      text: string;
      subText: string;
    };
  };
};

const ImagesField = ({
  initialImages,
  onImagesChange,
  errors = {},
  labels = {
    coverImage: "Cover Image",
    additionalImages: "Additional Images",
  },
  prompts = {
    coverImage: "Tap to select cover image",
    additionalImages: "Tap to add image",
  },
  messages = {
    denied: {
      text: "Permission Denied",
      subText: "Please allow access to your photo library to select images",
    },
  },
}: ImagesFieldProps) => {
  const [images, setImages] = useState<Images>(initialImages);

  const pickImage = async (isCover: boolean, index?: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(messages.denied.text, messages.denied.subText);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.5,
      base64: false,
    });

    if (!result.canceled && result.assets[0].uri) {
      const newImages = isCover
        ? { ...images, coverImage: result.assets[0].uri }
        : {
            ...images,
            additionalImages:
              index !== undefined
                ? images.additionalImages.map((image, i) => (i === index ? result.assets[0].uri : image))
                : [...images.additionalImages, result.assets[0].uri],
          };
      setImages(newImages);
      onImagesChange(newImages);
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = {
      ...images,
      additionalImages: images.additionalImages.filter((_, i) => i !== index),
    };
    setImages(newImages);
    onImagesChange(newImages);
  };

  const clearImage = () => {
    const newImages = { ...images, coverImage: "" };
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.coverImageContainer}>
        <TouchableOpacity 
          style={[
            styles.tapButton, 
            { 
              width: 250,
              height: 367,
              borderColor: errors?.coverImage ? colors.redTint1 : colors.gray, 
              borderWidth: errors?.coverImage ? 1.5 : 1, 
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
                  styles.tapButton, 
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
                  styles.deleteButton, 
                  { 
                    width: 35, 
                    height: 35, 
                    top: 10, 
                    right: 10, 
                  },
                ]}
              >
                <Icon 
                  iconSet="Ionicons"
                  iconName="close-outline" 
                  iconSize={24}
                  iconColor={colors.white} 
                />
              </TouchableOpacity>
            </>
          ) : (
            <Typography 
              fontSize={16} 
              fontWeight="medium" 
              color={colors.black} 
              style={{ textAlign: "center"}}
            >
              {prompts.coverImage}
            </Typography>
          )}
        </TouchableOpacity>

        {errors?.coverImage && (
          <Typography
            fontSize={12}
            fontWeight="medium"
            color={colors.redTint1}
            numberOfLines={1}
            style={{ marginTop: 5 }}
          >
            {errors.coverImage}
          </Typography>
        )}
      </View>

      {images.coverImage && (
        <View style={styles.additionalImagesContainer}>
          <Typography
            fontSize={14} 
            fontWeight="medium"
            color={colors.black}
          >
            {labels.additionalImages}
          </Typography>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.additionalImages.map((imageUrl, index) => (
              <View 
                key={index} 
                style={{ marginRight: 15 }}
              >
                <TouchableOpacity
                  style={[
                    styles.tapButton, 
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
                      styles.tapButton, 
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
                      styles.deleteButton, 
                      { 
                        width: 25, 
                        height: 25, 
                        top: 5, 
                        right: 5,
                      },
                    ]}
                  >
                    <Icon 
                      iconSet="Ionicons"
                      iconName="close-outline" 
                      iconSize={18} 
                      iconColor={colors.white} 
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              onPress={() => pickImage(false)}
              style={[
                styles.tapButton, 
                { 
                  width: 100, 
                  height: 147,
                  borderColor: colors.gray,
                  borderWidth: 1, 
                  borderRadius: 5,
                },
              ]}
            >
              <Typography 
                fontSize={10} 
                fontWeight="medium" 
                color={colors.black} 
                style={{ textAlign: "center"}}
              >
                {prompts.additionalImages}
              </Typography>
            </TouchableOpacity>
          </ScrollView>

          {errors?.additionalImages && (
            <Typography
              fontSize={12}
              fontWeight="medium"
              color={colors.redTint1}
              numberOfLines={1}
              style={{ marginTop: 5 }}
            >
              {errors.additionalImages}
            </Typography>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 15,
  },
  coverImageContainer: {
    alignItems: "center",
  },
  additionalImagesContainer: {
    flexDirection: "column",
    gap: 5,
  },
  tapButton: {
    backgroundColor: "transparent",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  deleteButton: {
    backgroundColor: colors.grayTint3,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default ImagesField;
