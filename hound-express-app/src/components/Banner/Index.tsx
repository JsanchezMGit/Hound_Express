import bannerImage from '../../assets/images/banner.png';
import './index.css';

const Banner = () => {
  return (
    <section className="banner" id="inicio" data-testid="banner-section" aria-labelledby="banner-title" role="banner">
      <div className="banner__content">
        <h2 id="banner-title" className="banner__title">Seguimiento de Paquetes en Tiempo Real</h2>
        <p className="banner__text">Tu paquete, nuestra prioridad - siempre sabrás dónde está</p>
        <img src={bannerImage} alt="Capcidad logistica de Mi perro veloz, con diversos vehiculos como barcos, aviones, tailers y contenedores" className="banner__image" />
      </div>
    </section>
  );
};

export default Banner;