import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { Rates } from "@/types";

import Field from "./Field";
import Checkbox from "./Checkbox";
import Typography from "./Typography";

type RateCalculatorProps = {
  initialRates: Rates;
  onRatesChange: (values: Rates) => void;
  errors?: Partial<Record<keyof Rates, string | null>>;
  labels?: Partial<Record<keyof Rates, string>>;
  placeholders?: Partial<Record<keyof Rates, string>>;
  checkboxes?: { manual: string }; 
};

const RateCalculator = ({ 
  initialRates,
  onRatesChange,
  errors = {},
  labels = {
    originalPrice: "Enter original price",
    discount: "Enter percents",
    price: "Enter price",
  },
  placeholders = {
    originalPrice: "e.g. 500.00",
    discount: "e.g. 15",
    price: "e.g. 425.00",
  },
  checkboxes = {
    manual: "Manual price entry",
  }
}: RateCalculatorProps) => {
  const [rates, setRates] = useState<Rates>(initialRates);
  const [manual, setManual] = useState<boolean>(false);

  const handleRateChange = useCallback((field: keyof Rates, value: string) => {
    const numericValue = parseFloat(value) || 0;
    const updatedRates = { ...rates, [field]: numericValue };

    if (!manual && (field === "originalPrice" || field === "discount")) {
      const discountFraction = updatedRates.discount / 100;
      const calculatedPrice = updatedRates.originalPrice * (1 - discountFraction);
      updatedRates.price = Number(calculatedPrice.toFixed(2));
    }

    setRates(updatedRates);
    onRatesChange(updatedRates);
  }, [rates, manual, onRatesChange]);

  const handleManualToggle = useCallback(() => {
    setManual((prev) => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
          {labels.originalPrice}
        </Typography> 
        
        <Field
          type="input"
          value={rates.originalPrice === 0 ? "" : rates.originalPrice.toString()}
          onChangeText={(value) => handleRateChange("originalPrice", value)}
          placeholder={placeholders.originalPrice}
          error={errors.originalPrice}
          isNumeric
        />
      </View>

      <View style={styles.field}>
        <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
          {labels.discount}
        </Typography>
        
        <Field
          type="input"
          value={rates.discount === 0 ? "" : rates.discount.toString()}
          onChangeText={(value) => handleRateChange("discount", value)}
          placeholder={placeholders.discount}
          error={errors.discount}
          isNumeric
          isInteger
        />
      </View>

      <View style={styles.field}>
        <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginBottom: 5 }}>
          {labels.price}
        </Typography>

        <Field
          type="input"
          value={rates.price === 0 ? "" : rates.price.toString()}
          onChangeText={(value) => handleRateChange("price", value)}
          placeholder={placeholders.price}
          error={errors.price}
          editable={manual}
          isNumeric
        />
      </View>

      <View style={styles.checkbox}>
        <Checkbox
          checked={manual}
          onPress={handleManualToggle}
          label={checkboxes.manual}
          labelSize={16}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 15,
  },
  field: {
    minHeight: 75,
  },
  checkbox: {
    alignItems: "flex-start",
  },
});

export default RateCalculator;
