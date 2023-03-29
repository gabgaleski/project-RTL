import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes no componente "PokemonDetails"', () => {
  it('Testa se as informaçoes sao mostradas na tela', () => {
    renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(getLink);

    const getTitleDetails = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });

    const getSubTitle = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });

    const getParagraph = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    expect(getLink).not.toBeInTheDocument();
    expect(getTitleDetails).toBeInTheDocument();
    expect(getSubTitle).toBeInTheDocument();
    expect(getParagraph).toBeInTheDocument();
  });

  it('Testando se existe os mapas na pagina', () => {
    renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(getLink);

    const getLocationTitle = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });

    const getParagraphLocationOne = screen.getByText(/kanto viridian forest/i);
    const getParagraphLocationTwo = screen.getByText(/kanto power plant/i);

    const getImageAll = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });

    expect(getLocationTitle).toBeInTheDocument();
    expect(getParagraphLocationOne).toBeInTheDocument();
    expect(getParagraphLocationTwo).toBeInTheDocument();
    expect(getImageAll).toHaveLength(2);
    expect(getImageAll[0]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(getImageAll[1]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Testando se é possivel favoritar um pokemon na pagina de detalhes', () => {
    renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(getLink);

    const getInput = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(getInput);

    const getImageFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(getImageFavorite).toBeInTheDocument();
    expect(getInput).toBeChecked();

    userEvent.click(getInput);

    expect(getInput).not.toBeChecked();
    expect(getImageFavorite).not.toBeInTheDocument();
    expect(getImageFavorite).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
