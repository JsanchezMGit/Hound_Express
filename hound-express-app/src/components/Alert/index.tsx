import { useEffect } from 'react';
import './index.css';

type AlertType = 'success' | 'error';

interface AlertProps {
  message: string;
  type: AlertType;
  onClose: () => void;
  duration?: number;
}

const Alert = ({ message, type, onClose, duration = 3000 }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`alert alert--${type}`} aria-hidden="true" role="alert">
      {message}
    </div>
  );
};

export default Alert;