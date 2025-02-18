import React, { useState } from "react";
import { View, ViewStyle, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";

import Typography from "@/components/Typography";

type ImageUploadProps = {
  imageUri?: string | null;
  onSelectImage: (uri: string | null) => void;
  onClearImage: () => void;
  inputStyle?: ViewStyle;
  imageStyle?: ViewStyle;
  placeholder?: string;
};

const ImageUpload = ({
  imageUri,
  onSelectImage,
  onClearImage,
  inputStyle,
  imageStyle,
  placeholder = "Upload Image",
}: ImageUploadProps) => {
  const [image, setImage] = useState<string | null>(imageUri || null);

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
      base64: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onSelectImage(result.assets[0].uri);
    }
  };

  const clearImage = () => {
    setImage(null);
    onClearImage();
  };

  return (
    <View>
      {!image && (
        <TouchableOpacity
          onPress={chooseImage}
          style={[
            styles.inputContainer, 
            inputStyle,
          ]}
        >
          <Icon name="image-outline" size={24} color={colors.gray} />
          <Typography fontSize={14} fontWeight="medium">
            {placeholder}
          </Typography>
        </TouchableOpacity>
      )}

      {image && (
        <View 
          style={[
            styles.imageContainer, 
            imageStyle,
          ]}
        >
          <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMode="cover"
          />
          <TouchableOpacity 
            onPress={clearImage} 
            style={styles.deleteIcon}
          >
            <Icon name="close-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(75),
    gap: 10,
    backgroundColor: colors.white,
    borderColor: colors.grayTint3,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 10,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 5 / 7,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  deleteIcon: {
    position: "absolute",
    width: verticalScale(30),
    height: verticalScale(30),
    top: 10,
    right: 10,
    backgroundColor: colors.grayTint5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageUpload;
