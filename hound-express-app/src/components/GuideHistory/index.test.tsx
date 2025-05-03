import { render, screen } from '@testing-library/react';
import GuideHistory from './Index';
import { describe, it, expect } from 'vitest';
import { IGuide } from '../../types';

const mockGuide: IGuide = {
    id: 'HGX-2025-001',
    number: 'HGX-2025-001',
    origin: 'CDMX',
    destination: 'Monterrey',
    recipient: 'Juan Pérez',
    creationDate: '2025-01-01',
    status: 'delivered',
    lastUpdate: '2025-01-05',
    history: [
        { status: 'pending', date: '2025-01-01', time: '10:00' },
        { status: 'transit', date: '2025-01-03', time: '14:30' },
        { status: 'delivered', date: '2025-01-05', time: '09:15' }
    ]
};

describe('GuideHistory Component', () => {
    it('No debe renderear nada cuando la guia sea nula', () => {
        const { container } = render(<GuideHistory guide={null} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Debe renderear correctamente la informacion de la guia', () => {
        render(<GuideHistory guide={mockGuide} />);

        expect(screen.getByText(/Origen:/i)).toBeInTheDocument();
        expect(screen.getByText(mockGuide.origin)).toBeInTheDocument();
        expect(screen.getByText(/Destino:/i)).toBeInTheDocument();
        expect(screen.getByText(mockGuide.destination)).toBeInTheDocument();
        expect(screen.getByText(/Destinatario:/i)).toBeInTheDocument();
        expect(screen.getByText(mockGuide.recipient)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Registro de cambios/i })).toBeInTheDocument();
    });

    it('Debe renderear la tabla de seguimiento con la data correcta', () => {
        render(<GuideHistory guide={mockGuide} />);

        expect(screen.getByRole('columnheader', { name: /Estado/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /Fecha/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /Hora/i })).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(4);
        expect(screen.getByText(/Pendiente/i)).toBeInTheDocument();
        expect(screen.getByText('01/01/2025')).toBeInTheDocument();
        expect(screen.getByText('10:00')).toBeInTheDocument();

        expect(screen.getByText(/En tránsito/i)).toBeInTheDocument();
        expect(screen.getByText('03/01/2025')).toBeInTheDocument();
        expect(screen.getByText('14:30')).toBeInTheDocument();        

        expect(screen.getByText(/Entregado/i)).toBeInTheDocument();
        expect(screen.getByText('05/01/2025')).toBeInTheDocument();
        expect(screen.getByText('09:15')).toBeInTheDocument();
    });

    it('Debe aplicar las clases correspondientes a cada estatus', () => {
        render(<GuideHistory guide={mockGuide} />);

        const pendingBadge = screen.getByText(/Pendiente/i).closest('span');
        const transitBadge = screen.getByText(/En tránsito/i).closest('span');
        const deliveredBadge = screen.getByText(/Entregado/i).closest('span');

        expect(pendingBadge).toHaveClass('status-badge--modal');
        expect(pendingBadge).toHaveClass('badge--pending');

        expect(transitBadge).toHaveClass('status-badge--modal');
        expect(transitBadge).toHaveClass('badge--transit');

        expect(deliveredBadge).toHaveClass('status-badge--modal');
        expect(deliveredBadge).toHaveClass('badge--delivered');
    });
});