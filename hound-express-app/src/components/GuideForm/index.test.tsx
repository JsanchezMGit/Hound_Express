import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GuideForm from './Index';
import { describe, it, expect, vi } from 'vitest';
import { IGuide } from '../../types';
import initialGuidesJSON from '../../data/guides.json';

const mockAddGuide = vi.fn();
const mockSetAlert = vi.fn();
const mockGuides = initialGuidesJSON as IGuide[];

const renderGuideForm = () => {
  return render(
    <GuideForm 
      guides={mockGuides} 
      addGuide={mockAddGuide} 
      setAlert={mockSetAlert} 
    />
  );
};

describe('GuideForm Component', () => {
    beforeEach(() => {
    vi.clearAllMocks();
    });

    it('renders all form fields correctly', () => {
    renderGuideForm();

    expect(screen.getByText(/Registro de Nueva Guía/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de Guía:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Origen:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destino:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destinatario:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de Creación:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado Inicial:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrar Guía/i })).toBeInTheDocument();
    });

    it('shows error when guide number already exists', async () => {
        renderGuideForm();

        const testData = {
            number: 'HGX-2023-001',
            origin: 'Guadalajara',
            destination: 'Tijuana',
            recipient: 'María García',
            creationDate: '2023-01-02',
            status: 'pending'
        };

        fireEvent.change(screen.getByLabelText(/Número de Guía:/i), {
        target: { name: 'number', value: testData.number }
        });
        fireEvent.change(screen.getByLabelText(/Origen:/i), {
        target: { name: 'origin', value: testData.origin }
        });
        fireEvent.change(screen.getByLabelText(/Destino:/i), {
        target: { name: 'destination', value: testData.destination }
        });
        fireEvent.change(screen.getByLabelText(/Destinatario:/i), {
        target: { name: 'recipient', value: testData.recipient }
        });
        fireEvent.change(screen.getByLabelText(/Fecha de Creación:/i), {
        target: { name: 'creationDate', value: testData.creationDate }
        });
        fireEvent.change(screen.getByLabelText(/Estado Inicial:/i), {
        target: { name: 'status', value: testData.status }
        });
        
        fireEvent.click(screen.getByRole('button', { name: /Registrar Guía/i }));

        await waitFor(() => {
            expect(mockSetAlert).toHaveBeenCalledWith({
            show: true,
            message: 'El numero de guia HGX-2023-001 ya existe',
            type: 'error'
            });
            expect(screen.getByLabelText(/Número de Guía:/i)).toHaveClass('invalid');
        });
    });

  it('submits form successfully with valid data', async () => {
    renderGuideForm();

    const testData = {
      number: 'HGX-2025-001',
      origin: 'Guadalajara',
      destination: 'Tijuana',
      recipient: 'María García',
      creationDate: '2023-01-02',
      status: 'pending'
    };

    fireEvent.change(screen.getByLabelText(/Número de Guía:/i), {
      target: { name: 'number', value: testData.number }
    });
    fireEvent.change(screen.getByLabelText(/Origen:/i), {
      target: { name: 'origin', value: testData.origin }
    });
    fireEvent.change(screen.getByLabelText(/Destino:/i), {
      target: { name: 'destination', value: testData.destination }
    });
    fireEvent.change(screen.getByLabelText(/Destinatario:/i), {
      target: { name: 'recipient', value: testData.recipient }
    });
    fireEvent.change(screen.getByLabelText(/Fecha de Creación:/i), {
      target: { name: 'creationDate', value: testData.creationDate }
    });
    fireEvent.change(screen.getByLabelText(/Estado Inicial:/i), {
      target: { name: 'status', value: testData.status }
    });

    fireEvent.click(screen.getByRole('button', { name: /Registrar Guía/i }));

    await waitFor(() => {
      expect(mockAddGuide).toHaveBeenCalled();
      expect(mockSetAlert).toHaveBeenCalledWith({
        show: true,
        message: `Guía ${testData.number} registrada exitosamente`,
        type: 'success'
      });
      
      expect(screen.getByLabelText(/Número de Guía:/i)).toHaveValue('');
    });
  });
});