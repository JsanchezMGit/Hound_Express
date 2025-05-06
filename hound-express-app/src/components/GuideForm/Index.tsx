import { useState } from 'react';
import { IAlert, IGuide } from '../../types';
import './index.css';

interface GuideFormProps {
  guides: IGuide[];
  addGuide: (guide: IGuide) => void;
  setAlert: (alert: IAlert) => void;
}

const GuideForm = ({ guides, addGuide, setAlert }: GuideFormProps) => {
  const [formData, setFormData] = useState({
    trackingNumber: '',
    origin: '',
    destination: '',
    recipient: ''
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    // Validar campos vacíos y valida duplicidad por trackingNumber
    ['trackingNumber', 'origin', 'destination', 'recipient'].forEach(field => {
      const fieldValue = formData[field as keyof typeof formData];
      if (!fieldValue) {
        newErrors[field] = true;
        isValid = false;
      } else if(field === 'trackingNumber' && guides.some(guide => guide.trackingNumber === fieldValue.trim())) {
        newErrors[field] = true;
        isValid = false;
        setAlert({ show: true, message: `El numero de guia ${fieldValue} ya existe`, type: 'error' });
      }
    });
     
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newGuide: IGuide = {
      id: 0,
      trackingNumber: formData.trackingNumber,
      origin: formData.origin,
      destination: formData.destination,
      recipient: formData.recipient,
      creationDate: '',
      currentStatus: 'pending',
      updatedAt: '',
      history: []
    };
    addGuide(newGuide);
    setFormData({
      trackingNumber: '',
      origin: '',
      destination: '',
      recipient: ''
    });
  };

  return (
    <section className="form__section" id="registro" aria-labelledby="register-title">
      <h2 id="register-title"><i className="fas fa-edit"></i> Registro de Nueva Guía</h2>
      <form id="guide-form" className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="guide-number" className={errors.trackingNumber ? 'invalid' : ''}>Número de Guía:</label>
          <input 
            type="text" 
            id="guide-number" 
            name="trackingNumber" 
            value={formData.trackingNumber}
            onChange={handleChange}
            className={errors.trackingNumber ? 'invalid' : ''}
            required
          />
        </div>
        
        <div className="form__group">
          <label htmlFor="origin" className={errors.origin ? 'invalid' : ''}>Origen:</label>
          <input 
            type="text" 
            id="origin" 
            name="origin" 
            value={formData.origin}
            onChange={handleChange}
            className={errors.origin ? 'invalid' : ''}
            required
          />
        </div>
        
        <div className="form__group">
          <label htmlFor="destination" className={errors.destination ? 'invalid' : ''}>Destino:</label>
          <input 
            type="text" 
            id="destination" 
            name="destination" 
            value={formData.destination}
            onChange={handleChange}
            className={errors.destination ? 'invalid' : ''}
            required
          />
        </div>
        
        <div className="form__group">
          <label htmlFor="recipient" className={errors.recipient ? 'invalid' : ''}>Destinatario:</label>
          <input 
            type="text" 
            id="recipient" 
            name="recipient" 
            value={formData.recipient}
            onChange={handleChange}
            className={errors.recipient ? 'invalid' : ''}
            required
          />
        </div>       
        <button type="submit" className="form__submit" aria-label="Registrar guia" aria-controls="guide-form" role="button">Registrar Guía</button>
      </form>
    </section>
  );
};

export default GuideForm;