import { useState } from "react";
import { View, StyleSheet } from "react-native";
import ColorPicker, { Panel1, Preview, HueSlider, Swatches } from "reanimated-color-picker";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";
import { verticalScale } from "@/helpers/common";
import "@/reanimatedConfig";

import Typography from "@/components/Typography";

type ColorChangerProps = {
  initialColor?: string;
  onColorChange?: (hex: string) => void;
  title?: string;
  showTitle?: boolean;
};

const ColorChanger = ({
  initialColor = colors.grayTint6,
  onColorChange,
  title = "Change color",
  showTitle = false,
}: ColorChangerProps) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleColorChange = ({ hex }: { hex: string }) => {
    setSelectedColor(hex);
    onColorChange?.(hex);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorConverter.darkerHexColor(initialColor),
        },
      ]}
    >
      {title.trim() !== "" && showTitle && (
        <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.title}>
          {title}
        </Typography>
      )}

      <ColorPicker value={selectedColor} onComplete={handleColorChange}>
        <Preview
          style={styles.preview}
          textStyle={{
            fontSize: verticalScale(14),
          }}
        />
        <Panel1 style={styles.panel} />
        <HueSlider style={styles.slider} />
        <Swatches
          colors={[
            "#ff0000",
            "#ff7f00",
            "#ffff00",
            "#00ff00",
            "#00ffff",
            "#0000ff",
            "#8b00ff",
          ]}
          swatchStyle={styles.swatch}
        />
      </ColorPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default ColorChanger;
