import { render, screen } from '@testing-library/react';
import StatusPanel from './Index';
import { describe, it, expect } from 'vitest';
import { IGuide } from '../../types';

const mockGuides: IGuide[] = [
  { id: '1', status: 'pending', number: 'G-001', origin: 'CDMX', destination: 'Monterrey', recipient: 'Cliente A', creationDate: '2023-01-01', lastUpdate: '2023-01-01', history: [] },
  { id: '2', status: 'transit', number: 'G-002', origin: 'Guadalajara', destination: 'Tijuana', recipient: 'Cliente B', creationDate: '2023-01-02', lastUpdate: '2023-01-03', history: [] },
  { id: '3', status: 'transit', number: 'G-003', origin: 'Puebla', destination: 'Cancún', recipient: 'Cliente C', creationDate: '2023-01-03', lastUpdate: '2023-01-04', history: [] },
  { id: '4', status: 'delivered', number: 'G-004', origin: 'Querétaro', destination: 'Mérida', recipient: 'Cliente D', creationDate: '2023-01-04', lastUpdate: '2023-01-05', history: [] },
  { id: '5', status: 'delivered', number: 'G-005', origin: 'León', destination: 'Veracruz', recipient: 'Cliente E', creationDate: '2023-01-05', lastUpdate: '2023-01-06', history: [] }
];

describe('StatusPanel Component', () => {
    it('Debe renderear el titulo correcto', () => {
        render(<StatusPanel guides={mockGuides} />);
        expect(screen.getByText(/Estado General del Sistema/i)).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('Debe de contar correctamente cuando no har registros', () => {
        render(<StatusPanel guides={[]} />);

        expect(screen.getAllByText('0')).toHaveLength(4);
    });

    it('Debe mostrar los conteos correctos, sin importar que no todos los estatus se encuentren', () => {
        const filteredGuides = mockGuides.filter(g => g.status !== 'delivered');
        render(<StatusPanel guides={filteredGuides} />);

        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('Debe aplicar correctamente las clases', () => {
        render(<StatusPanel guides={mockGuides} />);

        const panel = screen.getByRole('region', { name: /Panel de estado del sistema/i });
        expect(panel).toHaveClass('status__panel');

        const cards = screen.getAllByTestId('status-card');
        expect(cards).toHaveLength(4);
        cards.forEach(card => {
            expect(card).toHaveClass('status__card');
        });
    });
});