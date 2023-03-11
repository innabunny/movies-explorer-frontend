import './Portfolio.css';
import icon from '../../../images/icon.svg'
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__nav">
        <li className="portfolio__item">
          <Link to="https://github.com/innabunny/how-to-learn" target="_blank" className="portfolio__link">
            <p className="portfolio__text">Статичный сайт</p>
            <img className="portfolio__icon" src={icon} alt="иконка"/>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="https://github.com/innabunny/russian-travel" target="_blank" className="portfolio__link">
            <p className="portfolio__text">Адаптивный сайт</p>
            <img className="portfolio__icon" src={icon} alt="иконка"/>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="https://github.com/innabunny/react-mesto-api-full" target="_blank" className="portfolio__link">
            <p className="portfolio__text">Одностраничное приложение</p>
            <img className="portfolio__icon" src={icon} alt="иконка"/>
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;