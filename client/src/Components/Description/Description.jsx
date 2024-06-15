import React from "react";
import "./Description.css"; // Assurez-vous que le fichier CSS est correctement importé
import PropTypes from "prop-types";
import imageRbk from "/assets/description.png"

const Description = () => {
  return (
    <div className="presentation container">
      <div className="banner">
        
         
            <h1>Explorez les fondations du  <span className="pink-text">codage</span>  et tracez votre chemin vers une carrière florissante dans la Tech</h1>
            <div style={{ marginBottom: "10px" }}></div>
            <p>Maîtrisez l'art du codage et intégrez une communauté inspirante de développeurs et d'entrepreneurs qui ont transformé leur parcours avec notre soutien.</p>
            </div>
          <div className="button-container">
            <button className="a">Contactez-nous</button>
          </div>
   
     
          <div className="banner">
          <img src={imageRbk } alt="RBKvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv" className="animated-image" />
        </div>
     
    </div>
  );
};

Description.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Description;
