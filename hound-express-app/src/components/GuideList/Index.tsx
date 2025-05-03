import { useState } from 'react';
import { IGuide, statusClasses, statusLabels } from '../../types';
import './index.css';

interface GuideListProps {
  guides: IGuide[];
  onSearch: (term: string) => void;
  onUpdateStatus: (id: string) => void;
  onShowHistory: (guide: IGuide) => void;
}

const GuideList = ({ guides, onSearch, onUpdateStatus, onShowHistory }: GuideListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <section className="guide__list" id="lista">
      <h2><i className="fas fa-clipboard-list"></i> Lista de Guías Registradas</h2>
      <div className="search__container">
        <input 
          type="text" 
          placeholder="Buscar guía..." 
          className="search__input" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button aria-label="Buscar guia" className="search__btn"><i className="fas fa-search"></i></button>
      </div>

      <div className="table__container">
        <table>
          <thead>
            <tr>
              <th>Número de Guía</th>
              <th>Estado</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Última Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {guides.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>No se encontraron guías</td>
              </tr>
            ) : (
              guides.map(guide => (
                <tr key={guide.id}>
                  <td data-label="Número">{guide.number}</td>
                  <td data-label="Estado">
                    <span className={`status-badge ${statusClasses[guide.status]}`}>
                      {statusLabels[guide.status]}
                    </span>
                  </td>
                  <td data-label="Origen">{guide.origin}</td>
                  <td data-label="Destino">{guide.destination}</td>
                  <td data-label="Actualización">{formatDate(guide.lastUpdate)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        disabled={guide.status === 'delivered'}
                        className="action-btn action-btn--update" 
                        onClick={() => onUpdateStatus(guide.id)}
                        aria-label="Actualizar estatus"
                      >
                        <i className="fas fa-sync-alt"></i>
                      </button>
                      <button 
                        className="action-btn action-btn--history" 
                        onClick={() => onShowHistory(guide)}
                        aria-label="Ver historial"
                      >
                        <i className="fas fa-history"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GuideList;