import './index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content" data-testid="footer-content">
        <div className="footer-section about">
          <h3>Mi perro veloz</h3>
          <p>Soluciones logísticas confiables y eficientes para tus necesidades de envío.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        
        <div className="footer-section links">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#registro">Registro de Guías</a></li>
            <li><a href="#estado">Estado General</a></li>
            <li><a href="#lista">Lista de Guías</a></li>
          </ul>
        </div>
        
        <div className="footer-section contact" data-testid="contact-section">
          <h3>Contacto</h3>
          <p><i className="fas fa-map-marker-alt"></i> Calle Principal al final 123, CDMX</p>
          <p><i className="fas fa-phone"></i> +52 0000000000</p>
          <p><i className="fas fa-envelope"></i> contacto@miperroveloz.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Jesus Sanchez. Licensed for Non-Commercial Use Only. All rights reserved. | <a href="#">Política de Privacidad</a> | <a href="#">Términos y Condiciones</a></p>
      </div>
    </footer>
  );
};

export default Footer;