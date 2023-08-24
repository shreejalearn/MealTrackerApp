import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { FavoritesContext } from '../store/context/favorites-context';
import { MEALS } from '../data/dummy-data';

const FavScreen = () => {
  const favoriteMealCtx = useContext(FavoritesContext);
  const navigation = useNavigation(); // Get the navigation object

  // Get the list of favorite meal IDs
  const favoriteMealIds = favoriteMealCtx.ids;

  // Filter MEALS data to get the favorited meals
  const favoritedMeals = MEALS.filter((meal) => favoriteMealIds.includes(meal.id));

  // Function to handle meal item click and navigate to MealInstructionScreen
  const handleMealItemClick = (mealId) => {
    navigation.navigate('MealDetail', { mealId });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {favoritedMeals.length === 0 ? (
          <Text style={styles.message}>No favorite meals yet.</Text>
        ) : (
          <FlatList
            data={favoritedMeals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.mealContainer}
                onPress={() => handleMealItemClick(item.id)} // Navigate to MealInstructionScreen
              >
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.mealInfo}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.detail}>Duration: {item.duration} mins</Text>
                  <Text style={styles.detail}>Complexity: {item.complexity}</Text>
                  <Text style={styles.detail}>Affordability: {item.affordability}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  mealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: '2.5%',
    marginTop: '2.5%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  mealInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#888',
  },
});

export default FavScreen;
