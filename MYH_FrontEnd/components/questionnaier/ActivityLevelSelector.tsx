import { Text, View } from "components/Themed";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
interface ActivityLevel {
  title: string;
  description: string;
}

interface ActivityLevelSelectorProps {
  selectedLevel: string;
  onSelect: (level: string) => void;
}

const ActivityLevelSelector: React.FC<ActivityLevelSelectorProps> = ({
  selectedLevel,
  onSelect,
}) => {
  const activityLevels: ActivityLevel[] = [
    { title: "Sedentary", description: "Little or no exercise" },
    {
      title: "Lightly Active",
      description: "Light exercise/sports 1-3 days/week",
    },
    {
      title: "Moderately Active",
      description: "Moderate exercise/sports 3-5 days/week",
    },
    {
      title: "Very Active",
      description: "Hard exercise/sports 6-7 days a week",
    },
  ];

  return (
    <View style={styles.container}>
      {activityLevels.map((level, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.card,
            selectedLevel === level.title && styles.selectedCard,
          ]}
          onPress={() => onSelect(level.title)}
        >
          <Text
            style={[
              styles.title,
              selectedLevel === level.title && styles.selectedTitle,
            ]}
          >
            {level.title}
          </Text>
          <Text style={styles.description}>{level.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#3498db",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  selectedTitle: {
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default ActivityLevelSelector;
