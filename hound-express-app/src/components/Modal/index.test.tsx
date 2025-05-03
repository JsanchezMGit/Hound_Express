import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Index';
import { describe, it, expect, vi } from 'vitest';

describe('Modal Component', () => {
    const mockOnClose = vi.fn();
    const mockTitle = 'Test Modal';
    const mockChildren = <div>Modal Content</div>;

    it('No debe renderear cuando el valor isOpen de modal es falso', () => {
        const { container } = render(<Modal isOpen={false} onClose={mockOnClose} title={mockTitle}>{mockChildren}</Modal>);
        expect(container).toBeEmptyDOMElement();
    });

    it('Debe renderar correctamente cuando el valor isOpen de modal es verdadero', () => {
        render(<Modal isOpen={true} onClose={mockOnClose} title={mockTitle}>{mockChildren}</Modal>);
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
        expect(modal).toHaveClass('modal');
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockTitle).tagName).toBe('H2');
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
        const closeButton = screen.getByText('×');
        expect(closeButton).toBeInTheDocument();
        expect(closeButton).toHaveClass('modal__close');
    });

    it('Debe llamar al metodo onClose cuando se hace clic en el boton de cerrar', () => {
        render(<Modal isOpen={true} onClose={mockOnClose} title={mockTitle}>{mockChildren}</Modal>);
        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('Debe llamar al metodo onClose cuando se hace clic fuera del contenido del modal', () => {
        render(<Modal isOpen={true} onClose={mockOnClose} title={mockTitle}>{mockChildren}</Modal>);
        const modal = screen.getByRole('dialog');
        fireEvent.click(modal, { bubbles: false });
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});