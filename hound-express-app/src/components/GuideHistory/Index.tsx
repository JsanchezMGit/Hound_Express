import { IGuide, statusClasses, statusLabels } from '../../types';
import { formatDate } from '../../utils';
import './index.css';

interface GuideHistoryProps {
    guide: IGuide | null;
}

const GuideHistory = ({ guide }: GuideHistoryProps) => {
    return(
        guide && (
            <>
              <p><strong>Origen:</strong> {guide.origin}</p>
              <p><strong>Destino:</strong> {guide.destination}</p>
              <p><strong>Destinatario:</strong> {guide.recipient}</p>
              
              <h3>Registro de cambios:</h3>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.history.map((entry, index) => (
                    <tr key={index}>
                      <td data-label="Estado">
                        <span className={`status-badge--modal ${statusClasses[entry.status]}`}>
                          {statusLabels[entry.status]}
                        </span>
                      </td>
                      <td data-label="Fecha">{formatDate(`${entry.date}T${entry.time}`)}</td>
                      <td data-label="Hora">{entry.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )        
    )
};

export default GuideHistory;