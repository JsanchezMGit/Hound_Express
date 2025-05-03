import { render, screen, within } from '@testing-library/react';
import Footer from './Index';
import { describe, it, expect } from 'vitest';

describe('Footer Component', () => {
    it('Debe renderizar el contenido correctamente', () => {
        render(<Footer />);

        // Verificar el contenedor principal del footer
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveClass('footer');

        // Verificar la sección "about"
        const aboutSection = screen.getByText(/Mi perro veloz/i).closest('.footer-section') as HTMLElement;
        expect(aboutSection).toBeInTheDocument();
        expect(screen.getByText(/Soluciones logísticas confiables y eficientes/i)).toBeInTheDocument();
        
        // Verificar los íconos sociales
        const socialIcons = screen.getAllByRole('link', { name: /facebook|twitter|instagram|linkedin/i });
        expect(socialIcons).toHaveLength(4);

        // Verificar los íconos sociales
        const socialLinks = within(aboutSection).getAllByRole('link');
        expect(socialLinks).toHaveLength(4);
        socialLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '#');
        });

        // Verificar la sección de contacto
        const contactHeading = screen.getByRole('heading', { name: /Contacto/i });
        const contactSection = contactHeading.closest('.footer-section') as HTMLElement;
        expect(contactSection).toBeInTheDocument();

        // Verificar la información de contacto dentro de la sección
        expect(within(contactSection).getByText(/Calle Principal al final 123, CDMX/i)).toBeInTheDocument();
        expect(within(contactSection).getByText(/\+52 0000000000/i)).toBeInTheDocument();
        expect(within(contactSection).getByText(/contacto@miperroveloz.com/i)).toBeInTheDocument();    

        // Verificar el footer bottom
        const footerBottom = screen.getByText(/© 2025 Jesus Sanchez/i).closest('.footer-bottom') as HTMLElement;
        expect(footerBottom).toBeInTheDocument();
        const legalLinks = within(footerBottom).getAllByRole('link');
        expect(legalLinks).toHaveLength(2);
    });

    it('has correct structure with data-testid attributes', () => {
        render(<Footer />);

        // Verificar estructura con data-testid (opcional)
        const footerContent = screen.getByTestId('footer-content');
        expect(footerContent).toBeInTheDocument();
        expect(footerContent.children).toHaveLength(3);
    });
});