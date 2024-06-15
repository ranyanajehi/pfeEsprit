import React from "react";
import "./Presentation.css"; // Assurez-vous que le fichier CSS est correctement importé

const Presentation = () => {
    return (
      <div className="container biography">
        <div className="banner">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/TZrgDiqFbnE?si=aUbrbT_qCQJgl5Lm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>

          </iframe>
        </div>
        <div className="banner">
          <p>RBK</p>
          <h3>Qui sommes-nous</h3>
        <p>
          ReBootKamp (RBK) est une école internationale offrant des formations
          en nouvelles technologies. Notre programme est conçu pour les
          étudiants passionnés par l'ingénierie logicielle et la programmation
          informatique. En seulement cinq mois, nous transformons des novices
          ambitieux en professionnels du codage.
        </p>
        <p>
          Nous proposons un programme immersif avancé qui forme des ingénieurs
          logiciels full-stack parfaitement préparés pour le marché du travail.
          Grâce à notre approche intensive, nos étudiants s'entraînent plus de
          12 heures par jour, 6 jours par semaine, pendant 19 semaines. Notre
          cursus met l'accent sur les fondamentaux de l'informatique et sur
          JavaScript, afin de doter nos diplômés des compétences clés
          recherchées par l'industrie.
        </p>
      </div>
    </div>
  );
};

export default Presentation;
