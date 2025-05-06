export interface IHistoryEntry {
  status: 'pending' | 'transit' | 'delivered';
  timestamp: string;
}

export interface IGuide {
  id: number;
  trackingNumber: string;
  origin: string;
  destination: string;
  recipient: string;
  creationDate: string;
  currentStatus: 'pending' | 'transit' | 'delivered';
  updatedAt: string;
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
  status: string;
  error: string | null;
}

export const IDLE = "idle";
export const LOADING = "loading";
export const SUCCEEDED = "succeeded";
export const FAILED = "failed";

export const FETCH_GUIDES = "guides";
export const FETCH_GUIDE = "guides/get";
export const CREATE_GUIDE = "guides/post";
export const UPDATE_GUIDE = "guide/put";
export const DELETE_GUIDE = "guide/delete";