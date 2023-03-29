import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes no componente "Pokedex"', () => {
  it('Testa se a pagina contem um title h2 com o devido texto', () => {
    renderWithRouter(<App />);

    const getTitle = screen.getByRole('heading', {
      name: /Encountered Pokémon/i,
      level: 2,
    });

    expect(getTitle).toBeInTheDocument();
  });

  it('Testando se o botao de proximo pokemon chama apenas 1 pokemon por vez, e se todos sao chamados', () => {
    renderWithRouter(<App pokemonList={ pokemonList } />);

    const getButtonNextPokemon = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });

    // Um pokemon por vez

    const getFirstPokemonName = screen.getByText(/pikachu/i);
    const nextPokemonName = screen.queryByText(/Charmander/i);

    expect(getFirstPokemonName).toBeInTheDocument();
    expect(nextPokemonName).toBe(null);
    expect(nextPokemonName).not.toBeInTheDocument();

    // Todos os pokemons sao chamados

    pokemonList.forEach((pokemon) => {
      const getName = pokemon.name;
      expect(screen.getByText(getName)).toBeInTheDocument();
      userEvent.click(getButtonNextPokemon);
    });

    // Verifica se quando estiver no ultimo pokemon, ao clicar o botao, o primeiro é chamado

    pokemonList.forEach((pokemon, index) => {
      if (index + 1 === pokemonList) {
        userEvent.click(getButtonNextPokemon);
        const getNamePokemon = screen.getByText(/pikachu/i);
        expect(getNamePokemon).toBeInTheDocument();
      }
    });
  });

  it('Testando se a pagina tem os botoes de filtro e se eles funcionam filtando os pokemons', () => {
    renderWithRouter(<App pokemonList={ pokemonList } />);

    const getButtons = screen.getAllByTestId('pokemon-type-button');

    getButtons.forEach((name) => {
      expect(name).toBeInTheDocument();
    });

    const getButtonNextPokemon = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });

    expect(getButtonNextPokemon).toBeInTheDocument();

    const getAllButton = screen.getByRole('button', {
      name: /All/i,
    });

    expect(getAllButton).toBeInTheDocument();

    const getTypeButtonFire = screen.getByRole('button', {
      name: /Fire/i,
    });

    userEvent.click(getTypeButtonFire);

    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();

    userEvent.click(getAllButton);

    getButtons.forEach((button) => {
      userEvent.click(button);
      pokemonList.forEach((pokemon) => {
        if (pokemon.type === button.innerHTML) {
          const getPokemon = screen.getByText(pokemon.name);
          expect(getPokemon).toBeInTheDocument();

          userEvent.click(getButtonNextPokemon);
          expect(getAllButton).toBeInTheDocument();
        }
      });
    });
  });

  it('Testes com o filtro All', () => {
    const filterPokemon = jest.fn();

    renderWithRouter(<App filterPokemon={ filterPokemon('all') } />);

    const getAllButton = screen.getByRole('button', {
      name: /All/i,
    });

    const getButtonNextPokemon = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });

    const getTypeButtonFire = screen.getByRole('button', {
      name: /Fire/i,
    });

    userEvent.click(getTypeButtonFire);

    const listFiltred = pokemonList.filter(({ type }) => type === 'Fire');

    listFiltred.forEach((pokemon) => {
      const getName = screen.getByText(pokemon.name);
      expect(getName).toBeInTheDocument();
      userEvent.click(getButtonNextPokemon);
    });

    expect(listFiltred).toHaveLength(2);

    userEvent.click(getAllButton);

    pokemonList.forEach((pokemon) => {
      const getName = screen.getByText(pokemon.name);
      expect(getName).toBeInTheDocument();
      userEvent.click(getButtonNextPokemon);
    });
  });
});
