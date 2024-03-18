import { Ionicons } from "@expo/vector-icons";
import { View } from "components/Themed";
import { COLORS, SIZES } from "constants/CustomColor";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ZodType, z } from "zod";

type HeaderProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
};

// const HeaderTypes: ZodType<HeaderProps> = z.object({
//   onPress: z.function(),
// });
const NextButton: React.FC<HeaderProps> = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
        <Ionicons
          name="arrow-forward-outline"
          size={24}
          color="white"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { marginTop: 15 },
  button: {
    backgroundColor: "#875B70",
    padding: 7,
    // borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 28,
  },
  arrowIcon: {
    top: 0, // Align the icon vertically with the text
  },
});

export default NextButton;
