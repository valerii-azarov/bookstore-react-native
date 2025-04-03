import { useState } from "react";
import { View, FlatList, Platform, StyleSheet } from "react-native";
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
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import CartBookItem from "@/components/CartBookItem";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

const CartModal = () => {
  const router = useRouter();
  
  const t = useTranslation();
  
  const cartBooks = useCartStore(selectCartBooks);
  
  const removeFromCart = useCartStore(selectRemoveFromCart);
  const updateQuantity = useCartStore(selectUpdateQuantity);

  const discountAmount = useCartStore(selectGetDiscountAmount)();
  const subtotal = useCartStore(selectGetSubtotal)();
  const total = useCartStore(selectGetTotal)();

  const [footerHeight, setFooterHeight] = useState<number>(0);
  
  const isHasItems = cartBooks.length > 0;
  const isEmpty = cartBooks.length === 0;

  return (
    <ModalWrapper>
      <Header
        title={t("modals.cart.header.text")}
        iconLeft={<BackButton />}
        style={styles.header}
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
          <View style={styles.listWrapper}>
            <View style={styles.listContainer}>
              <FlatList
                data={cartBooks}
                renderItem={({ item, index }) => (  
                  <Animated.View
                    entering={FadeInDown.delay(index * 100)}
                  >  
                    <CartBookItem
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
                  paddingBottom: footerHeight + 15,
                  gap: 10,
                }}
              />

              <View 
                style={styles.totalContainer}
                onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
              >
                <Typography 
                  fontSize={22} 
                  fontWeight="bold" 
                  numberOfLines={1} 
                  color={colors.black} 
                  style={styles.totalTitle}
                >
                  {t("modals.cart.titles.order")}
                </Typography>

                <View 
                  style={[
                    styles.totalRow, 
                    {
                      marginBottom: 10,
                    },
                  ]}
                >
                  <Typography fontSize={16} fontWeight="medium" color={colors.gray}>
                    {t("modals.cart.labels.subtotal.text")}
                  </Typography>

                  <Typography 
                    fontSize={20} 
                    fontWeight="bold" 
                    numberOfLines={1} 
                    ellipsizeMode="tail" 
                    color={colors.black} 
                    style={styles.totalValue}
                  >
                    {`${subtotal.toFixed(2)}₴`}
                  </Typography>
                </View>

                <View style={styles.totalRow}>
                  <Typography fontSize={16} fontWeight="medium" color={colors.gray}>
                    {t("modals.cart.labels.discount.text")}
                  </Typography>

                  <Typography 
                    fontSize={20} 
                    fontWeight="bold" 
                    numberOfLines={1} 
                    ellipsizeMode="tail" 
                    color={discountAmount > 0 ? colors.red : colors.black} 
                    style={styles.totalValue}
                  >
                    {discountAmount > 0 ? `-${discountAmount.toFixed(2)}₴` : "0₴"}
                  </Typography>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                  <Typography fontSize={16} fontWeight="medium" color={colors.gray}>
                    {t("modals.cart.labels.total.text")}
                  </Typography>

                  <Typography 
                    fontSize={20} 
                    fontWeight="bold" 
                    numberOfLines={1} 
                    ellipsizeMode="tail" 
                    color={colors.black} 
                    style={styles.totalValue}
                  >
                    {`${total.toFixed(2)}₴`}
                  </Typography>
                </View>
              </View>
            </View>

            <View 
              style={[
                styles.buttonContainer,
                {
                  paddingBottom: Platform.OS === "android" ? 0 : 15,
                }
              ]}
            >
              <Button
                onPress={() =>
                  router.push({
                    pathname: "/(user)/(modals)/checkout",
                    params: { 
                      bookIds: JSON.stringify(cartBooks.map(book => book.id)),  
                      totalPrice: total, 
                    },
                  })
                }
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
  header: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    width: "100%",
  },
  listContainer: {
    flex: 1,
    position: "relative",
  },
  totalContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  totalTitle: {
    marginBottom: 5,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  totalValue: {
    maxWidth: 200,
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.grayTint5,
    marginTop: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
});

export default CartModal;
