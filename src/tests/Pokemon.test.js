import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testes com o componente "Pokemon.js"', () => {
  it('Testa se renderiza a card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const getNextButton = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });

    pokemonList.forEach((pokemon) => {
      const { averageWeight } = pokemon;
      const getWeight = (
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`
      );
      const getImage = screen.getByRole('img', {
        name: `${pokemon.name} sprite`,
      });
      const getLink = screen.getByRole('link', {
        name: /More details/i,
      });
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getAllByText(pokemon.type)).toHaveLength(2);
      expect(screen.getByText(getWeight)).toBeInTheDocument();
      expect(getImage).toBeInTheDocument();
      expect(getImage).toHaveProperty('src', pokemon.image);
      expect(getLink).toBeInTheDocument();
      expect(getLink).toHaveProperty('href', `http://localhost/pokemon/${pokemon.id}`);
      userEvent.click(getNextButton);
    });
  });

  it('Testa se ao clicar no link de detalher, ocorre um redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(getLink);

    const getTitleDetails = screen.getByRole('heading', {
      name: /Pikachu Details/i,
    });

    const getInput = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(getInput);

    const getImageFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(getImageFavorite).toBeInTheDocument();
    expect(getImageFavorite).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(getTitleDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemon/25');
  });
});
