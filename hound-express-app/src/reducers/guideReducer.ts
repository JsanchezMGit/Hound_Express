import { IAppState, GuideAction, IGuide, statusFlow } from '../types';
import initialGuidesJSON from '../data/guides.json';

export const initialState: IAppState = {
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

export function guideReducer(state: IAppState, action: GuideAction): IAppState {
  switch (action.type) {
    case 'ADD_GUIDE':
      return {
        ...state,
        guides: [...state.guides, action.payload],
        alert: {
          show: true,
          message: 'Guía registrada exitosamente',
          type: 'success'
        }
      };

    case 'UPDATE_GUIDE_STATUS':
      const updatedGuides = state.guides.map(guide => {
        if (guide.id === action.payload) {
          const currentStatusIndex = statusFlow.indexOf(guide.status);
          
          if (currentStatusIndex < statusFlow.length - 1) {
            const newStatus = statusFlow[currentStatusIndex + 1];
            const currentDate = new Date().toISOString().split('T')[0];
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return {
              ...guide,
              status: newStatus,
              lastUpdate: currentDate,
              history: [
                ...guide.history,
                { status: newStatus, date: currentDate, time: currentTime }
              ]
            };
          }
        }
        return guide;
      });
      
      return {
        ...state,
        guides: updatedGuides,
        alert: {
          show: true,
          message: 'Estado actualizado exitosamente',
          type: 'success'
        }
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };

    case 'SET_CURRENT_GUIDE':
      return {
        ...state,
        currentGuide: action.payload
      };

    case 'SHOW_ALERT':
      return {
        ...state,
        alert: {
          show: true,
          message: action.payload.message,
          type: action.payload.type
        }
      };

    case 'HIDE_ALERT':
      return {
        ...state,
        alert: {
          ...state.alert,
          show: false
        }
      };

    case 'SHOW_MODAL':
      return {
        ...state,
        modal: {
          show: true,
          title: action.payload
        }
      };

    case 'HIDE_MODAL':
      return {
        ...state,
        modal: {
          ...state.modal,
          show: false
        }
      };

    default:
      return state;
  }
}