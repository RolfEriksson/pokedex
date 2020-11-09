export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  types: {
      slot: string;
      type: {
          name: string;
          url: string;
      }
  }[];
  abilities: {
    ability: {
      name: string,
      url: string
    },
    is_hidden: boolean,
    slot: number
  }[]
  species: {
    name: string;
    url: string;
  }
};

export interface EvolutionLink {
  evolves_to: EvolutionLink[];
  species: {
    name: string;
    url: string;
  }
}

export type EvolutionChain = {
  id: number;
  chain: EvolutionLink;
}