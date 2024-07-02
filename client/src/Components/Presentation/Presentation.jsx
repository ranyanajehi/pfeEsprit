import React from "react";
import "./Presentation.css"; // Assurez-vous que le fichier CSS est correctement importé

const Presentation = () => {
  return (
    <div className="descriptionn">
      <div className="video-containerr">
        <iframe
          className="videoo"
          src="https://www.youtube.com/embed/TZrgDiqFbnE?si=aUbrbT_qCQJgl5Lm"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-containerr">
        <h1 className="colour" >Qui nous-sommes</h1>

        <p>
          ReBootKamp (RBK) est une école internationale offrant des formations
          en nouvelles technologies. Notre programme est conçu pour les
          étudiants passionnés par l'ingénierie logicielle et la programmation
          informatique. En seulement cinq mois, nous transformons des novices
          ambitieux en professionnels du codage. Nous proposons un programme
          immersif avancé qui forme des ingénieurs logiciels full-stack
          parfaitement préparés pour le marché du travail. Grâce à notre
          approche intensive, nos étudiants s'entraînent plus de 12 heures par
          jour, 6 jours par semaine, pendant 19 semaines. 
        </p>
      </div>
    </div>
  );
};

export default Presentation;
