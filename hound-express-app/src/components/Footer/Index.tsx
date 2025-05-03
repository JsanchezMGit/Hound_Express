import './index.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Pie de página">
      <div className="footer-content" data-testid="footer-content">
        <div className="footer-section about" aria-labelledby="about-title">
          <h3 id="about-title">Mi perro veloz</h3>
          <p>Soluciones logísticas confiables y eficientes para tus necesidades de envío.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        
        <div className="footer-section links" aria-labelledby="quik-links">
          <h3 id="quik-links">Enlaces Rápidos</h3>
          <ul>
            <li><a aria-label="Ir a inicio" href="#inicio">Inicio</a></li>
            <li><a aria-label="Ir a registro de guia" href="#registro">Registro de Guías</a></li>
            <li><a aria-label="Ir a estatus de guia" href="#estado">Estado General</a></li>
            <li><a aria-label="Ir a listado de guias" href="#lista">Lista de Guías</a></li>
          </ul>
        </div>
        
        <div className="footer-section contact" data-testid="contact-section" aria-labelledby="contact-title">
          <h3 id="contact-title">Contacto</h3>
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