import { useState } from 'react';
import { IGuide, statusFlow, statusLabels, IAlert } from './types';
import Header from './components/Header/Index';
import Banner from './components/Banner/Index';
import GuideForm from './components/GuideForm/Index';
import StatusPanel from './components/StatusPanel/Index';
import GuideList from './components/GuideList/Index';
import Footer from './components/Footer/Index';
import Modal from './components/Modal/Index';
import Alert from './components/Alert/index';
import GuideHistory from './components/GuideHistory/Index';
import initialGuidesJSON from './data/guides.json';

const initialGuides = initialGuidesJSON as IGuide[];

function App() {
  const [guides, setGuides] = useState<IGuide[]>(initialGuides);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentGuide, setCurrentGuide] = useState<IGuide | null>(null);
  const [alert, setAlert] = useState<IAlert>({ show: false, message: '', type: 'success' });

  // Filtrar guías basado en el término de búsqueda
  const filteredGuides = guides.filter(guide => 
    searchTerm === '' ||
    guide.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    statusLabels[guide.status].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar búsqueda
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Agregar nueva guía
  const addGuide = (newGuide: IGuide) => {
    setGuides([...guides, newGuide]);
  };

  // Actualizar estado de una guía
  const updateGuideStatus = (guideId: string) => {
    const updatedGuides = guides.map(guide => {
      if (guide.id === guideId) {
        const currentStatusIndex = statusFlow.indexOf(guide.status);
        
        if (currentStatusIndex < statusFlow.length - 1) {
          const newStatus = statusFlow[currentStatusIndex + 1];
          const currentDate = new Date().toISOString().split('T')[0];
          const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          return {
            ...guide,
            status: newStatus,
            lastUpdate: currentDate,
            history: [
              ...guide.history,
              { status: newStatus, date: currentDate, time: currentTime }
            ]
          };
        }
      }
      return guide;
    });
    
    setGuides(updatedGuides);
  };

  // Mostrar historial de una guía
  const showGuideHistory = (guideId: string) => {
    const guide = guides.find(g => g.id === guideId);
    if (guide) {
      setCurrentGuide(guide);
      setShowModal(true);
    }
  };

  return (
    <div className="App">
      <Header />
      <Banner />
      
      <main className="main-content">
        <GuideForm guides={guides} addGuide={addGuide} setAlert={(alert: IAlert | null) => alert !== null ? setAlert(alert) : null} />
        <StatusPanel guides={guides} />
        <GuideList 
          guides={filteredGuides} 
          onSearch={handleSearch} 
          onUpdateStatus={updateGuideStatus} 
          onShowHistory={showGuideHistory} 
        />
      </main>
      
      <Footer />
      
      <Modal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Historial de la guía ${currentGuide?.number || ''}`}
      >
        <GuideHistory guide={currentGuide} />
      </Modal>
      {alert.show && (
        <Alert 
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({...alert, show: false})}/>
      )}
    </div>
  );
}

export default App;