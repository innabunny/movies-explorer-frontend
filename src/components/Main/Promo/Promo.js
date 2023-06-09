import './Promo.css';
import promo from '../../../images/promo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__description">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__link" href='#about-project'>
          <button className="promo__btn">Узнать больше</button></a>
      </div>
      <img className="promo__img" alt="абстракный рисунок" src={promo}/>
    </section>
  )
}

export default Promo;