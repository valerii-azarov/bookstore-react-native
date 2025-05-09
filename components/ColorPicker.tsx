import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ColorPickerComponent, { Panel1, Preview, HueSlider, Swatches } from "reanimated-color-picker";
import { colors } from "@/constants/theme";

import "@/reanimatedConfig";

type ColorPickerProps = {
  initialColor: string;
  onColorChange?: (hex: string) => void;
};

const ColorPicker = ({ initialColor, onColorChange }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(initialColor || colors.white);

  const handleColorChange = ({ hex }: { hex: string }) => {
    setSelectedColor(hex);
    onColorChange?.(hex);
  };

  return (
    <View style={styles.container}>
      <ColorPickerComponent value={selectedColor} onComplete={handleColorChange}>
        <Preview
          style={styles.preview}
          textStyle={{
            fontSize: 14,
            color: colors.black,
          }}
        />

        <Panel1 style={styles.panel} />

        <HueSlider style={styles.slider} />
        
        <Swatches
          colors={[
            "#FF0000",
            "#FF7F00",
            "#FFFF00",
            "#00FF00",
            "#00FFFF",
            "#0000FF",
            "#8B00FF",
          ]}
          swatchStyle={styles.swatch}
        />
      </ColorPickerComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayTint6,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    marginBottom: 15,
  },
  preview: {
    height: 35,
    borderRadius: 8,
    marginBottom: 15,
  },
  panel: {
    height: 250,
    borderRadius: 8,
    marginBottom: 15,
  },
  slider: {
    marginBottom: 15,
  },
  swatch: {
    width: 25,
    height: 25,
  },
});

export default ColorPicker;
