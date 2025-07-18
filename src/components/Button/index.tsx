import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  label: string;
  isLoading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
};

export default function Button({
  label: title,
  isLoading = false,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.8}
      {...rest}
      style={styles.container}
    >
      {isLoading && <ActivityIndicator color="#fff" />}

      {!isLoading && (
        <>
          {icon && <Ionicons name={icon} style={styles.icon} />}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
