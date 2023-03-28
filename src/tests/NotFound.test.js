import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testes no componente "NotFound"', () => {
  it('Testa se contem um title h2 com o texto correto, e uma imagem com o src correto', () => {
    renderWithRouter(<NotFound />);

    const getTitle = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    const getImage = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    expect(getTitle).toBeInTheDocument();
    expect(getImage).toBeInTheDocument();
    expect(getImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
