import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import './index.css';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.body.style.overflow = menuActive ? '' : 'hidden';
  };

  return (
    <header className="header">
      <div className="header__logo-container">
        <img src={logo} alt="Logo de Mi perro veloz" className="header__logo" />
      </div>
      <button 
        className={`header__hamburger ${menuActive ? 'header__nav--active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu de navegacion"
        data-testid="hamburger-button"
      >
        <span className="header__hamburger-line"></span>
        <span className="header__hamburger-line"></span>
        <span className="header__hamburger-line"></span>
      </button>        
      <nav role="navigation" aria-label="Navegación principal" className={`header__nav ${menuActive ? 'header__nav--active' : ''}`}>
        <ul className="header__nav-list">
          <li><a aria-label="Ir a inicio" className="header__nav-link" href="#inicio"><i className="fas fa-home"></i> Inicio</a></li>
          <li><a aria-label="Ir a registro de guia" className="header__nav-link" href="#registro"><i className="fas fa-plus-circle"></i> Registro de Guías</a></li>
          <li><a aria-label="Ir a estatus de guia" className="header__nav-link" href="#estado"><i className="fas fa-chart-bar"></i> Estado General</a></li>
          <li><a aria-label="Ir a listado de guias" className="header__nav-link" href="#lista"><i className="fas fa-list"></i> Lista de Guías</a></li>
          <li><a aria-label="Ir a busqueda de guias" className="header__nav-link" href="#buscar"><i className="fas fa-search"></i> Buscar Guías</a></li>
          <li><a aria-label="Ir a historial de guias" className="header__nav-link" href="#historial"><i className="fas fa-history"></i> Historial de Guías</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;