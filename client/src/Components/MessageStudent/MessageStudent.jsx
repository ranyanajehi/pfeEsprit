import React from 'react'

const MessageStudent = () => {
  return (
    <section className="dashboard page">
    <div className="banner">
      <div className="firstBox">
        <img src="/avatar.png" alt="avatar" />
        <div className="content">
          <div>
            <p>Bonjour ,</p>
            <h5></h5>
          </div>
        </div>
      </div>
      <div className="secondBox">
        <p>Les Rendez-Vous</p>
        <h3>1500</h3>
      </div>
      <div className="thirdBox">
        <p>Les Inscrit</p>
        <h3></h3>
      </div>
    </div>
    <div className="banner">
      <h5>Rendez-Vous</h5>
      <table>
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Date</th>
            <th>Niveau anglais</th>
            <th>Visite</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </table>
    </div>
  </section>
);
};
  


export default MessageStudent

