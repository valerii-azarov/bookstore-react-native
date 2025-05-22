import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { View, Alert, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { format } from "date-fns";
import { orderHandler } from "@/helpers/orderHandler";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { useOrderStore } from "@/stores/orderStore";
import { selectIsAdmin } from "@/selectors/authSelectors";
import {
  selectCurrentOrder,
  selectFetchOrderStatus,
  selectFetchOrderResponse,
  selectSetOrderById,
  selectLoadOrderById,
  selectResetCurrentOrder,
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

  const isAdmin = useAuthStore(selectIsAdmin);

  const currentOrder = useOrderStore(selectCurrentOrder);
  const fetchOrderStatus = useOrderStore(selectFetchOrderStatus);
  const fetchOrderResponse = useOrderStore(selectFetchOrderResponse);

  const setOrderById = useOrderStore(selectSetOrderById);
  const loadOrderById = useOrderStore(selectLoadOrderById);
  const resetCurrentOrder = useOrderStore(selectResetCurrentOrder);

  const isLoading = fetchOrderStatus === "loading";
  const isError = !isLoading && fetchOrderResponse?.status === "error";

  const handleCopyOrderId = async (value: string) => {
    await Clipboard.setStringAsync(value);
    Alert.alert(
      t("screens.orderDetails.alerts.copied.title"),
      t("screens.orderDetails.alerts.copied.message")
    );
  };

  const sections = [
    {
      title: t("screens.orderDetails.sections.contactDetails"),
      items: [
        {
          key: "deliveryAddress",
          label: t("screens.orderDetails.fields.deliveryAddress.label"),
          value: `${currentOrder?.delivery.city}, ${currentOrder?.delivery.warehouse}` || "-",
        },
        {
          key: "fullName",
          label: t("screens.orderDetails.fields.fullName.label"),
          value: `${currentOrder?.customer.lastName} ${currentOrder?.customer.firstName} ${currentOrder?.customer.middleName}` || "-",
        },
        {
          key: "phoneNumber",
          label: t("screens.orderDetails.fields.phoneNumber.label"),
          value: currentOrder?.customer.phoneNumber || "-",
        },
      ],
    },
    {
      title: t("screens.orderDetails.sections.orderDetails"),
      items: [
        {
          key: "createdAt",
          label: t("screens.orderDetails.fields.createdAt.label"),
          value: currentOrder?.createdAt ? format(new Date(currentOrder.createdAt), "dd.MM.yyyy HH:mm") : "-",
        },
        {
          key: "updatedAt",
          label: t("screens.orderDetails.fields.updatedAt.label"),
          value: currentOrder?.updatedAt ? format(new Date(currentOrder.updatedAt), "dd.MM.yyyy HH:mm") : "-",
          isVisible: isAdmin,
        },
      ],
    },
  ];

  useEffect(() => {
    if (orderId && isConnected) {
      setOrderById(orderId);
      loadOrderById();
    }
    return () => resetCurrentOrder();
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

      {isConnected && !isLoading && !isError && currentOrder && (
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
                    {currentOrder.id}
                  </Typography>

                  <IconButton 
                    onPress={() => handleCopyOrderId(currentOrder.id)}
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
                        backgroundColor: orderHandler.getOrderStatusStyle(currentOrder.status, t).backgroundColor,
                      },
                    ]}
                  >
                    <Typography 
                      fontSize={14} 
                      fontWeight="bold" 
                      color={colors.white}
                      numberOfLines={1}
                    >
                      {orderHandler.getOrderStatusStyle(currentOrder.status, t).label}
                    </Typography>
                  </View>

                  {!isAdmin && (   
                    <RedirectButton
                      title={t("screens.orderDetails.buttons.viewStatus")}
                      onPress={() => 
                        router.push({
                          pathname: "/order-status/[state]",
                          params: { state: currentOrder.status },
                        })
                      }
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.orderDetails.sections.bookList")}
              </Typography>

              <View style={styles.sectionWrapper}>
                {currentOrder.books.map((book, index) => (
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
                          {!isAdmin && book.originalPrice !== book.price && (
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

                          {isAdmin ? (
                            <View style={{ flexDirection: "row", gap: 5 }}>
                              <Typography fontSize={14} fontWeight="medium" color={colors.black}>
                                {t("screens.orderDetails.labels.quantity")}:
                              </Typography> 
                              
                              <Typography fontSize={14} fontWeight="bold" color={colors.black}>
                                {book.quantity}
                              </Typography>
                            </View>
                          ) : (
                            <Typography
                              fontSize={14}
                              fontWeight="bold"
                              color={colors.black}
                              numberOfLines={1}
                              style={{ flexShrink: 1 }}
                            >
                              {book.price}₴ x {book.quantity} = {book.price * book.quantity}₴
                            </Typography>
                          )}
                        </View>
                      </View>
                    </View>

                    {index < currentOrder.books.length - 1 && (
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
                {isAdmin ? (
                  <View style={styles.dataColumn}>
                    <Typography
                      fontSize={14}
                      fontWeight="medium"
                      color={colors.gray}
                      numberOfLines={1}
                      style={{ marginBottom: 2.5 }}
                    >
                      {t("screens.orderDetails.fields.totalAmount.label")}
                    </Typography>

                    <Typography fontSize={16} fontWeight="bold" color={colors.black} numberOfLines={1}>
                      {currentOrder.total.toFixed(2)}₴
                    </Typography>
                  </View>
                ) : (
                  <>
                    <View 
                      style={[
                        styles.costRow, 
                        { 
                          marginBottom: currentOrder.discountAmount > 0 ? 15 : 0, 
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
                        {currentOrder.subtotal.toFixed(2)}₴
                      </Typography>
                    </View>

                    {currentOrder.discountAmount > 0 && (
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
                          –{currentOrder.discountAmount.toFixed(2)}₴
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
                        {currentOrder.total.toFixed(2)}₴
                      </Typography>
                    </View>
                  </>
                )}
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
                    {t(`screens.orderDetails.fields.paymentMethod.${currentOrder.paymentMethod ? `values.${currentOrder.paymentMethod}` : "notSpecified"}`)}
                  </Typography>
                </View>

                {currentOrder.paymentMethod !== "cod" && (
                  <>
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
                        {t("screens.orderDetails.fields.paymentStatus.label")}
                      </Typography>

                      <Typography
                        fontSize={16}
                        fontWeight="bold"
                        color={colors.black}
                        numberOfLines={1}
                      >
                        {t(`screens.orderDetails.fields.paymentStatus.values.${currentOrder.isPaid ? "paid" : "unpaid"}`)}
                      </Typography>
                    </View>
                  </>
                )}
              </View>
            </View>

            {sections.map((section, sectionIdx) => (
              <View
                key={`section-${sectionIdx}`}
                style={styles.sectionContainer}
              >
                <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                  {section.title}
                </Typography>

                <View style={styles.sectionWrapper}>
                  {section.items
                    .filter((item) => item.isVisible !== false)
                    .map((item, index, visibleItems) => (
                      <View key={`item-${index}`}>
                        <View style={styles.dataColumn}>
                          <Typography
                            fontSize={14}
                            fontWeight="medium"
                            color={colors.gray}
                            numberOfLines={1}
                            style={{ marginBottom: 2.5 }}
                          >
                            {item.label}
                          </Typography>

                          <Typography
                            fontSize={16}
                            fontWeight="bold"
                            color={colors.black}
                            numberOfLines={2}
                          >
                            {item.value}
                          </Typography>
                        </View>

                        {index < visibleItems.length - 1 && (
                          <View
                            style={[
                              styles.divider,
                              {
                                marginVertical: 15,
                              },
                            ]}
                          />
                        )}
                      </View>
                    ))}
                </View>
              </View>
            ))}

            {!isAdmin && (
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
                            receiptId: currentOrder.receiptId || "defaultReceiptId",
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
            )}
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
