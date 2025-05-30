import React, { useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useCartStore } from "@/stores/cartStore";
import { 
  selectCartBooks, 
  selectRemoveFromCart,
  selectUpdateQuantity,
  selectGetDiscountAmount,
  selectGetSubtotal,
  selectGetTotal,
} from "@/selectors/cartSelectors";
import { colors } from "@/constants/theme";

import ModalWrapper from "@/components/ModalWrapper";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import CartItem, { SwipeableRef } from "@/components/CartItem";
import Typography from "@/components/Typography";

const CartModal = () => { 
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();
  
  const cartBooks = useCartStore(selectCartBooks);
  
  const removeFromCart = useCartStore(selectRemoveFromCart);
  const updateQuantity = useCartStore(selectUpdateQuantity);

  const discountAmount = useCartStore(selectGetDiscountAmount)();
  const subtotal = useCartStore(selectGetSubtotal)();
  const total = useCartStore(selectGetTotal)();
  
  const isHasItems = cartBooks.length > 0;
  const isEmpty = cartBooks.length === 0;

  const swipeableRefs = useRef<Array<SwipeableRef | null>>([]);

  return (
    <ModalWrapper>
      <Header
        title={t("modals.cart.header.title")}
        titleSize={18}
        iconLeft={<BackButton />}
        style={{
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      />

      <View 
        style={{
          flex: 1,
          justifyContent: isEmpty ? "center" : undefined,
          alignItems: isEmpty ? "center" : undefined,
        }}
      >
        {isHasItems && (
          <View style={{ flex: 1 }}>
            <FlatList
              data={cartBooks}
              renderItem={({ item, index }) => (  
                <Animated.View
                  key={`book-${item.id}`}
                  entering={FadeInDown.delay(index * 75)}
                >  
                  <CartItem
                    ref={(ref) => {
                      if (ref) {
                        swipeableRefs.current[index] = ref;
                      }
                    }}
                    item={item}
                    onView={(bookId) => router.push(`/(user)/book/${bookId}`)}
                    onRemoveFromCart={(bookId) => {
                      if (swipeableRefs.current[index]) {
                        swipeableRefs.current[index]?.close();
                      }
                      setTimeout(() => removeFromCart(bookId), 500);
                    }}
                    onUpdateQuantity={updateQuantity}
                    alerts={{
                      title: t("modals.cart.alerts.confirmDelete.title"),
                      message: t("modals.cart.alerts.confirmDelete.message"),
                      buttons: {
                        cancel: t("modals.cart.alerts.confirmDelete.buttons.cancel"),
                        confirm: t("modals.cart.alerts.confirmDelete.buttons.confirm"),
                      }
                    }}
                  />
                </Animated.View>
              )}
              keyExtractor={(item) => item.id}
              numColumns={1}
              contentContainerStyle={{
                paddingHorizontal: 15,
                gap: 10,
              }}
            />

            <View style={styles.totalContainer}>
              <Typography 
                fontSize={18} 
                fontWeight="bold" 
                color={colors.black} 
                numberOfLines={1}
                style={{ marginBottom: 10 }}
              >
                {t("modals.cart.labels.order")}
              </Typography>

              <View 
                style={[
                  styles.totalRow, 
                  {
                    marginBottom: discountAmount > 0 ? 15 : 0,
                  },
                ]}
              >
                <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
                  {t("modals.cart.labels.subtotal")}
                </Typography>

                <Typography 
                  fontSize={16} 
                  fontWeight="bold"
                  color={colors.black}
                  numberOfLines={1} 
                  style={{ maxWidth: 200 }}
                >
                  {subtotal.toFixed(2)}₴
                </Typography>
              </View>

              {discountAmount > 0 && (  
                <View style={styles.totalRow}>
                  <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
                    {t("modals.cart.labels.discount")}
                  </Typography>

                  <Typography 
                    fontSize={16} 
                    fontWeight="bold" 
                    color={colors.red}
                    numberOfLines={1}  
                    style={{ maxWidth: 200 }}
                  >
                    -{discountAmount.toFixed(2)}₴
                  </Typography>
                </View>
              )}

              <View
                style={{
                  height: 1.5,
                  backgroundColor: colors.grayTint5,
                  marginTop: 15,
                  marginBottom: 10,
                  opacity: 0.3,
                }}
              />

              <View style={styles.totalRow}>
                <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
                  {t("modals.cart.labels.total")}
                </Typography>

                <Typography 
                  fontSize={16} 
                  fontWeight="bold" 
                  numberOfLines={1}
                  color={colors.black} 
                  style={{ maxWidth: 200 }}
                >
                  {total.toFixed(2)}₴
                </Typography>
              </View>
            </View>

            <View 
              style={{
                backgroundColor: colors.grayTint9,
                padding: 10,
                paddingHorizontal: 15,
              }}
            >
              <Button
                onPress={() => {
                  router.push("/(user)/(modals)/checkout");
                }}
                disabled={!isConnected || isEmpty}
              >
                <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                  {t("modals.cart.buttons.checkout")}
                </Typography>
              </Button>
            </View>
          </View>
        )}

        {isEmpty && (
          <Typography fontSize={16} fontWeight="medium" color={colors.gray}>
            {t("modals.cart.messages.empty.title")}
          </Typography>
        )}
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default CartModal;
