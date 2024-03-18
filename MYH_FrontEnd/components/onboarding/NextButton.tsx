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
          color={COLORS.white}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // flex: 1,
    justifyContent: "flex-end",
    // backgroundColor:"yellow",
  },
  button: {
    backgroundColor: "#875B70",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center", // Center the text and icon vertically
    justifyContent: "space-between", // Align contents horizontally
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    color: COLORS.white,
    fontSize: SIZES.h2 + 3,
    fontWeight: "bold",
  },
  arrowIcon: {
    top: 0, // Align the icon vertically with the text
  },
});

export default NextButton;
