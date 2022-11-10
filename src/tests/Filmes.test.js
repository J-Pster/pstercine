import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Filmes } from '../pages';
import { Header } from '../components';

describe('Header', () => {
  it('Verifica se os textos dos componentes do Header estão corretos', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const textos = ['Populares', 'Em alta', 'Novos', 'Nos cinemas', 'João Pster'];
    const elementos = textos.map((texto) => screen.getByText(RegExp(texto, 'i')));

    elementos.forEach((elemento) => expect(elemento).toBeInTheDocument());
  });
});