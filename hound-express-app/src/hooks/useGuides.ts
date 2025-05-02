import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { IGuide } from '../types';
import { 
  addGuide as addGuideAction, 
  updateGuideStatus as updateGuideStatusAction,
  setSearchTerm as setSearchTermAction,
  setCurrentGuide,
  showAlert as showAlertAction,
  hideAlert as hideAlertAction,
  showModal as showModalAction,
  hideModal as hideModalAction
} from '../store/guidesSlice';
import { statusLabels } from '../types';

export function useGuides() {
  const state = useSelector((state: RootState) => state.guides);
  const dispatch = useDispatch<AppDispatch>();

  const addGuide = (newGuide: IGuide) => {
    dispatch(addGuideAction(newGuide));
  };

  const updateGuideStatus = (guideId: string) => {
    dispatch(updateGuideStatusAction(guideId));
  };

  const setSearchTerm = (term: string) => {
    dispatch(setSearchTermAction(term));
  };

  const showGuideHistory = (guide: IGuide) => {
    dispatch(setCurrentGuide(guide));
    dispatch(showModalAction(`Historial de la guía ${guide.number}`));
  };

  const hideModal = () => {
    dispatch(hideModalAction());
    dispatch(setCurrentGuide(null));
  };

  const showAlert = (message: string, type: 'success' | 'error') => {
    dispatch(showAlertAction({ message, type }));
  };

  const hideAlert = () => {
    dispatch(hideAlertAction());
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