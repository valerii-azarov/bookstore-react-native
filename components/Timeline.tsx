import { View, FlatList, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { TimelineStep } from "@/types"

import Icon from "./Icon";
import Typography from "./Typography";

type TimelineProps<T> = {
  steps: TimelineStep<T>[];
  hiddenSteps?: string[];
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const Timeline = <T extends string>({ steps, hiddenSteps = [], style, color = colors.orange }: TimelineProps<T>) => {
  const filteredSteps = steps.filter((step) => !hiddenSteps.includes(step.state || "") || step.completed);

  const renderStep = ({ item, index }: { item: TimelineStep<T>; index: number }) => {
    return (
      <View>
        <View style={styles.stepContainer}>
          <View style={styles.iconWrapper}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: item.completed ? color : "transparent",
                  borderWidth: item.completed ? 0 : 2,
                  borderColor: item.completed ? "transparent" : colors.gray,
                }
              ]}
            >
              <Icon
                iconSet={item.completed ? "Ionicons" : item.iconSet}
                iconName={item.completed ? "checkmark-circle-outline" : item.iconName}
                iconSize={28}
                iconColor={item.completed ? colors.white : colors.gray}
              />
            </View>
          </View>

          <View style={styles.titleWrapper}>
            <Typography
              fontSize={16}
              fontWeight="bold"
              color={colors.black}
              numberOfLines={1}
              style={{ marginBottom: 2.5 }}
            >
              {item.title}
            </Typography>

            <Typography
              fontSize={14}
              fontWeight="medium"
              color={colors.gray}
              numberOfLines={1}
            >
              {item.subtitle}
            </Typography>
          </View>
        </View>

        {index < filteredSteps.length - 1 && (
          <View
            style={[
              styles.line,
              {
                backgroundColor: filteredSteps[index + 1]?.completed ? color : colors.gray,
              },
            ]}
          />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={filteredSteps}
        renderItem={renderStep}
        keyExtractor={(item, index) => `${item.state}-${index}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginRight: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    flex: 1,
  },
  line: {
    width: 2,
    height: 25,
    marginLeft: 24,
    marginVertical: 5,
  },
});

export default Timeline;
