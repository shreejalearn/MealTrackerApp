import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MealListItem from "../components/MealListItem";
import { MEALS } from "../data/dummy-data";
import { useNavigation } from "@react-navigation/native";

function CategoriesScreen() {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    const filtered = MEALS.filter((meal) => {
      const titleMatch = meal.title.toLowerCase().includes(searchQuery.toLowerCase());
      const ingredientsMatch = meal.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return titleMatch || ingredientsMatch;
    });
    setFilteredMeals(filtered);
  }, [searchQuery]);

  function renderMealItem({ item }) {
    return (
      <MealListItem
        meal={item}
        onSelect={() => {
          navigation.navigate("MealDetail", {
            mealId: item.id,
          });
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a meal..."
            placeholderTextColor="#888"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <AntDesign name="closecircleo" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMealItem}
        numColumns={1}
        style={styles.mealsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 10,
  },
  header: {
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginTop: 30,
    backgroundColor: "white",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
  },
  clearButton: {
    padding: 5,
  },
  mealsList: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default CategoriesScreen;
