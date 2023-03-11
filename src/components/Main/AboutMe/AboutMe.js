import './AboutMe.css';
import portfolioImg from '../../../images/avatar.jpg'

import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__description">
          <h3 className="about-me__subtitle">Инна</h3>
          <p className="about-me__text">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">Я родом с северного городка под названием Мегион. Живу и работаю в Лесном. Закончила физико-технический
            факультет в НИ ТПУ. С 2017 года работаю инженером лаборатории на заводе. Заканчиваю курс по веб-разработке,
            работаю над своим проектом. В планах на ближайшее время кардинально сменить сферу деятельности
            и устроиться работать по своей новой профессии.</p>
         <Link className="about-me__link"
               to="https://github.com/innabunny" target="_blank">Github</Link>
        </div>
        <img className="about-me__img" src={portfolioImg} alt="фотография"/>
      </div>

    </section>
  )
}

export default AboutMe;