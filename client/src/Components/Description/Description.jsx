import React from "react";
import "./Description.css"; // Assurez-vous que le fichier CSS est correctement importé
import PropTypes from "prop-types";
import imageRbk from "/assets/description.png"

const Description = () => {
  return (
    <div className="descrption" style={{ display: "flex",background:"fafafa", alignItems: "center", justifyContent: "space-between", minHeight: "100vh",flexWrap:"wrap" }}>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"50%"}}>
        <div style={{padding:"20px"}}>
          <h1 style={{fontSize:'35px',marginBottom:"20px"}}>Explorez les fondations du  <span className="pink-text">codage</span>  et tracez votre chemin vers <span style={{color:" #ff007b"}}> une carrière</span> florissante dans la Tech</h1>
          <p style={{fontSize:'35px'}}>Apprenez à coder, rejoignez une communauté de développeurs et d'entrepreneurs qui ont changé leur vie avec nous.</p>
        </div>
      </div>
      <img src={imageRbk} alt="RBK" className="image-home" />

    </div>
  );
};

Description.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Description;
