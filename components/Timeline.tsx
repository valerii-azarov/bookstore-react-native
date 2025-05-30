import { View, FlatList, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { TimelineStep } from "@/types";

import Icon from "./Icon";
import Typography from "./Typography";

type TimelineProps<T> = {
  steps: TimelineStep<T>[];
  hiddenSteps?: string[];
  scrollEnabled?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const Timeline = <T extends string>({
  steps,
  hiddenSteps = [],
  scrollEnabled = true,
  color = colors.orange,
  style,
}: TimelineProps<T>) => {
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
                },
              ]}
            >
              <Icon
                iconSet={item.completed ? "Ionicons" : item.iconSet}
                iconName={item.completed ? "checkmark-circle-outline" : item.iconName}
                iconSize={22}
                iconColor={item.completed ? colors.white : colors.gray}
              />
            </View>
          </View>

          <View>
            <Typography
              fontSize={14.5}
              fontWeight="bold"
              color={colors.black}
              numberOfLines={1}
              style={{ marginBottom: 2.5 }}
            >
              {item.title}
            </Typography>

            <Typography
              fontSize={12.5}
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
        scrollEnabled={scrollEnabled}
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
    paddingVertical: 5,
  },
  iconWrapper: {
    marginRight: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: 2,
    height: 20,
    marginLeft: 19,
    marginVertical: 4,
  },
});

export default Timeline;
