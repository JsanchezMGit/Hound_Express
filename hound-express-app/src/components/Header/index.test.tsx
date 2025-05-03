import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Index';
import { describe, it, expect, vi } from 'vitest';

// Mock para la imagen del logo
vi.mock('../../assets/images/logo.png', () => ({
  default: 'test-logo-path.png'
}));

describe('Header Component', () => {
    beforeEach(() => {
        document.body.style.overflow = '';
    });

    it('Debe renderear el logo y el menu de hamburguesa', () => {
        render(<Header />);

        const logo = screen.getByAltText('Logo Hound Express');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'test-logo-path.png');

        const hamburgerButton = screen.getByTestId('hamburger-button');
        expect(hamburgerButton).toBeInTheDocument();
        expect(hamburgerButton).toHaveClass('header__hamburger');
    });

    it('Debe inercambiar la posicion del menu cuando se hace clic en el boton de menu', () => {
        render(<Header />);

        const hamburgerButton = screen.getByTestId('hamburger-button');
        const nav = screen.getByRole('navigation');

        expect(nav).not.toHaveClass('header__nav--active');
        expect(hamburgerButton).not.toHaveClass('header__nav--active');
        expect(document.body.style.overflow).toBe('');

        fireEvent.click(hamburgerButton);
        expect(nav).toHaveClass('header__nav--active');
        expect(hamburgerButton).toHaveClass('header__nav--active');
        expect(document.body.style.overflow).toBe('hidden');

        fireEvent.click(hamburgerButton);
        expect(nav).not.toHaveClass('header__nav--active');
        expect(hamburgerButton).not.toHaveClass('header__nav--active');
        expect(document.body.style.overflow).toBe('');
    });

    it('Debe renderear las opciones del menu correctamente', () => {
        render(<Header />);

        const navLinks = [
            { text: /Inicio/i, href: '#inicio' },
            { text: /Registro de Guías/i, href: '#registro' },
            { text: /Estado General/i, href: '#estado' },
            { text: /Lista de Guías/i, href: '#lista' },
            { text: /Buscar Guías/i, href: '#buscar' },
            { text: /Historial de Guías/i, href: '#historial' }
        ];

        navLinks.forEach(link => {
            const navLink = screen.getByRole('link', { name: link.text });
            expect(navLink).toBeInTheDocument();
            expect(navLink).toHaveAttribute('href', link.href);
            expect(navLink).toHaveClass('header__nav-link');
        });
    });

    it('Debe de tener una estructura correcta', () => {
        render(<Header />);

        // Verificar estructura semántica
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass('header');

        // Verificar navegación
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(nav).toHaveClass('header__nav');

        // Verificar lista
        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();
        expect(list).toHaveClass('header__nav-list');
        expect(list.children).toHaveLength(6);
    });
});