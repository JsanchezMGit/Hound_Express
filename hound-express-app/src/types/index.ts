export interface IHistoryEntry {
  status: 'pending' | 'transit' | 'delivered';
  date: string;
  time: string;
}

export interface IGuide {
  id: string;
  number: string;
  origin: string;
  destination: string;
  recipient: string;
  creationDate: string;
  status: 'pending' | 'transit' | 'delivered';
  lastUpdate: string;
  history: IHistoryEntry[];
}

export interface IAlert {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export type StatusType = 'pending' | 'transit' | 'delivered';

export const statusFlow: StatusType[] = ['pending', 'transit', 'delivered'];

export const statusLabels: Record<StatusType, string> = {
  'pending': 'Pendiente',
  'transit': 'En tránsito',
  'delivered': 'Entregado'
};

export const statusClasses: Record<StatusType, string> = {
  'pending': 'badge--pending',
  'transit': 'badge--transit',
  'delivered': 'badge--delivered'
};

export interface IAppState {
  guides: IGuide[];
  searchTerm: string;
  currentGuide: IGuide | null;
  alert: {
    show: boolean;
    message: string;
    type: 'success' | 'error';
  };
  modal: {
    show: boolean;
    title: string;
  };
}

export type GuideAction =
  | { type: 'ADD_GUIDE'; payload: IGuide }
  | { type: 'UPDATE_GUIDE_STATUS'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_CURRENT_GUIDE'; payload: IGuide | null }
  | { type: 'SHOW_ALERT'; payload: { message: string; type: 'success' | 'error' } }
  | { type: 'HIDE_ALERT' }
  | { type: 'SHOW_MODAL'; payload: string }
  | { type: 'HIDE_MODAL' };