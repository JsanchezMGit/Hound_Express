import {   IAppState, IGuide, IDLE, SUCCEEDED, FAILED, IAlert } from '../types';
import guidesReducer, { addGuide, hideAlert, hideModal, 
  setCurrentGuide, setSearchTerm, showAlert, showModal, 
  updateGuide, fectchGuides } from './guidesSlice';

const newGuide : IGuide = {
    id: 1,
    trackingNumber: 'HGX-2025-001',
    origin: 'Bogotá',
    destination: 'Medellín',
    recipient: 'Cliente Ejemplo 1',
    creationDate: '2025-05-02T:12:00:00',
    currentStatus: 'pending',
    updatedAt: '2025-05-02T:12:00:00',
    history: [{ status:'pending', timestamp:'2025-05-02T:12:00:00' }]
};

const updatedGuide: IGuide = {
  ...newGuide,
  currentStatus: 'transit',
  updatedAt: '2025-05-02T13:00:00',
  history: [
    ...newGuide.history,
    { status: 'transit', timestamp: '2025-05-02T13:00:00' }
  ]
};

const expectedInitialState: IAppState = {
  guides: [],
  searchTerm: '',
  currentGuide: null,
  alert: {
    show: false,
    message: '',
    type: 'success'
  },
  modal: {
    show: false,
    title: ''
  },
  status: IDLE,
  error: null
};

describe('Reductores de guidesSlice', () => {
  it('Debe manejar cargar el estado inicial', () => {
    const initialState = guidesReducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual(expectedInitialState);
  });

  it('Debe agregar manejar el estado fulfilled de addGuide', () => {
    const action = { type: addGuide.fulfilled.type, payload: newGuide };
    const state = guidesReducer(expectedInitialState, action);
    
    expect(state.status).toBe(SUCCEEDED);
    expect(state.guides).toContainEqual(newGuide);
    expect(state.alert).toEqual({
      show: true,
      message: `Guía ${newGuide.trackingNumber} registrada exitosamente`,
      type: 'success'
    });
  });
  
  it('Debe manejar el estado rejected de addGuide', () => {
    const errorMessage = 'Error al crear guía';
    const action = { type: addGuide.rejected.type, payload: errorMessage };
    const state = guidesReducer(expectedInitialState, action);
    
    expect(state.status).toBe(FAILED);
    expect(state.error).toBe(errorMessage);
    expect(state.alert).toEqual({
      show: true,
      message: 'Ocurrio un error al crear la guía',
      type: 'error'
    });
  });

  it('Debe manejar el estado fulfilled de updateGuide', () => {
    const stateWithGuide = guidesReducer(
      expectedInitialState, 
      { type: addGuide.fulfilled.type, payload: newGuide }
    );
    
    const action = { type: updateGuide.fulfilled.type, payload: updatedGuide };
    const state = guidesReducer(stateWithGuide, action);
    
    expect(state.status).toBe(SUCCEEDED);
    expect(state.guides.find(g => g.id === updatedGuide.id)?.currentStatus)
      .toBe('transit');
    expect(state.alert).toEqual({
      show: true,
      message: `Estado de la guia ${updatedGuide.trackingNumber} actualizado exitosamente`,
      type: 'success'
    });
  });

  it('Debe manejar el estado fulfilled de fectchGuides', () => {
    const guides = [newGuide, updatedGuide];
    const action = { type: fectchGuides.fulfilled.type, payload: guides };
    const state = guidesReducer(expectedInitialState, action);
    
    expect(state.status).toBe(SUCCEEDED);
    expect(state.guides).toEqual(guides);
  });
});

describe('Acciones síncronas', () => {
  const searchTerm = '004';
  it(`Debe actualizar el término de búsqueda (${searchTerm})`, () => {
    const updatedState = guidesReducer(expectedInitialState, setSearchTerm(searchTerm));
    expect(updatedState.searchTerm).toBe(searchTerm);
  });

  it('Debe establecer la guía actual', () => {
    const updatedState = guidesReducer(expectedInitialState, setCurrentGuide(newGuide));
    expect(updatedState.currentGuide).toBe(newGuide);
  });

  it('Debe mostrar la alerta con el mensaje correcto', () => {
    const alert : IAlert = { show: true, message: 'Mensaje de prueba', type: 'success' };
    const updatedState = guidesReducer(expectedInitialState, showAlert({ message: alert.message, type: alert.type }));
    expect(updatedState.alert).toStrictEqual(alert);
  });

  it('Debe ocultar la alerta', () => {
    const updatedState = guidesReducer(expectedInitialState, hideAlert());
    expect(updatedState.alert.show).toBe(false);
  });

  const modalTitle = 'Titulo de prueba';
  it(`Debe mostrar el modal con título ${modalTitle}`, () => {
    const updatedState = guidesReducer(expectedInitialState, showModal(modalTitle));
    expect(updatedState.modal.title).toBe(modalTitle);
    expect(updatedState.modal.show).toBe(true);
  });

  it(`Debe ocultar el modal`, () => {
    const updatedState = guidesReducer(expectedInitialState, hideModal());
    expect(updatedState.modal.show).toBe(false);
  });
});
