import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import "./JobOffers.css"

const OfferJobSection = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/v1/job/getJobs");
        setJobOffers(response.data.jobs); // Utilisation de response.data.jobs pour obtenir les offres d'emploi
      } catch (error) {
        console.error("Erreur lors de la récupération des offres d'emploi :", error);
      }
    };

    fetchJobOffers();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="dashboardd page">
      <div className="bannerr ">
        <Box sx={{ width: 'calc(100% - 250px)', marginLeft: '250px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Offres d'emploi" />
              <Tab label="Événements" />
              <Tab label="Graduations" />
            </Tabs>
          </Box>
        </Box>
      </div>

      <div className="contentt-jobOffer">
        <Container maxWidth="md" sx={{ marginTop: '40px' }}>
          {value === 0 && (
            jobOffers && jobOffers.length > 0 ? (
              jobOffers.map((job) => (
                <Box
                  key={job._id}
                  sx={{
                    bgcolor: '#cfe8fc',
                    marginBottom: '30px',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> {job.salary}</p>
                </Box>
              ))
            ) : (
              <p>Aucune offre d'emploi disponible pour le moment.</p>
            )
          )}

          {value === 1 && (
            <Box
              sx={{
                bgcolor: '#ffc0cb',
                marginBottom: '30px',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              Contenu pour les événements
            </Box>
          )}

          {value === 2 && (
            <Box
              sx={{
                bgcolor: '#90ee90',
                marginBottom: '30px',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              Contenu pour les graduations
            </Box>
          )}
        </Container>
      </div>
    </section>
  );
};

export default OfferJobSection;
