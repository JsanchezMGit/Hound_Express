import { render, screen } from '@testing-library/react';
import Banner from './Index';
import { describe, it, expect } from 'vitest';

describe('Banner Component', () => {
  it('Debe renderizar el contenido correctamente', () => {
    render(<Banner />);
    
    // Verificar que el título se renderiza correctamente
    const titleElement = screen.getByText(/Seguimiento de Paquetes en Tiempo Real/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('banner__title');
    
    // Verificar que el texto descriptivo se renderiza correctamente
    const textElement = screen.getByText(/Tu paquete, nuestra prioridad - siempre sabrás dónde está/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('banner__text');
    
    // Verificar que la imagen se renderiza correctamente
    const imageElement = screen.getByAltText('Capcidad logistica de Mi perro veloz, con diversos vehiculos como barcos, aviones, tailers y contenedores');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveClass('banner__image');
    expect(imageElement).toHaveAttribute('src');
    
    // Verificar que la sección tiene el ID correcto
    const sectionElement = screen.getByTestId('banner-section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveAttribute('id', 'inicio');
    expect(sectionElement).toHaveClass('banner');
  });
});