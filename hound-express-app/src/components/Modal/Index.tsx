import { ReactNode } from 'react';
import './index.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal__content" onClick={(e) => e.stopPropagation()} data-testid="modal-content">
        <span className="modal__close" onClick={onClose}>&times;</span>
        <h2 id="modal-title">{title}</h2>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;