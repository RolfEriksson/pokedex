import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ListPage } from './src/features/PokemonList/pages';
import { useFonts } from "expo-font";

const pokemonImage = require("./assets/pokemon.png");


export default function App() {
  const [fontsLoaded] = useFonts({
    "Pokemon-Solid": require("./assets/fonts/Pokemon-Solid.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.root}>
      <ImageBackground source={pokemonImage} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
        <StatusBar hidden />
        <ListPage />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  backgroundImage: {
    flex: 1,
  },
  imageStyle: {
    opacity: 0
  }
});
