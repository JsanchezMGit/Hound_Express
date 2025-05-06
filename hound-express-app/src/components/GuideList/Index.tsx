import { useState } from 'react';
import { IGuide, statusClasses, statusLabels } from '../../types';
import './index.css';
import { formatDate, getNextGuideStatus } from '../../utils';

interface GuideListProps {
  guides: IGuide[];
  onSearch: (term: string) => void;
  onUpdate: (guide: IGuide) => void;
  onShowHistory: (guide: IGuide) => void;
}

const GuideList = ({ guides, onSearch, onUpdate, onShowHistory }: GuideListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleUpdateButton = (guide: IGuide) => {
    const guideUpdate = {...guide};
    const newStatus = getNextGuideStatus(guideUpdate.currentStatus) ?? guideUpdate.currentStatus;
    guideUpdate.currentStatus = newStatus;
    onUpdate(guideUpdate);
  }

  return (
    <section className="guide__list" id="lista" aria-labelledby="guides-title">
      <h2 id="guides-title"><i className="fas fa-clipboard-list"></i> Lista de Guías Registradas</h2>
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
                  <td data-label="Número">{guide.trackingNumber}</td>
                  <td data-label="Estado">
                    <span className={`status-badge ${statusClasses[guide.currentStatus]}`}>
                      {statusLabels[guide.currentStatus]}
                    </span>
                  </td>
                  <td data-label="Origen">{guide.origin}</td>
                  <td data-label="Destino">{guide.destination}</td>
                  <td data-label="Actualización">{formatDate(guide.updatedAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        disabled={guide.currentStatus === 'delivered'}
                        className="action-btn action-btn--update" 
                        onClick={() => handleUpdateButton(guide)}
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