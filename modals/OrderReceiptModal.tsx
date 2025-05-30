import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { format } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useOrderReceiptStore } from "@/stores/orderReceiptStore";
import {
  selectReceipt,
  selectReceiptStatus,
  selectReceiptResponse,
  selectSetReceiptById,
  selectLoadReceiptById,
  selectResetReceipt,
} from "@/selectors/orderReceiptSelectors";
import { companyDetails } from "@/data/companyDetails";
import { colors } from "@/constants/theme";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import DottedLine from "@/components/DottedLine";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const OrderReceiptModal = () => {
  const { receiptId } = useLocalSearchParams<{ receiptId: string }>();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const receipt = useOrderReceiptStore(selectReceipt);
  const receiptStatus = useOrderReceiptStore(selectReceiptStatus);
  const receiptResponse = useOrderReceiptStore(selectReceiptResponse);

  const setReceiptById = useOrderReceiptStore(selectSetReceiptById);
  const loadReceiptById = useOrderReceiptStore(selectLoadReceiptById);
  const resetReceipt = useOrderReceiptStore(selectResetReceipt);

  const isLoading = receiptStatus === "loading";
  const isError = !isLoading && receiptResponse?.status === "error";

  useEffect(() => {
    if (receiptId && isConnected) {
      setReceiptById(receiptId);
      loadReceiptById();
    }
    return () => resetReceipt();
  }, [receiptId, isConnected]);

  return (
    <ModalWrapper>
      <Header
        title={t("modals.orderReceipt.header.title")}
        titleSize={18}
        iconLeft={<BackButton />}
        style={{
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      />
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
          message={t("common.messages.errorWithRetry.title")}
          subMessage={t("common.messages.errorWithRetry.subtitle")}
          buttonText={t("common.buttons.errorWithRetry")}
          onRetry={() => loadReceiptById()}
        />
      )}

      {isConnected && !isLoading && !isError && receipt && (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >   
          <View style={{ flex: 1, padding: 15 }}>         
            <View style={styles.receiptContainer}>              
              <View style={[styles.receiptSection, { marginBottom: 15 }]}>
                <Typography
                  fontSize={16}
                  fontWeight="bold"
                  style={{
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  {companyDetails.company}
                </Typography>

                <Typography
                  fontSize={16}
                  fontWeight="medium"
                  style={{
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  {companyDetails.address}
                </Typography>

                <Typography
                  fontSize={16}
                  fontWeight="medium"
                  style={{
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  {companyDetails.registrationNumber}
                </Typography>
              </View>

              <View style={styles.receiptSection}>
                {receipt.books.map((book, index) => {
                  const isLast = index === receipt.books.length - 1;
                  const hasDiscount = book.originalPrice !== book.price;
                  
                  return (
                    <View key={index}>
                      <Typography
                        fontSize={16}
                        fontWeight="medium"
                        color={colors.black}
                        style={{
                          marginBottom: 5,
                        }}
                      >
                        {book.quantity} x {book.originalPrice}₴
                      </Typography>

                      <View 
                        style={[
                          styles.itemRow, 
                          { 
                            marginBottom: isLast && !hasDiscount ? 0 : 5,
                          }
                        ]}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color={colors.black}
                          numberOfLines={2}
                          style={{
                            maxWidth: "70%",
                            textAlign: "left",
                          }}
                        >
                          {book.title}
                        </Typography>

                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color={colors.black}
                          numberOfLines={1}
                          style={{
                            maxWidth: "30%",
                            textAlign: "right",
                          }}
                        >
                          {(book.quantity * book.originalPrice).toFixed(2)}₴
                        </Typography>
                      </View>

                      {hasDiscount && (
                        <View 
                          style={[
                            styles.itemRow, 
                            { 
                              marginBottom: isLast ? 0 : 5,
                            }
                          ]}
                        >
                          <Typography
                            fontSize={16}
                            fontWeight="medium"
                            color={colors.black}
                            numberOfLines={2}
                            style={{
                              maxWidth: "70%",
                              textAlign: "left",
                            }}
                          >
                            Знижка
                          </Typography>

                          <Typography
                            fontSize={16}
                            fontWeight="medium"
                            color={colors.black}
                            numberOfLines={1}
                            style={{
                              maxWidth: "30%",
                              textAlign: "right",
                            }}
                          >
                            -{(book.quantity * (book.originalPrice - book.price)).toFixed(2)}₴
                          </Typography>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>

              <DottedLine 
                style={{
                  marginTop: 10,
                  marginBottom: 15,
                }} 
              />  

              <View style={styles.receiptSection}>
                <View style={[styles.itemRow, { marginBottom: 5 }]}>
                  <Typography
                    fontSize={18}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                    style={{
                      maxWidth: "40%",
                      textAlign: "left",
                    }}
                  >
                    СУМА
                  </Typography>

                  <Typography
                    fontSize={18}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                    style={{
                      maxWidth: "60%",
                      textAlign: "right",
                    }}
                  >
                    {receipt.total}₴
                  </Typography>
                </View>

                <View style={[styles.itemRow, { marginBottom: 5 }]}>
                  <Typography
                    fontSize={16}
                    fontWeight="medium"
                    color={colors.black}
                    numberOfLines={1}
                    style={{
                      maxWidth: "40%",
                      textAlign: "left",
                    }}
                  >
                    Знижка
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="medium"
                    color={colors.black}
                    numberOfLines={1}
                    style={{
                      maxWidth: "60%",
                      textAlign: "right",
                    }}
                  >
                    {receipt.discountAmount}₴
                  </Typography>
                </View>

                <View style={[styles.itemRow, { marginBottom: 5 }]}>
                  <Typography
                    fontSize={16}
                    fontWeight="medium"
                    color={colors.black}
                    numberOfLines={1}
                    style={{
                      maxWidth: "40%",
                      textAlign: "left",
                    }}
                  >
                    До сплати
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="medium"
                    color={colors.black}
                    numberOfLines={1}
                    style={{
                      maxWidth: "60%",
                      textAlign: "right",
                    }}
                  >
                    {receipt.total}₴
                  </Typography>
                </View>

                <View style={styles.itemRow}>
                  <Typography
                    fontSize={16}
                    fontWeight="medium"
                    color={colors.black}
                    numberOfLines={1}
                    style={{
                      maxWidth: "40%",
                      textAlign: "left",
                    }}
                  >
                    Спосіб оплати
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="medium"
                    color={colors.black}
                    numberOfLines={1}
                    style={{
                      maxWidth: "60%",
                      textAlign: "right",
                    }}
                  >
                    {receipt.paymentMethod === "cod" ? "Накладений платіж" : "Банківською карткою"}
                  </Typography>
                </View>
              </View>

              <DottedLine 
                style={{
                  marginTop: 10,
                  marginBottom: 15,
                }} 
              />

              <View style={styles.receiptSection}>
                <Typography
                  fontSize={16}
                  fontWeight="medium"
                  color={colors.black}
                  style={{
                    marginBottom: 5,
                  }}
                >
                  Коментар:
                </Typography>

                <Typography
                  fontSize={16}
                  fontWeight="medium"
                  color={colors.black}
                  style={{
                    marginBottom: 5,
                  }}
                >
                  Дякуємо за замовлення!
                </Typography>

                <Typography
                  fontSize={16}
                  fontWeight="medium"
                  color={colors.black}
                  style={{
                    marginBottom: 5,
                  }}
                >
                  ЧЕК № {receipt.id}
                </Typography>

                <Typography
                  fontSize={16}
                  fontWeight="medium"
                  color={colors.black}
                >
                  {format(new Date(receipt.createdAt), "dd.MM.yyyy HH-mm-ss")}
                </Typography>
              </View>
            </View>

            <View 
              style={{
                backgroundColor: colors.orangeTint8,
                borderRadius: 12,
                paddingVertical: 15,
                paddingHorizontal: 20,
                marginTop: 25,
              }}
            >
              <Typography fontSize={16} fontWeight="bold" style={{ marginBottom: 5 }}>
                {t("modals.orderReceipt.notice.title")}
              </Typography>

              <Typography fontSize={14} fontWeight="medium" color={colors.gray}>
                {t("modals.orderReceipt.notice.subtitle")}
              </Typography>
            </View>
          </View>
        </ScrollView>
      )}
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  receiptContainer: {
    backgroundColor: colors.white,
    paddingVertical: 25,
    paddingHorizontal: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  receiptSection: {
    flex: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrderReceiptModal;
