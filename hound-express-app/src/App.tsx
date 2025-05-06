import { useGuides } from './hooks/useGuides';
import Header from './components/Header/Index';
import Banner from './components/Banner/Index';
import GuideForm from './components/GuideForm/Index';
import StatusPanel from './components/StatusPanel/Index';
import GuideList from './components/GuideList/Index';
import Footer from './components/Footer/Index';
import Alert from './components/Alert/index';
import Modal from './components/Modal/Index';
import { IAlert } from './types';
import GuideHistory from './components/GuideHistory/Index';
import { useEffect, useRef } from 'react';

function App() {
  const {
    state,
    filteredGuides,
    addGuide,
    updateGuideStatus,
    setSearchTerm,
    showGuideHistory,
    hideModal,
    showAlert,
    hideAlert,
    fetchGuides
  } = useGuides();

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      fetchGuides()
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Banner />
      
      <main className="main-content">
        <GuideForm guides={state.guides} addGuide={addGuide} setAlert={(alert: IAlert | null) => alert !== null ? showAlert(alert.message, alert.type) : null} />
        <StatusPanel guides={state.guides} />
        <GuideList 
          guides={filteredGuides} 
          onSearch={setSearchTerm} 
          onUpdate={updateGuideStatus} 
          onShowHistory={showGuideHistory} 
        />
      </main>
      
      <Footer />
      
      {/* Componente de Alerta */}
      {state.alert.show && (
        <Alert 
          message={state.alert.message}
          type={state.alert.type}
          onClose={hideAlert}
        />
      )}
      
      {/* Componente Modal */}
      <Modal 
        isOpen={state.modal.show}
        onClose={hideModal}
        title={state.modal.title}
      >
        <GuideHistory guide={state.currentGuide} />
      </Modal>
    </div>
  );
}

export default App;