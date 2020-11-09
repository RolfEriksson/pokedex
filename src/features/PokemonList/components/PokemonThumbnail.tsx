import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface PokemonThumbnailProps {
    uri: string;
}

export const PokemonThumbnail: React.FC<PokemonThumbnailProps> = ({ uri }) => (
  <View style={styles.root}>
    <Image source={{ uri }} resizeMode="contain" style={styles.imgStyle} />
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, width: "100%", height: "100%" },
  imgStyle: {
      flex: 1
  }
});

