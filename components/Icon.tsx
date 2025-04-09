import * as IconSets from "@expo/vector-icons";
import { colors } from "@/constants/theme";

type IconProps = {
  iconSet: keyof typeof IconSets;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
};

const Icon = ({
  iconSet,
  iconName,
  iconSize = 24,
  iconColor = colors.black,
}: IconProps) => {
  const IconComponent = IconSets[iconSet];

  return (
    <IconComponent
      name={iconName}
      size={iconSize}
      color={iconColor}
    />
  );
};

export default Icon;
