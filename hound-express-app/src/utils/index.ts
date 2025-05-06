import { statusFlow, StatusType } from "../types";

// Función auxiliar para formatear fechas
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
  
export const getDateTime = (dateString: string) => {
    const date = dateString.split('T')[0];
    const time = dateString.split('T')[1].substring(0, 8);
    return { date, time };
}

export const getNextGuideStatus = (currenStatus: StatusType): StatusType | null => {
    const currentStatusIndex = statusFlow.indexOf(currenStatus);
    const newStatus = currentStatusIndex < statusFlow.length - 1 ? statusFlow[currentStatusIndex + 1] : null;
    return newStatus;
}