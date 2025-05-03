import bannerImage from '../../assets/images/banner.png';
import './index.css';

const Banner = () => {
  return (
    <section className="banner" id="inicio" data-testid="banner-section">
      <div className="banner__content">
        <h2 className="banner__title">Seguimiento de Paquetes en Tiempo Real</h2>
        <p className="banner__text">Tu paquete, nuestra prioridad - siempre sabrás dónde está</p>
        <img src={bannerImage} alt="Entrega de paquetes" className="banner__image" />
      </div>
    </section>
  );
};

export default Banner;