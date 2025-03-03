import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { colors } from "@/constants/theme";

import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import Typography from "@/components/Typography";

type BookPricingProps = {
  initialPrice?: number;
  initialOriginalPrice?: number;
  initialDiscount?: number;
  onPriceChange?: (data: { price: number; originalPrice?: number; discount?: number }) => void;
};

const BookPricing = ({ initialPrice = 0, initialOriginalPrice, initialDiscount, onPriceChange }: BookPricingProps) => {
  const { t } = useLanguageContext();
  const [values, setValues] = useState<{
    price: string;
    originalPrice: string;
    discount: string;
  }>({
    price: initialPrice.toString(),
    originalPrice: initialOriginalPrice?.toString() || "",
    discount: initialDiscount?.toString() || "",
  });
  const [manual, setManual] = useState<boolean>(false);
  
  const calculatePrice = useCallback((originalPrice: string, discount: string) => {
    const originalPriceNum = parseFloat(originalPrice) || 0;
    const discountNum = parseFloat(discount) || 0;

    if (originalPriceNum >= 0) {
      const newPrice = discountNum === 0 ? originalPriceNum : originalPriceNum * (1 - discountNum / 100);
      const roundedPrice = newPrice.toFixed(2);
      
      setValues((prev) => ({ ...prev, price: roundedPrice }));
      onPriceChange?.({
        price: Number(roundedPrice),
        originalPrice: originalPriceNum,
        discount: discountNum,
      });
    }
  }, [onPriceChange]);
  
  const calculateDiscount = useCallback((price: string, originalPrice: string) => {
    const priceNum = parseFloat(price) || 0;
    const originalPriceNum = parseFloat(originalPrice) || 0;

    if (priceNum > 0 && originalPriceNum > 0) {
      if (priceNum < originalPriceNum) {
        const percent = ((originalPriceNum - priceNum) / originalPriceNum) * 100;
        const roundedPercent = percent.toFixed(2);
        
        setValues((prev) => ({ ...prev, discount: roundedPercent }));
        onPriceChange?.({
          price: priceNum,
          originalPrice: originalPriceNum,
          discount: Number(roundedPercent),
        });
      } else {
        setValues((prev) => ({ ...prev, discount: "0" }));
        onPriceChange?.({ 
          price: priceNum, 
          originalPrice: originalPriceNum, 
          discount: 0,
        });
      }
    }
  }, [onPriceChange]);
  
  const handleChange = useCallback((type: "price" | "originalPrice" | "discount", value: string) => {
    if (!manual && type === "price") return;

    const cleanedValue = value.replace(/[^0-9.]/g, "");
    setValues((prev) => ({ ...prev, [type]: cleanedValue }));
    
    const currentValues = { ...values, [type]: cleanedValue };
    const priceNum = parseFloat(currentValues.price) || 0;
    const originalPriceNum = parseFloat(currentValues.originalPrice) || undefined;
    const discountNum = parseFloat(currentValues.discount) || undefined;

    if (type === "price") {
      if (manual) {
        onPriceChange?.({
          price: priceNum,
          originalPrice: originalPriceNum,
          discount: discountNum,
        });
      }
    }

    if (type === "originalPrice") {
      if (!manual && currentValues.discount) {
        calculatePrice(
          cleanedValue, 
          currentValues.discount,
        );
      } else if (!manual && currentValues.price) {
        calculateDiscount(
          currentValues.price, 
          cleanedValue,
        );
      } else {
        onPriceChange?.({
          price: priceNum,
          originalPrice: originalPriceNum,
          discount: discountNum,
        });
      }
    }  

    if (type === "discount") {
      if (!manual && currentValues.originalPrice) {
        calculatePrice(
          currentValues.originalPrice, 
          cleanedValue,
        );
      } else {
        onPriceChange?.({
          price: priceNum,
          originalPrice: originalPriceNum,
          discount: discountNum,
        });
      }
    }
  }, [values, manual, calculatePrice, calculateDiscount, onPriceChange]);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Typography fontSize={14} color={colors.white} style={styles.label}>
          {t("components.pricing.labels.price")}
        </Typography>
        
        <Field
          value={values.price}
          onChangeText={(value) => handleChange("price", value)}
          placeholder={t(`components.pricing.${manual ? "placeholders.price" : "static.calculated"}`)}
          editable={manual}
          style={
            !manual ? { color: colors.gray } : undefined
          }
          isSquared
        />
      </View>

      <View style={styles.field}>
        <Typography fontSize={14} color={colors.white} style={styles.label}>
          {t("components.pricing.labels.originalPrice")}
        </Typography>

        <Field
          value={values.originalPrice}
          onChangeText={(value) => handleChange("originalPrice", value)}
          placeholder={t("components.pricing.placeholders.originalPrice")}
          isSquared
        />
      </View>

      <View style={styles.field}>  
        <Typography fontSize={14} color={colors.white} style={styles.label}>
          {t("components.pricing.labels.discount")}
        </Typography>

        <Field
          value={values.discount}
          onChangeText={(value) => handleChange("discount", value)}
          placeholder={t("components.pricing.placeholders.discount")}
          isSquared
        />
      </View>

      <View style={styles.checkbox}>
        <Checkbox checked={manual} onPress={() => setManual(!manual)} />
        <Typography fontSize={16} color={colors.white} style={styles.checkboxText}>
          {t("components.pricing.checkbox.text")}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  label: {
    marginBottom: 5,
  },
  field: {
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 10,
  },
});

export default BookPricing;
