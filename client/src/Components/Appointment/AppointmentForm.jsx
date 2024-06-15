import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./AppointmentForm.css";
import { Link } from "react-router-dom";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [level, setLevel] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:4000/api/v1/appointment/getDisabledDates");
        setDisabledDates(data.disabledDates);
      } catch (error) {
        toast.error("Failed to load disabled dates");
      }
    };
    fetchDisabledDates();
  }, []);

  const isDisabledDate = (date) => {
    return disabledDates.includes(date.toISOString().split('T')[0]);
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/v1/appointment/postAppointmment",
        {
          firstName,
          lastName,
          email,
          phone,
          genre,
          level,
          address,
          appointment_date: appointmentDate,
          hasVisited: hasVisitedBool
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );
      toast.success(data.message);
      // Réinitialiser les champs après la soumission réussie
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setGenre("");
      setLevel("");
      setAddress("");
      setAppointmentDate("");
      setHasVisited(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="presentation container">
      <div className="container form-component appointment-form">
        <div className="appointment-form-wrapper">
          <h1>Réservez Votre Place</h1>
          <h3>Commencez votre carrière</h3>
          <form onSubmit={handleAppointment} className="appointment-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Numéro de téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="date"
                placeholder="Rendez-vous"
                value={appointmentDate}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  if (isDisabledDate(date)) {
                    toast.error("Cette date est déjà réservée.");
                    setAppointmentDate("");
                  } else {
                    setAppointmentDate(e.target.value);
                  }
                }}
              />
            </div>
            <div className="form-group">
              <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">Sélectionner votre genre</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="form-group">
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="">Sélectionner le niveau d'anglais</option>
                <option value="A1">A1 - Débutant</option>
                <option value="A2">A2 - Élémentaire</option>
                <option value="B1">B1 - Intermédiaire</option>
                <option value="B2">B2 - Intermédiaire avancé</option>
                <option value="C1">C1 - Avancé</option>
                <option value="C2">C2 - Maîtrise</option>
              </select>
              <textarea
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Votre Adresse"
              />
            </div>
            <div
              style={{
                gap: "10px",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <p style={{ marginBottom: 0 }}>Avez vous visité avant?</p>
              <input
                type="checkbox"
                checked={hasVisited}
                onChange={(e) => setHasVisited(e.target.checked)}
                style={{ flex: "none", width: "25px" }}
              />
            </div>
            <p style={{ marginBottom: 0 }}>
              Non Inscrit? <Link to={"/register"} style={{ textDecoration: "none", alignItems: "center" }}>Inscrire maintenant</Link>
            </p>
            <button style={{ margin: "0 auto" }}>Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
