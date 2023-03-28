import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes no componente APP', () => {
  it('Testando se contem os links fixos ao entrar na pagina', () => {
    renderWithRouter(<App />);

    const getLinkHome = screen.getByRole('link', {
      name: 'Home',
    });
    const getLinkAbout = screen.getByRole('link', {
      name: 'About',
    });
    const getLinkFavorit = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });

    expect(getLinkHome).toBeInTheDocument();
    expect(getLinkAbout).toBeInTheDocument();
    expect(getLinkFavorit).toBeInTheDocument();
  });

  it('Testa se ao clicar no link "Home", a pagina é redirecionada para o url "/"', () => {
    const { history } = renderWithRouter(<App />);

    const getLinkHome = screen.getByRole('link', {
      name: 'Home',
    });

    userEvent.click(getLinkHome);

    expect(history.location.pathname).toBe('/');
  });

  it('Testa se ao clicar no link "About", a pagina é redirecionada para o url "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const getLinkHome = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(getLinkHome);

    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se ao clicar no link "Favorite Pokémon", a pagina é redirecionada para o url "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const getLinkHome = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });

    userEvent.click(getLinkHome);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se ao entrar em uma URL desconhecida, é redirecionado para a pagina "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/undefined/');
    });

    const getTitleNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(getTitleNotFound).toBeInTheDocument();
  });
});
