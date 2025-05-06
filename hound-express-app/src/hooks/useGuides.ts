import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { IGuide } from '../types';
import { 
  addGuide as addGuideAction, 
  updateGuide as updateGuideAction,
  setSearchTerm as setSearchTermAction,
  setCurrentGuide,
  showAlert as showAlertAction,
  hideAlert as hideAlertAction,
  showModal as showModalAction,
  hideModal as hideModalAction,
  fectchGuides as fectchGuidesAction
} from '../store/guidesSlice';
import { statusLabels } from '../types';

export function useGuides() {
  const state = useSelector((state: RootState) => state.guides);
  const dispatch = useDispatch<AppDispatch>();

  const fetchGuides = () => {
    dispatch(fectchGuidesAction());
  }

  const addGuide = (newGuide: IGuide) => {
    dispatch(addGuideAction(newGuide));
  };

  const updateGuideStatus = (guide: IGuide) => {
    dispatch(updateGuideAction(guide));
  };

  const setSearchTerm = (term: string) => {
    dispatch(setSearchTermAction(term));
  };

  const showGuideHistory = (guide: IGuide) => {
    dispatch(setCurrentGuide(guide));
    dispatch(showModalAction(`Historial de la guía ${guide.trackingNumber}`));
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
    guide.trackingNumber.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    guide.origin.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    guide.destination.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    guide.recipient.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    statusLabels[guide.currentStatus].toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  return {
    state,
    filteredGuides,
    fetchGuides,
    addGuide,
    updateGuideStatus,
    setSearchTerm,
    showGuideHistory,
    hideModal,
    showAlert,
    hideAlert
  };
}