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
    expect(screen.getByText(/Registrar Guía/i )).toBeInTheDocument();
    });

    it('shows error when guide number already exists', async () => {
        renderGuideForm();

        const testData = {
          trackingNumber: 'HGX-2023-001',
          origin: 'Guadalajara',
          destination: 'Tijuana',
          recipient: 'María García'
        };

        fireEvent.change(screen.getByLabelText(/Número de Guía:/i), {
        target: { name: 'trackingNumber', value: testData.trackingNumber }
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
        
        fireEvent.click(screen.getByText(/Registrar Guía/i));

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
      trackingNumber: 'HGX-2025-001',
      origin: 'Guadalajara',
      destination: 'Tijuana',
      recipient: 'María García'
    };

    fireEvent.change(screen.getByLabelText(/Número de Guía:/i), {
      target: { name: 'trackingNumber', value: testData.trackingNumber }
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

    fireEvent.click(screen.getByText(/Registrar Guía/i));

    await waitFor(() => {
      expect(mockAddGuide).toHaveBeenCalled();      
      expect(screen.getByLabelText(/Número de Guía:/i)).toHaveValue('');
    });
  });
});