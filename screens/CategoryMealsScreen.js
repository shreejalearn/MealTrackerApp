import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MEALS } from "../data/dummy-data";

function CategoryMealsScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const mealsInCategory = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId)
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={mealsInCategory}
        keyExtractor={(item) => item.id}
        style={styles.container}
        renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.mealButton}
        onPress={() => {
          navigation.navigate('MealDetail', {
            mealId: item.id,
          });
        }}
      >
            <View style={styles.mealItem}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailText}>{item.duration} m</Text>
                  <Text style={styles.detailText}>{item.affordability}</Text>
                  <Text style={styles.detailText}>{item.complexity}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  mealItem: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  mealButton: {
    flex: 1,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row', // Align items in a row
    marginTop: 8,
    justifyContent: 'space-between', // Add space between items
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
});

export default CategoryMealsScreen;
