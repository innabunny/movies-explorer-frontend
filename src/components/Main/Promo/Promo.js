import './Promo.css';
import promo from '../../../images/promo.svg';
import NavTab from "../NavTab/NavTab";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__img" alt="абстракный рисунок" src={promo}/>
      <NavTab />
    </section>
  )
}

export default Promo;