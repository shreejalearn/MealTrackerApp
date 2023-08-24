import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/dummy-data";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';


function CategoriesScreen() {
  const navigation = useNavigation();

  function renderCategoryItem({ item }) {
    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onSelect={() => {
          navigation.navigate('CategoryMeals', {
            categoryId: item.id,
          });
        }}
      />
    );
  }

  function headerButtonPressHandler() {
    navigation.navigate('Search');
  }

    
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={headerButtonPressHandler}>
          <Icon
            name={'search'} // Use 'star' or 'star-o' based on isFavorite state
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E9E8E8",
    marginTop: '5%',
  },
  icon: {
    color: '#d05c90',
  }

});

export default CategoriesScreen;
