import { IAlert, IAppState, IGuide } from '../types';
import guidesReducer, { addGuide, hideAlert, hideModal, setCurrentGuide, setSearchTerm, showAlert, showModal, updateGuideStatus } from './guidesSlice';
import initialGuidesJSON from '../data/guides.json';

const newGuide : IGuide = {
    id: 'HGX-2025-001',
    number: 'HGX-2025-001',
    origin: 'Bogotá',
    destination: 'Medellín',
    recipient: 'Cliente Ejemplo 1',
    creationDate: '2025-05-02',
    status: 'pending',
    lastUpdate: '2025-05-02',
    history: [{ status:'pending', date:'2025-05-02', time:'18:40' }]
};

let expectedInitialState: IAppState = {
    guides: initialGuidesJSON as IGuide[],
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
    }
};

describe('Reductores de guidesSlice', () => {
  it('Debe manejar cargar el estado inicial desde hound-express-app/src/data/guides.json', () => {
    const initialState = guidesReducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual(expectedInitialState);
  });

  it('Debe de agregar una guia', () => {
    const state = guidesReducer(expectedInitialState, addGuide(newGuide));
    expect(state.guides).toHaveLength(5);
    expect(state.guides[4]).toEqual(newGuide);
  });

  const guideToTransit = 'HGX-2023-003';
  it(`Debe actualizar el estatus a la guia ${guideToTransit} de pending a transit`, () => {
    const updatedState = guidesReducer(expectedInitialState, updateGuideStatus(guideToTransit));
    expect(updatedState.guides.find(g => g.id === guideToTransit)?.status).toBe('transit');
  });

  const guideToDelivered = 'HGX-2023-004';
  it(`Debe actualizar el estatus a la guia ${guideToDelivered} de transit a delivered`, () => {
    const updatedState = guidesReducer(expectedInitialState, updateGuideStatus(guideToDelivered));
    expect(updatedState.guides.find(g => g.id === guideToDelivered)?.status).toBe('delivered');
  });
  
  const searchTerm = '004';
  it(`El parametro de busqueda debe ser el ingresado (${searchTerm})`, () => {
    const updatedState = guidesReducer(expectedInitialState, setSearchTerm(searchTerm));
    expect(updatedState.searchTerm).toBe(searchTerm);
  });

  it('La guia actual debe ser la seleccionada', () => {
    const updatedState = guidesReducer(expectedInitialState, setCurrentGuide(newGuide));
    expect(updatedState.currentGuide).toBe(newGuide);
  });

  it('Los valores del alerta deben ser los pasados', () => {
    const alert : IAlert = { show: true, message: 'Mensaje de prueba', type: 'success' };
    const updatedState = guidesReducer(expectedInitialState, showAlert({ message: alert.message, type: alert.type }));
    expect(updatedState.alert).toStrictEqual(alert);
  });

  it('El valor de show de la alerta debe ser falso', () => {
    const updatedState = guidesReducer(expectedInitialState, hideAlert());
    expect(updatedState.alert.show).toBe(false);
  });

  const modalTitle = 'Titulo de prueba';
  it(`El valor del titulo del modal debe ser ${modalTitle} y el valor de show debe ser verdadero`, () => {
    const updatedState = guidesReducer(expectedInitialState, showModal(modalTitle));
    expect(updatedState.modal.title).toBe(modalTitle);
    expect(updatedState.modal.show).toBe(true);
  });

  it(`El valor show debe ser verdadero del modal debe ser falso`, () => {
    const updatedState = guidesReducer(expectedInitialState, hideModal());
    expect(updatedState.modal.show).toBe(false);
  });  
})
