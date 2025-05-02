import { useState } from 'react';
import { IAlert, IGuide, StatusType } from '../../types';
import './index.css';

interface GuideFormProps {
  guides: IGuide[];
  addGuide: (guide: IGuide) => void;
  setAlert: (alert: IAlert) => void;
}

const GuideForm = ({ guides, addGuide, setAlert }: GuideFormProps) => {
  const [formData, setFormData] = useState({
    number: '',
    origin: '',
    destination: '',
    recipient: '',
    creationDate: '',
    status: '' as StatusType | ''
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

    // Validar campos vacíos y valida dupplicidad
    ['number', 'origin', 'destination', 'recipient', 'creationDate', 'status'].forEach(field => {
      const fieldValue = formData[field as keyof typeof formData];
      if (!fieldValue) {
        newErrors[field] = true;
        isValid = false;
      } else if(field === 'number' && guides.some(guide => guide.id === fieldValue.trim())) {
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

    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newGuide: IGuide = {
      id: formData.number,
      number: formData.number,
      origin: formData.origin,
      destination: formData.destination,
      recipient: formData.recipient,
      creationDate: formData.creationDate,
      status: formData.status as StatusType,
      lastUpdate: currentDate,
      history: [
        { 
          status: formData.status as StatusType, 
          date: currentDate, 
          time: currentTime 
        }
      ]
    };

    addGuide(newGuide);
    setAlert({ show: true, message: `Guía ${newGuide.number} registrada exitosamente`, type: 'success' });
    setFormData({
      number: '',
      origin: '',
      destination: '',
      recipient: '',
      creationDate: '',
      status: ''
    });
  };

  return (
    <section className="form__section" id="registro">
      <h2><i className="fas fa-edit"></i> Registro de Nueva Guía</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="guide-number" className={errors.number ? 'invalid' : ''}>Número de Guía:</label>
          <input 
            type="text" 
            id="guide-number" 
            name="number" 
            value={formData.number}
            onChange={handleChange}
            className={errors.number ? 'invalid' : ''}
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
        
        <div className="form__group">
          <label htmlFor="creation-date" className={errors.creationDate ? 'invalid' : ''}>Fecha de Creación:</label>
          <input 
            type="date" 
            id="creation-date" 
            name="creationDate" 
            value={formData.creationDate}
            onChange={handleChange}
            className={errors.creationDate ? 'invalid' : ''}
            required
          />
        </div>
        
        <div className="form__group">
          <label htmlFor="status" className={errors.status ? 'invalid' : ''}>Estado Inicial:</label>
          <select 
            id="status" 
            name="status" 
            value={formData.status}
            onChange={handleChange}
            className={errors.status ? 'invalid' : ''}
            required
          >
            <option value="">Seleccione un estado</option>
            <option value="pending">Pendiente</option>
            <option value="transit">En tránsito</option>
            <option value="delivered">Entregado</option>
          </select>
        </div>
        
        <button type="submit" className="form__submit">Registrar Guía</button>
      </form>
    </section>
  );
};

export default GuideForm;