import { View, FlatList, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
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
import CartItem from "@/components/CartItem";
import Typography from "@/components/Typography";

const CartModal = () => { 
  const t = useTranslation();

  const router = useRouter();
  
  const cartBooks = useCartStore(selectCartBooks);
  
  const removeFromCart = useCartStore(selectRemoveFromCart);
  const updateQuantity = useCartStore(selectUpdateQuantity);

  const discountAmount = useCartStore(selectGetDiscountAmount)();
  const subtotal = useCartStore(selectGetSubtotal)();
  const total = useCartStore(selectGetTotal)();
  
  const isHasItems = cartBooks.length > 0;
  const isEmpty = cartBooks.length === 0;

  return (
    <ModalWrapper>
      <Header
        title={t("modals.cart.header.text")}
        titleSize={18}
        iconLeft={<BackButton />}
        style={{
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      />

      <View 
        style={[
          styles.content,
          isEmpty && {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {isHasItems && (
          <View style={styles.listContainer}>
            <FlatList
              data={cartBooks}
              renderItem={({ item, index }) => (  
                <Animated.View
                  entering={FadeInDown.delay(index * 100)}
                >  
                  <CartItem
                    item={item}
                    onViewDetails={() => router.push(`/(user)/book/${item.id}`)}
                    onRemoveFromCart={removeFromCart}
                    onUpdateQuantity={updateQuantity}
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
                style={styles.totalTitle}
              >
                {t("modals.cart.titles.order")}
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
                  {t("modals.cart.labels.subtotal.text")}
                </Typography>

                <Typography 
                  fontSize={16} 
                  fontWeight="bold"
                  color={colors.black}
                  numberOfLines={1} 
                  style={styles.totalValue}
                >
                  {subtotal.toFixed(2)}₴
                </Typography>
              </View>

              {discountAmount > 0 && (  
                <View style={styles.totalRow}>
                  <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
                    {t("modals.cart.labels.discount.text")}
                  </Typography>

                  <Typography 
                    fontSize={16} 
                    fontWeight="bold" 
                    color={colors.red}
                    numberOfLines={1}  
                    style={styles.totalValue}
                  >
                    -{discountAmount.toFixed(2)}₴
                  </Typography>
                </View>
              )}

              <View
                style={[
                  styles.divider,
                  {
                    marginTop: 15,
                    marginBottom: 10,
                  },
                ]}
              />

              <View style={styles.totalRow}>
                <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
                  {t("modals.cart.labels.total.text")}
                </Typography>

                <Typography 
                  fontSize={16} 
                  fontWeight="bold" 
                  numberOfLines={1}
                  color={colors.black} 
                  style={styles.totalValue}
                >
                  {total.toFixed(2)}₴
                </Typography>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  router.push("/(user)/(modals)/checkout");
                }}
              >
                <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                  {t("modals.cart.buttons.checkout.text")}
                </Typography>
              </Button>
            </View>
          </View>
        )}

        {isEmpty && (
          <Typography fontSize={16} fontWeight="medium" color={colors.gray}>
            {t("modals.cart.messages.empty.text")}
          </Typography>
        )}
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  totalContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  totalTitle: {
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  totalValue: {
    maxWidth: 200,
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.grayTint5,
    opacity: 0.3,
  },
  buttonContainer: {
    backgroundColor: colors.grayTint9,
    padding: 10,
    paddingHorizontal: 15,
  },
});

export default CartModal;
