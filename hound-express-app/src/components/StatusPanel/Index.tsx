import { IGuide } from '../../types';
import './index.css';

interface StatusPanelProps {
  guides: IGuide[];
}

const StatusPanel = ({ guides }: StatusPanelProps) => {
  const activeCount = guides.length;
  const processCount = guides.filter(g => g.status === 'pending').length;
  const transitCount = guides.filter(g => g.status === 'transit').length;
  const deliveredCount = guides.filter(g => g.status === 'delivered').length;

  return (
    <section className="status__panel" id="estado" aria-label="Panel de estado del sistema">
      <h2><i className="fas fa-chart-pie"></i> Estado General del Sistema</h2>
      <div className="status__cards">
        <div className="status__card" data-testid="status-card">
          <h3>Guías Activas</h3>
          <p className="status__card-count">{activeCount}</p>
          <p className="status__card-description">Total en el sistema</p>
        </div>

        <div className="status__card" data-testid="status-card">
          <h3>Pendientes</h3>
          <p className="status__card-count">{processCount}</p>
          <p className="status__card-description">En proceso</p>
        </div>                

        <div className="status__card" data-testid="status-card">
          <h3>En Tránsito</h3>
          <p className="status__card-count">{transitCount}</p>
          <p className="status__card-description">En camino a destino</p>
        </div>
        
        <div className="status__card" data-testid="status-card">
          <h3>Entregadas</h3>
          <p className="status__card-count">{deliveredCount}</p>
          <p className="status__card-description">Este mes</p>
        </div>
      </div>
    </section>
  );
};

export default StatusPanel;