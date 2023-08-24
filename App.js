import React, { useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryMealsScreen from "./screens/CategoryMealsScreen";
import MealInstructionScreen from "./screens/MealInstructionScreen";
import FavScreen from "./screens/FavScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5 for icons
import FavoritesContextProvider from "./store/context/favorites-context";
import SearchScreen from "./screens/SearchScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{ headerTitle: 'All Categories' }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={{ headerTitle: 'Meals' }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealInstructionScreen}
        options={{
          headerTitle: 'Instructions',
        }}
      />
        <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: 'Search',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <FavoritesContextProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Home"
            component={HomeStack}
            options={{
              drawerLabel: 'Home',
              drawerIcon: ({ color, size }) => (
                <FontAwesome5 name="home" color={color} size={size} />
              ), // Use a FontAwesome5 icon for Home
            }}
          />
          <Drawer.Screen
            name="Favorites"
            component={FavScreen}
            options={{
              drawerLabel: 'Favorites',
              drawerIcon: ({ color, size }) => (
                <FontAwesome5 name="star" solid color={color} size={size} />
              ), // Use a FontAwesome5 icon for Favorites
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      </FavoritesContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E8E8",
  },
});
