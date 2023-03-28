import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Realiza testes no componente "About"', () => {
  it('Testando se contem as informações na tela ao entrar no componente', () => {
    renderWithRouter(<About />);

    const getTitleAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    const getParagraphTwo = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const getParagraphOne = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    const getImage = screen.getByRole('img', {
      name: /Pokédex/i,
    });

    expect(getTitleAbout).toBeInTheDocument();
    expect(getParagraphOne).toBeInTheDocument();
    expect(getParagraphTwo).toBeInTheDocument();
    expect(getImage).toBeInTheDocument();
    expect(getImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
