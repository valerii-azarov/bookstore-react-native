import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { View, Alert, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { format } from "date-fns";
import { orderHandler } from "@/helpers/orderHandler";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useOrderStore } from "@/stores/orderStore";
import {
  selectOrder,
  selectOrderStatus,
  selectOrderResponse,
  selectSetOrderById,
  selectLoadOrderById,
  selectResetOrder,
} from "@/selectors/orderSelectors";
import { colors } from "@/constants/theme";

import ViewWrapper from "@/components/ViewWrapper";
import Loading from "@/components/Loading";
import Image from "@/components/Image";
import IconButton from "@/components/IconButton";
import RedirectButton from "@/components/RedirectButton";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const OrderDetailsScreen = () => { 
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const order = useOrderStore(selectOrder);
  const orderStatus = useOrderStore(selectOrderStatus);
  const orderResponse = useOrderStore(selectOrderResponse);

  const setOrderById = useOrderStore(selectSetOrderById);
  const loadOrderById = useOrderStore(selectLoadOrderById);
  const resetOrder = useOrderStore(selectResetOrder);

  const isLoading = orderStatus === "loading";
  const isError = !isLoading && orderResponse?.status === "error";

  const copyOrderId = async (value: string) => {
    await Clipboard.setStringAsync(value);
    Alert.alert(
      t("screens.orderDetails.alerts.copied.title"),
      t("screens.orderDetails.alerts.copied.message")
    );
  };

  useEffect(() => {
    if (orderId && isConnected) {
      setOrderById(orderId);
      loadOrderById();
    }
    return () => resetOrder();
  }, [orderId, isConnected]);  

  return (
    <ViewWrapper
      title={t("screens.orderDetails.header.title")}
      onBackPress={() => router.back()}
      hideFooter
    >
      {!isConnected && (
        <ErrorNetwork 
          message={t("common.messages.errorNetwork.title")}
          subMessage={t("common.messages.errorNetwork.subtitle")}
        />
      )}
      
      {isConnected && isLoading && (
        <Loading size="small" color={colors.orange} />
      )}

      {isConnected && isError && !isLoading && (
        <ErrorWithRetry 
          message={t("common.messages.failedLoad.title")}
          subMessage={t("common.messages.failedLoad.subtitle")}
          hideButton 
        />
      )}

      {isConnected && !isLoading && !isError && order && (
        <ScrollView 
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.orderNumber")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <View style={styles.orderNumberRow}>
                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                    style={{ 
                      flex: 1,
                      marginRight: 10,
                    }}
                  >
                    {order.id}
                  </Typography>

                  <IconButton 
                    onPress={() => copyOrderId(order.id)}
                    buttonIconSet="Ionicons"
                    buttonIconName="copy"
                    animated 
                  />
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.orderStatus")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <View style={styles.statusRow}>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: orderHandler.getOrderStatusStyle(order.status, t).backgroundColor,
                      },
                    ]}
                  >
                    <Typography 
                      fontSize={14} 
                      fontWeight="bold" 
                      color={colors.white}
                      numberOfLines={1}
                    >
                      {orderHandler.getOrderStatusStyle(order.status, t).label}
                    </Typography>
                  </View>

                  <RedirectButton
                    title={t("screens.orderDetails.buttons.viewStatus")}
                    onPress={() => 
                      router.push({
                        pathname: "/order-status/[state]",
                        params: { state: order.status },
                      })
                    }
                  />
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.bookList")}
              </Typography>

              <View style={styles.sectionWrapper}>
                {order.books.map((book, index) => (
                  <View key={book.bookId}>
                    <View style={styles.bookRow}>
                      <View style={styles.imageWrapper}>
                        <Image
                          source={{ uri: book.coverImage }}
                          textSize={6}
                          style={styles.coverImage}
                          resizeMode="cover"
                        />
                      </View>

                      <View style={styles.bookContentWrapper}>
                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          color={colors.gray}
                          numberOfLines={1}
                        >
                          {book.authors.join(", ")}
                        </Typography>

                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          numberOfLines={1}
                          style={{ flex: 1 }}
                        >
                          {book.title}
                        </Typography>

                        <View style={styles.bookPriceRow}>
                          {book.originalPrice !== book.price && (
                            <Typography
                              fontSize={14}
                              fontWeight="medium"
                              color={colors.gray}
                              numberOfLines={1}
                              style={{
                                flexShrink: 1,
                                textDecorationLine: "line-through",
                              }}
                            >
                              {book.originalPrice}₴
                            </Typography>
                          )}

                          <Typography
                            fontSize={14}
                            fontWeight="bold"
                            color={colors.black}
                            numberOfLines={1}
                            style={{ flexShrink: 1 }}
                          >
                            {book.price}₴ x {book.quantity} = {book.price * book.quantity}₴
                          </Typography>
                        </View>
                      </View>
                    </View>

                    {index < order.books.length - 1 && (
                      <View
                        style={[
                          styles.divider,
                          {
                            marginVertical: 10,
                          },
                        ]}
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.orderCost")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <View
                  style={[
                    styles.costRow,
                    {
                      marginBottom: order.discountAmount > 0 ? 15 : 0,
                    },
                  ]}
                >
                  <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
                    {t("screens.orderDetails.labels.subtotal")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                    style={{ maxWidth: 200 }}
                  >
                    {order.subtotal.toFixed(2)}₴
                  </Typography>
                </View>

                {order.discountAmount > 0 && (
                  <View style={styles.costRow}>
                    <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
                      {t("screens.orderDetails.labels.discount")}
                    </Typography>

                    <Typography
                      fontSize={16}
                      fontWeight="bold"
                      color={colors.red}
                      numberOfLines={1}
                      style={{ maxWidth: 200 }}
                    >
                      –{order.discountAmount.toFixed(2)}₴
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

                <View style={styles.costRow}>
                  <Typography fontSize={14} fontWeight="medium" color={colors.black}>
                    {t("screens.orderDetails.labels.total")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                    style={{ maxWidth: 200 }}
                  >
                    {order.total.toFixed(2)}₴
                  </Typography>
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.payment")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <View style={styles.dataColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.orderDetails.fields.paymentMethod.label")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={2}
                  >
                    {t(`screens.orderDetails.fields.paymentMethod.${order.paymentMethod ? `values.${order.paymentMethod}` : "notSpecified"}`)}
                  </Typography>
                </View>

                {order.paymentMethod !== "cod" && (
                  <View
                    style={[
                      styles.divider,
                      {
                        marginVertical: 15,
                      },
                    ]}
                  />
                )}

                {order.paymentMethod !== "cod" && (
                  <View style={styles.dataColumn}>
                    <Typography
                      fontSize={14}
                      fontWeight="medium"
                      color={colors.gray}
                      numberOfLines={1}
                      style={{ marginBottom: 2.5 }}
                    >
                      {t("screens.orderDetails.fields.paymentStatus.label")}
                    </Typography>

                    <Typography
                      fontSize={16}
                      fontWeight="bold"
                      color={colors.black}
                      numberOfLines={1}
                    >
                      {t(`screens.orderDetails.fields.paymentStatus.values.${order.isPaid ? "paid" : "unpaid"}`)}
                    </Typography>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.contactDetails")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <View style={styles.dataColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.orderDetails.fields.deliveryAddress.label")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={2}
                  >
                    {order.delivery.city}, {order.delivery.warehouse}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />

                <View style={styles.dataColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.orderDetails.fields.fullName.label")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                  >
                    {order.customer.lastName} {order.customer.firstName} {order.customer.middleName}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />

                <View style={styles.dataColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.orderDetails.fields.phoneNumber.label")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                  >
                    {order.customer.phoneNumber}
                  </Typography>
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.orderDetails")}
              </Typography>
              
              <View style={styles.sectionWrapper}>
                <View style={styles.dataColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.orderDetails.fields.createdAt.label")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                  >
                    {format(new Date(order.createdAt), "dd.MM.yyyy HH:mm")}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />

                <View style={styles.dataColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.orderDetails.fields.updatedAt.label")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                  >
                    {format(new Date(order.updatedAt), "dd.MM.yyyy HH:mm")}
                  </Typography>
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.receipt")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <View style={styles.receiptRow}>
                  <TouchableOpacity
                    onPress={() => 
                      router.push({
                        pathname: "/order-receipt/[receiptId]",
                        params: {
                          receiptId: order.receiptId || "defaultReceiptId",
                        },
                      })
                    }
                    activeOpacity={0.7}
                  >
                    <Typography
                      fontSize={16}
                      fontWeight="bold"
                      color={colors.black}
                      style={{ textDecorationLine: "underline" }}
                    >
                      {t("screens.orderDetails.buttons.viewReceipt")}
                    </Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 15,
  },
  contentContainer: {
    flexDirection: "column",
    gap: 15,
  },
  sectionContainer: {
    flex: 1,
  },
  sectionWrapper: { 
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: { 
    marginBottom: 5,
  },
  orderNumberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusBadge: {
    maxWidth: 150,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  bookRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageWrapper: {
    marginRight: 15,
  },
  coverImage: {
    width: 48,
    height: 75,
    borderColor: colors.gray,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 1,
    borderWidth: 0.5,
  },
  bookContentWrapper: {
    flex: 1,
  },
  bookPriceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dataColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  receiptRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.grayTint5,
    opacity: 0.3,
  },
});

export default OrderDetailsScreen;
