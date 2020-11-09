import React, { useEffect, useState } from "react";
import Axios from "axios";
import { DetailsModal } from "../components";
import { Pokemon } from "../interfaces";
import { parseEvolutionChain } from "../../../shared/utils";

interface DetailsContainerProps {
  pokemon: Pokemon;
  onClose: () => void;
  visible: boolean;
}

export const DetailsContainer: React.FC<DetailsContainerProps> = (props) => {
  const { pokemon } = props;

  const [loadingEvolution, setLoadingEvolution] = useState(false);
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);
  useEffect(() => {

    // Call async function to obtain/parse the evolution chain.
    const fetchEvolutionChain = async () => {
      try {
        setLoadingEvolution(true);
        // Obtain the species payload
        const speciesData = (await Axios.get(
          pokemon.species.url
        )).data;

        // Obtain the evolution chain's payload.
        const evolutionChainData = (
          await Axios.get(speciesData?.evolution_chain?.url)
        ).data;
        // Use recursive function to flatten the evolution chain.
        const parsedEvolutionChain = parseEvolutionChain(evolutionChainData);

        // Using the obtained url's for evolutions, obtain data for each one.
        const evolutionPromises = parsedEvolutionChain.map(({ url }) =>
          Axios.get(url.replace('-species', ''))
        );
        // Create an array of promises for the API calls of each pokemon (evolution)
        const evolutionResponses = await Promise.all(evolutionPromises);

        // Extract the payload from the response.
        const evolutionDetails = evolutionResponses.map(
          (response: any) => response.data
        );
        setEvolutions(evolutionDetails);
        // 
      } catch (error) {
        console.log(error);
        window.alert("Ooops! something went wrong.");
      } finally {
        setLoadingEvolution(false);
      }
    };
    if (pokemon) {
      fetchEvolutionChain();
    }
  }, [pokemon]);
  return (
    <>
      <DetailsModal {...props} loadingEvolution={loadingEvolution} evolutions={evolutions} />
    </>
  );
};
