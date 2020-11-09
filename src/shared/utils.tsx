import { EvolutionChain, EvolutionLink } from "../features/PokemonList/interfaces";

export const getColorByType = (type: string) => {
    switch (type) {
      case "normal":
        return "#A8A878";
      case "fighting":
        return "#C03028";
      case "flying":
        return "#A890F0";
      case "poison":
        return "#A040A0";
      case "ground":
        return "#E0C068";
      case "rock":
        return "#B8A038";
      case "bug":
        return "#A8B820";
      case "ghost":
        return "#705898";
      case "steel":
        return "#B8B8D0";
      case "fire":
        return "#F08030";
      case "water":
        return "#6890F0";
      case "grass":
        return "#78C850";
      case "electric":
        return "#F8D030";
      case "psychic":
        return "#F85888";
      case "ice":
        return "#98D8D8";
      case "dragon":
        return "#7038F8";
      case "dark":
        return "#705848";
      case "fairy":
        return "#EE99AC";
      case "unknown":
        return "#68A090";
      case "shadow":
        return "#735797";
      default:
        return "gray";
    }
}

// Recursive function to flatten the values of the evolution chain.
const extractEvolution = (evolutionLink: EvolutionLink): {name: string, url: string}[]  => {
  if(evolutionLink.evolves_to?.length) {
    // If there is a nested evolution, recursively call function.
    return  [{ name: evolutionLink.species.name, url: evolutionLink.species.url }, ...extractEvolution(evolutionLink.evolves_to[0])]
  } else {
    // If there are no more nested evolutions, enter recursive's stop condition
    return [{ name: evolutionLink.species.name, url: evolutionLink.species.url }]
  }
}

export const parseEvolutionChain = (evolutionChain: EvolutionChain): { name: string, url: string}[] => {
  const extractedEvolutionChain = extractEvolution(evolutionChain.chain);
  return extractedEvolutionChain;
}