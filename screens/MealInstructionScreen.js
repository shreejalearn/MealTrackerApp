import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import { MEALS } from '../data/dummy-data';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoritesContext } from '../store/context/favorites-context'; // Import FavoritesContext, not FavoritesContextProvider

function MealInstructionScreen({ route }) {
  const favoriteMealCtx = useContext(FavoritesContext); // Use useContext to access the context
  const { mealId } = route.params;
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(
    favoriteMealCtx.ids.includes(mealId)
  );  

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  if (!selectedMeal) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Sorry, this meal does not exist.</Text>
      </View>
    );
  }

  const headerButtonPressHandler = () => {
    if (isFavorite) {
      favoriteMealCtx.removeFavorite(mealId);
    } else {
      favoriteMealCtx.addFavorite(mealId);
    }
    setIsFavorite(!isFavorite); // Toggle the isFavorite state
  };
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={headerButtonPressHandler}>
          <Icon
            name={isFavorite ? 'star' : 'star-o'} // Use 'star' or 'star-o' based on isFavorite state
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, headerButtonPressHandler, isFavorite]);
  
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.mealDetails}>
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Cook Time: {selectedMeal.duration} mins</Text>
          <Text style={styles.detailText}>Affordability: {selectedMeal.affordability}</Text>
          <Text style={styles.detailText}>Complexity: {selectedMeal.complexity}</Text>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {selectedMeal.ingredients.map((ingredient) => (
          <Text key={ingredient} style={styles.ingredientText}>
            {ingredient}
          </Text>
        ))}
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        {selectedMeal.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepBullet}>{'\u2022'}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorMessage: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  mealDetails: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'column',
    marginBottom: 0,
  },
  detailText: {
    fontSize: 16,
    color: '#888',
  },
  ingredientsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    marginBottom: 5,
  },
  instructionsContainer: {
    padding: 16,
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stepBullet: {
    fontSize: 16,
    marginRight: 5,
    color: '#333',
  },
  stepText: {
    fontSize: 16,
  },
  icon: {
    color: '#d05c90',
  }
});

export default MealInstructionScreen;
