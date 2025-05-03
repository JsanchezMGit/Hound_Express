import { render, screen, waitFor } from '@testing-library/react';
import Alert from './index';
import { vi } from 'vitest';

describe('Alert component', () => {
    const alertMessage = 'Mensaje de prueba';
    it(`Debe mostrar una alerta de tipo exitosa con el mensaje ${alertMessage}`, () => {
        render(<Alert message={alertMessage} type='success' onClose={() => {}} />);
        const alert = screen.getByText(alertMessage);
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass('alert');
        expect(alert).toHaveClass('alert--success');
    });
    
    it(`Debe mostrar una alerta de tipo fallida con el mensaje ${alertMessage}`, () => {
        render(<Alert message={alertMessage} type='error' onClose={() => {}} />);
        const alert = screen.getByText(alertMessage);
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass('alert');
        expect(alert).toHaveClass('alert--error');
    });

    const msToClose = 50;
    it(`Debe cerrar el mensaje de alerta después de la duración especificada ${msToClose} ms`, async () => {
    const onClose = vi.fn()

    render(
        <Alert
        message="Mensaje de error"
        type="error"
        onClose={onClose}
        duration={msToClose}
        />
    );

    expect(onClose).not.toHaveBeenCalled();

    await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
    }, { timeout: msToClose + 50 });
    });
});