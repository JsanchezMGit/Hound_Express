import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  IAppState, IGuide, IDLE, LOADING, SUCCEEDED, FAILED, FETCH_GUIDES, 
  UPDATE_GUIDE, CREATE_GUIDE
} from '../types';
import api from '../api';

const initialState: IAppState = {
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

export const fectchGuides = createAsyncThunk(FETCH_GUIDES, async () => {
  try {
      const response = await api.get('guides/');
      return response.data;
  } catch (error) {
      console.error(`Ocurrio un error al intentar obtener los productos`, error);
      throw error;
  }
});

export const addGuide = createAsyncThunk(CREATE_GUIDE, async (guide: IGuide) => {
  try {
      const response = await api.post(`guides/`, guide);
      return response.data;
  } catch (error) {
      console.error(`Ocurrio un error al intentar obtener los productos`, error);
      throw error;
  }
});

export const updateGuide = createAsyncThunk(UPDATE_GUIDE, async (guide: IGuide) => {
  try {
      const response = await api.put(`guides/${guide.id}/`, guide);
      return response.data;
  } catch (error) {
      console.error(`Ocurrio un error al intentar obtener los productos`, error);
      throw error;
  }
});

const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder
        .addCase(fectchGuides.pending, (state) => {
          state.status = LOADING;
          state.error = null;
        })
        .addCase(fectchGuides.fulfilled, (state, action: PayloadAction<IGuide[]>) => {
          state.status = SUCCEEDED;
          state.guides = action.payload;
        })
        .addCase(fectchGuides.rejected, (state, action) => {
            state.status = FAILED;
            state.error = action.payload as string;
            state.alert = {
              show: true,
              message: 'Ocurrio un error al obtener las guías',
              type: 'error'
            };            
        })
        .addCase(updateGuide.pending, (state) => {
          state.status = LOADING;
          state.error = null;
        })
        .addCase(updateGuide.fulfilled, (state, action: PayloadAction<IGuide>) => {
          state.status = SUCCEEDED;
          const index = state.guides.findIndex(g => g.id === action.payload.id);
          if (index !== -1) {
            state.guides[index] = action.payload;
          }
          state.alert = {
            show: true,
            message: `Estado de la guia ${action.payload.trackingNumber} actualizado exitosamente`,
            type: 'success'
          };          
        })
        .addCase(updateGuide.rejected, (state, action) => {
            state.status = FAILED;
            state.error = action.payload as string;
            state.alert = {
              show: true,
              message: 'Ocurrio un error al actualizar la guía',
              type: 'error'
            };            
        })
        .addCase(addGuide.pending, (state) => {
          state.status = LOADING;
          state.error = null;
        })
        .addCase(addGuide.fulfilled, (state, action: PayloadAction<IGuide>) => {
          state.status = SUCCEEDED;
          state.guides.push(action.payload);
          state.alert = {
            show: true,
            message: `Guía ${action.payload.trackingNumber} registrada exitosamente`,
            type: 'success'
          };          
        })
        .addCase(addGuide.rejected, (state, action) => {
            state.status = FAILED;
            state.error = action.payload as string;
            state.alert = {
              show: true,
              message: 'Ocurrio un error al crear la guía',
              type: 'error'
            };
        })        
  }  
});

export const {
  setSearchTerm, 
  setCurrentGuide,
  showAlert,
  hideAlert,
  showModal,
  hideModal
} = guidesSlice.actions;

export default guidesSlice.reducer;