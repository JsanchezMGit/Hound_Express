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