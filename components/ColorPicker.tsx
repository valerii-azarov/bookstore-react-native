import { View, StyleSheet } from "react-native";
import { useSharedValue, runOnJS } from "react-native-reanimated";
import ColorPickerComponent, {
  Panel1,
  Preview,
  HueSlider,
  Swatches,
} from "reanimated-color-picker";
import type { ColorFormatsObject } from "reanimated-color-picker";
import { colors } from "@/constants/theme";

import "@/reanimatedConfig";

type ColorPickerProps = {
  initialColor?: string;
  onColorChange: (color: string) => void;
};

const ColorPicker = ({ 
  initialColor = colors.white, 
  onColorChange, 
}: ColorPickerProps) => {
  const selectedColor = useSharedValue(initialColor);

  const onColorSelect = (color: ColorFormatsObject) => {
    "worklet";
    selectedColor.value = color.hex;
    runOnJS(onColorChange)(color.hex);
  };

  return (
    <View style={styles.container}>
      <ColorPickerComponent
        value={selectedColor.value}
        sliderThickness={25}
        thumbSize={24}
        thumbShape="circle"
        onComplete={onColorSelect}
        boundedThumb
      >
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
  preview: {
    height: 35,
    borderRadius: 8,
    marginBottom: 15,
  },
  panel: {
    height: 200,
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
