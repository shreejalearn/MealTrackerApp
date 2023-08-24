import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const MealListItem = ({ meal, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.container}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{meal.title}</Text>
          <Text style={styles.detail}>Duration: {meal.duration} mins</Text>
          <Text style={styles.detail}>Complexity: {meal.complexity}</Text>
          <Text style={styles.detail}>Affordability: {meal.affordability}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    color: "#888",
  },
});

export default MealListItem;
