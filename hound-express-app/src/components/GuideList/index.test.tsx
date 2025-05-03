import { render, screen, fireEvent } from '@testing-library/react';
import GuideList from './Index';
import { describe, it, expect, vi } from 'vitest';
import { IGuide } from '../../types';

const mockGuides: IGuide[] = [
    {
        id: '1',
        number: 'ABC123',
        origin: 'CDMX',
        destination: 'Monterrey',
        recipient: 'Juan Pérez',
        creationDate: '2023-01-01',
        status: 'pending',
        lastUpdate: '2023-01-01',
        history: [{ status: 'pending', date: '2023-01-01', time: '10:00' }]
    },
    {
        id: '2',
        number: 'XYZ789',
        origin: 'Guadalajara',
        destination: 'Tijuana',
        recipient: 'María García',
        creationDate: '2023-01-02',
        status: 'delivered',
        lastUpdate: '2023-01-05',
        history: [
            { status: 'pending', date: '2023-01-02', time: '12:00' },
            { status: 'transit', date: '2023-01-04', time: '14:30' },
            { status: 'delivered', date: '2023-01-05', time: '09:15' }
        ]
    }
];

const mockOnSearch = vi.fn();
const mockOnUpdateStatus = vi.fn();
const mockOnShowHistory = vi.fn();

describe('GuideList Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('Debe renderear el componente con el titulo y el campo de busqueda', () => {
        render(
        <GuideList 
            guides={mockGuides} 
            onSearch={mockOnSearch}
            onUpdateStatus={mockOnUpdateStatus}
            onShowHistory={mockOnShowHistory}
        />
        );

        expect(screen.getByText(/Lista de Guías Registradas/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Buscar guía.../i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Buscar guia/i })).toBeInTheDocument();
    });

    it('Debe mostrar todas las guias en la tabla', () => {
        render(
            <GuideList 
            guides={mockGuides} 
            onSearch={mockOnSearch}
            onUpdateStatus={mockOnUpdateStatus}
            onShowHistory={mockOnShowHistory}
            />
    );

        expect(screen.getByText(/Número de Guía/i)).toBeInTheDocument();
        expect(screen.getByText(/Estado/i)).toBeInTheDocument();
        expect(screen.getByText(/Origen/i)).toBeInTheDocument();
        expect(screen.getByText(/Destino/i)).toBeInTheDocument();
        expect(screen.getByText(/Última Actualización/i)).toBeInTheDocument();
        expect(screen.getByText(/Acciones/i)).toBeInTheDocument();
        expect(screen.getByText('ABC123')).toBeInTheDocument();
        expect(screen.getByText('CDMX')).toBeInTheDocument();
        expect(screen.getByText('Monterrey')).toBeInTheDocument();
        expect(screen.getByText('XYZ789')).toBeInTheDocument();
        expect(screen.getByText('Guadalajara')).toBeInTheDocument();
        expect(screen.getByText('Tijuana')).toBeInTheDocument();
  });

    it('Debe mostrar el mensaje "No se encontraron guías" cuando no hay coincidencias', () => {
        render(
            <GuideList 
            guides={[]} 
            onSearch={mockOnSearch}
            onUpdateStatus={mockOnUpdateStatus}
            onShowHistory={mockOnShowHistory}
            />
        );

        expect(screen.getByText(/No se encontraron guías/i)).toBeInTheDocument();
        expect(screen.getByText(/No se encontraron guías/i)).toHaveAttribute('colspan', '6');
    });

    it('Debe llamar al metodo onSearch cuando se ingresa texto en el campo de busqueda', async () => {
        render(
            <GuideList 
            guides={mockGuides} 
            onSearch={mockOnSearch}
            onUpdateStatus={mockOnUpdateStatus}
            onShowHistory={mockOnShowHistory}
            />
        );

        const searchInput = screen.getByPlaceholderText(/Buscar guía.../i);
        fireEvent.change(searchInput, { target: { value: 'ABC' } });

        expect(mockOnSearch).toHaveBeenCalledWith('ABC');
    });

    it('Debe estar deshabilitado el boton de actualizar cuando el estatus es Entregado', () => {
        render(
            <GuideList 
            guides={mockGuides} 
            onSearch={mockOnSearch}
            onUpdateStatus={mockOnUpdateStatus}
            onShowHistory={mockOnShowHistory}
            />
        );

        const deliveredGuideUpdateButton = screen.getAllByRole('button', { name: /Actualizar estatus/i })[1];
        expect(deliveredGuideUpdateButton).toBeDisabled();
        const pendingGuideUpdateButton = screen.getAllByRole('button', { name: /Actualizar estatus/i })[0];
        expect(pendingGuideUpdateButton).not.toBeDisabled();
    });

    it('Debe llamar al metodo onUpdateStatus cuando se hace clic en el boton de actualizar', () => {
        render(
            <GuideList 
            guides={mockGuides} 
            onSearch={mockOnSearch}
            onUpdateStatus={mockOnUpdateStatus}
            onShowHistory={mockOnShowHistory}
            />
        );

        const updateButtons = screen.getAllByRole('button', { name: /Actualizar estatus/i });
        fireEvent.click(updateButtons[0]);

        expect(mockOnUpdateStatus).toHaveBeenCalledWith('1');
    });

    it('Debe llamar al metodo onShowHistory cuando se hace clic en el buton de historial', () => {
        render(
            <GuideList 
            guides={mockGuides} 
            onSearch={mockOnSearch}
            onUpdateStatus={mockOnUpdateStatus}
            onShowHistory={mockOnShowHistory}
            />
        );

        const historyButtons = screen.getAllByRole('button', { name: /Ver historial/i });
        fireEvent.click(historyButtons[0]);

        expect(mockOnShowHistory).toHaveBeenCalledWith(mockGuides[0]);
    });

    it('Las fechas deben estar en el formato correcto', () => {
        render(
            <GuideList 
            guides={mockGuides} 
            onSearch={mockOnSearch}
            onUpdateStatus={mockOnUpdateStatus}
            onShowHistory={mockOnShowHistory}
            />
        );

        expect(screen.getAllByText(/\d{2}\/\d{2}\/\d{4}/)).toHaveLength(2);
    });
});