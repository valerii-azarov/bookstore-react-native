import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import ModalWrapper from "@/components/ModalWrapper";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Typography from "@/components/Typography";

const CartModal = () => {
  return (
    <ModalWrapper style={{ backgroundColor: colors.creamTint9 }}>
      <Header
        title="Cart"
        iconLeft={
          <BackButton style={{ backgroundColor: colors.orangeTint5 }} />
        }
        style={styles.header}
      />

      <View style={styles.content}> 
        <Typography fontSize={16} fontWeight="medium" color={colors.black}>
          Cart Modal
        </Typography>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  content: {
    paddingHorizontal: 15,
  }
});

export default CartModal;
