import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PADDING_SIZE } from "../../../shared/constants";
import { getColorByType } from "../../../shared/utils";
import { Pokemon } from "../interfaces";
import { PokemonThumbnail } from "./PokemonThumbnail";

const PokedexImage = require("../../../../assets/pokedeex.png");

interface ListProps {
  pokemonArray: Pokemon[];
  onEndReached: () => void;
  loading: boolean;
  onPress: (arg0: number) => void;
}

interface PokeElementProps extends Pokemon {
  onPress: (arg0: number) => void;
}

const PokeElement: React.FC<PokeElementProps> = ({
  name,
  sprites,
  types,
  id,
  onPress,
}) => {
  const handlePress = useCallback(() => onPress(id), []);
  return (
    <TouchableOpacity
      style={{
        ...styles.pokeCard,
        backgroundColor: getColorByType(types[0]?.type?.name),
      }}
      onPress={handlePress}
    >
      <Text style={styles.idText}>{`#${
        id < 10 ? "00" : id < 100 ? "0" : ""
      }${id}`}</Text>
      <PokemonThumbnail uri={sprites?.front_default} />
      <Text style={styles.nameText}>{name}</Text>
    </TouchableOpacity>
  );
};

export const List: React.FC<ListProps> = ({
  pokemonArray,
  onEndReached,
  loading,
  onPress,
}) => {
  const renderItem = useCallback(({ item }) => {
    return <PokeElement {...item} onPress={onPress} />;
  }, []);
  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ height: 100 }}>
          <Image
            source={PokedexImage}
            style={styles.pokedexTitle}
            resizeMode="center"
          />
        </View>
      }
      renderItem={renderItem}
      data={pokemonArray}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapperStyle}
      keyExtractor={(item) => String(item.id)}
      onEndReached={onEndReached}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator animating size="large" color="#fcba03" />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  pokeCard: {
    width: "40%",
    height: 200,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: PADDING_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  columnWrapperStyle: {
    justifyContent: "space-around",
  },
  titleText: {
    color: "#F0C644",
    alignSelf: "center",
    marginBottom: PADDING_SIZE,
    fontSize: 30,
    fontFamily: "Pokemon-Solid",
  },
  idText: {
    alignSelf: "flex-end",
    paddingTop: PADDING_SIZE / 2,
    paddingRight: PADDING_SIZE,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  nameText: {
    // fontWeight: 'bold',
    paddingBottom: PADDING_SIZE,
    fontSize: 17,
    fontFamily: "Pokemon-Solid",
  },
  pokedexTitle: {
    height: undefined,
    width: undefined,
    flex: 1,
    // height: 50
    // flex: 1
    // width: 200
  },
});
