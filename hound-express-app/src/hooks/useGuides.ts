import { useReducer } from 'react';
import { guideReducer, initialState } from '../reducers/guideReducer';
import { IGuide, statusLabels } from '../types';

export function useGuides() {
  const [state, dispatch] = useReducer(guideReducer, initialState);

  const addGuide = (newGuide: IGuide) => {
    dispatch({ type: 'ADD_GUIDE', payload: newGuide });
  };

  const updateGuideStatus = (guideId: string) => {
    dispatch({ type: 'UPDATE_GUIDE_STATUS', payload: guideId });
  };

  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const showGuideHistory = (guide: IGuide) => {
    dispatch({ type: 'SET_CURRENT_GUIDE', payload: guide });
    dispatch({ type: 'SHOW_MODAL', payload: `Historial de la guía ${guide.number}` });
  };

  const hideModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
    dispatch({ type: 'SET_CURRENT_GUIDE', payload: null });
  };

  const showAlert = (message: string, type: 'success' | 'error') => {
    dispatch({ type: 'SHOW_ALERT', payload: { message, type } });
  };

  const hideAlert = () => {
    dispatch({ type: 'HIDE_ALERT' });
  };

  // Filtrar guías basado en el término de búsqueda
  const filteredGuides = state.guides.filter(guide => 
    state.searchTerm === '' ||
    guide.number.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    guide.origin.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    guide.destination.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    guide.recipient.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    statusLabels[guide.status].toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  return {
    state,
    filteredGuides,
    addGuide,
    updateGuideStatus,
    setSearchTerm,
    showGuideHistory,
    hideModal,
    showAlert,
    hideAlert
  };
}