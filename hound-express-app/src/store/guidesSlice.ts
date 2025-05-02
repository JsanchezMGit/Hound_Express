import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState, IGuide, statusFlow } from '../types';
import initialGuidesJSON from '../data/guides.json';

const initialState: IAppState = {
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

const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {
    addGuide: (state, action: PayloadAction<IGuide>) => {
      state.guides.push(action.payload);
      state.alert = {
        show: true,
        message: 'Guía registrada exitosamente',
        type: 'success'
      };
    },
    updateGuideStatus: (state, action: PayloadAction<string>) => {
      const guide = state.guides.find(g => g.id === action.payload);
      if (guide) {
        const currentStatusIndex = statusFlow.indexOf(guide.status);
        if (currentStatusIndex < statusFlow.length - 1) {
          const newStatus = statusFlow[currentStatusIndex + 1];
          const currentDate = new Date().toISOString().split('T')[0];
          const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          guide.status = newStatus;
          guide.lastUpdate = currentDate;
          guide.history.push({ status: newStatus, date: currentDate, time: currentTime });
          
          state.alert = {
            show: true,
            message: 'Estado actualizado exitosamente',
            type: 'success'
          };
        }
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentGuide: (state, action: PayloadAction<IGuide | null>) => {
      state.currentGuide = action.payload;
    },
    showAlert: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' }>) => {
      state.alert = {
        show: true,
        message: action.payload.message,
        type: action.payload.type
      };
    },
    hideAlert: (state) => {
      state.alert.show = false;
    },
    showModal: (state, action: PayloadAction<string>) => {
      state.modal = {
        show: true,
        title: action.payload
      };
    },
    hideModal: (state) => {
      state.modal.show = false;
    }
  }
});

export const { 
  addGuide, 
  updateGuideStatus, 
  setSearchTerm, 
  setCurrentGuide,
  showAlert,
  hideAlert,
  showModal,
  hideModal
} = guidesSlice.actions;

export default guidesSlice.reducer;