import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <h3 className="about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
        <h3 className="about-project__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
        </p>
        <p className="about-project__text">
          У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__infographic">
        <p className="about-project__infographic-title">1 неделя</p>
        <p className="about-project__infographic-title about-project__infographic-title_grey">4 недели</p>
        <p className="about-project__infographic-text">Back-end</p>
        <p className="about-project__infographic-text">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;