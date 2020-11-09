import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Axios from 'axios';
import { DetailsModal, List } from '../components';
import { PAGE_SIZE } from '../../../shared/constants';
import { Pokemon } from '../interfaces';
import { DetailsContainer } from './DetailsContainer';


export const ListContainer = () => {
    const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedPokemonId, setSelectedPokemonId] = useState(null);

    useEffect(() => {
        const getPokemon = async() => {
            try {
                setLoading(true);
                const pokemonResponse = await Axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${currentPage*PAGE_SIZE}&limit=${PAGE_SIZE}`);
                const pokemonResults = pokemonResponse.data?.results || [];
                const pokemonDetailsPromises = pokemonResults.map(({ url }: { url: string }) => Axios.get(url));
                const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
                const pokemonDetails = pokemonDetailsResponses.map((response: any) => response.data);
                setPokemonArray(prevValue => ([...prevValue, ...pokemonDetails]));
            } catch (_error) {
                console.log(_error);
                window.alert('Ocurrio un error.')
            } finally {
                setLoading(false);
            }
        }
        getPokemon();
    }, [currentPage]);

    // Handler for when the bottom of the page is reached and the current page is increased.
    const handleEndReached = useCallback(() => {
        setCurrentPage(prevValue => prevValue + 1);
    }, [currentPage]);

    const handleSelection = useCallback((idPokemon) => {
        setSelectedPokemonId(idPokemon);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedPokemonId(null);
    }, []);

    const selectedPokemon = useMemo(() => pokemonArray.filter(x => x.id === selectedPokemonId)[0], [selectedPokemonId]);

    return (
      <>
        {/* <DetailsModal pokemon={selectedPokemon} visible={!!selectedPokemon} onClose={handleCloseModal} /> */}
        <DetailsContainer
          pokemon={selectedPokemon}
          visible={!!selectedPokemon}
          onClose={handleCloseModal}
        />
        <List
          pokemonArray={pokemonArray}
          onEndReached={handleEndReached}
          loading={loading}
          onPress={handleSelection}
        />
      </>
    );
}