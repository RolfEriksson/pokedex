import React from 'react';
import { ActivityIndicator, Image, Modal, ModalProps, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Pokemon } from '../interfaces';
import { PADDING_SIZE } from '../../../shared/constants';
import { getColorByType } from '../../../shared/utils';
import { PokemonThumbnail } from './PokemonThumbnail';

interface DetailsModalProps extends ModalProps {
    pokemon: Pokemon;
    onClose: () => void;
    loadingEvolution: boolean;
    evolutions: Pokemon[];
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ pokemon, onClose, loadingEvolution, evolutions, ...props }) => {
  return (
    <Modal {...props}>
      {!!pokemon && (
        <ScrollView>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.body}>
            <Text
              style={{
                ...styles.pokemonName,
                color: getColorByType(pokemon.types[0]?.type.name),
              }}
            >
              {pokemon.name}
            </Text>
            <View style={styles.pokemonImages}>
              <PokemonThumbnail uri={pokemon.sprites.front_default} />
              <PokemonThumbnail uri={pokemon.sprites.back_default} />
              {/* <Image
                  source={{ uri: pokemon.sprites.front_default }}
                  style={{ width: "50%", minHeight: 100 }}
                /> */}
              {/* <Image
                  source={{ uri: pokemon.sprites.back_default }}
                  style={{ width: "50%", minHeight: 100 }}
                /> */}
              {/* <Image source={{ uri: pokemon.sprites.front_default}} style={{ flex: 1 }} /> */}
            </View>
            <View style={styles.row}>
              <Text style={styles.subtitle}>Types</Text>
              <View style={styles.valueContainer}>
                {pokemon.types?.map((_pokemon) => (
                  <View
                    style={{
                      ...styles.typeContainer,
                      backgroundColor: getColorByType(_pokemon.type?.name),
                    }}
                  >
                    <Text style={styles.valueText}>{_pokemon.type?.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.subtitle}>Abilities</Text>
              <View>
                {pokemon.abilities?.map((x) => (
                  <Text style={styles.valueText}>- {x.ability?.name}</Text>
                ))}
              </View>
            </View>
            {!!loadingEvolution ? (
              <ActivityIndicator size="large" />
            ) : (
              <View style={styles.row}>
                <Text style={styles.subtitle}>Evolutions</Text>
                <View>
                  {evolutions?.map((_pokemon, index) => (
                    <View style={styles.evolutionRoot}>
                      <View style={styles.evolutionContainer}>
                        <PokemonThumbnail
                          uri={_pokemon.sprites.front_default}
                        />
                        <Text style={styles.valueText}>{_pokemon.name}</Text>
                      </View>
                      {index !== evolutions.length -1 && <AntDesign
                        name="arrowdown"
                        size={30}
                        color="black"
                        style={styles.evolutionArrowIcon}
                      />}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    padding: 20,
    alignSelf: "flex-end",
  },
  body: {
    padding: PADDING_SIZE,
    alignItems: "center",
  },
  pokemonName: {
    fontFamily: "Pokemon-Solid",
    fontSize: 40,
  },
  pokemonImages: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 200,
    width: "70%",
  },
  row: {
    marginTop: 40,
    alignItems: "center",
  },
  subtitle: {
    fontFamily: "Pokemon-Solid",
    fontSize: 15,
    color: "gray",
    marginBottom: 10,
  },
  valueText: {
    fontFamily: "Pokemon-Solid",
    color: "black",
  },
  valueContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  typeContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginRight: 20,
    borderRadius: 10,
  },
  evolutionContainer: { width: 150, height: 200, alignItems: "center" },
  evolutionArrowIcon: {
    marginTop: 20
  },
  evolutionRoot: {
    alignItems: 'center'
  }
});