import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente "FavoritePokemon"', () => {
  it('Ao entrar no componente "FavoritePokemon" aparece o devido texto', () => {
    renderWithRouter(<FavoritePokemon />);

    const getInitialText = screen.getByText(/No favorite Pokémon found/i);

    expect(getInitialText).toBeInTheDocument();
  });

  it('Testa se ao favoritar um pokemon, ele é renderizado na pagina "FavoritePokemon"', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(detailsLink);

    const getCheckBox = screen.getByRole('checkbox', {
      name: /Pokémon favoritado\?/i,
    });

    userEvent.click(getCheckBox);

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });

    userEvent.click(linkFavorite);

    const pokemonName = screen.getByText(/Pikachu/i);

    expect(pokemonName).toBeInTheDocument();
  });
});
