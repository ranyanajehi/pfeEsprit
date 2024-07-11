import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Graduations = () => {
  const [graduations, setGraduations] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchGraduations();
  }, []);

  const fetchGraduations = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/graduations'); // Adjust URL based on your API endpoint
      setGraduations(response.data.graduations);
    } catch (error) {
      toast.error('Failed to fetch graduations');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/graduations', formData); // Adjust URL based on your API endpoint
      toast.success('Graduation added successfully');
      fetchGraduations();
      setFormData({ title: '', description: '', image: '' });
    } catch (error) {
      toast.error('Failed to add graduation');
    }
  };

  const deleteGraduation = async (graduationId) => {
    try {
      await axios.delete(`http://localhost:4000/api/graduations/${graduationId}`); // Adjust URL based on your API endpoint
      toast.success('Graduation deleted successfully');
      fetchGraduations();
    } catch (error) {
      toast.error('Failed to delete graduation');
    }
  };

  return (
    <div className="graduations-page">
      <h2>Graduations</h2>

      {/* Form to add new graduation */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          placeholder="Image URL"
          onChange={handleInputChange}
        />
        <button type="submit">Add Graduation</button>
      </form>

      {/* List of graduations */}
      <div className="graduations-list">
        {graduations.map((graduation) => (
          <div key={graduation._id} className="graduation-item">
            <h3>{graduation.title}</h3>
            <p>{graduation.description}</p>
            {graduation.image && <img src={graduation.image} alt={graduation.title} />}
            <button onClick={() => deleteGraduation(graduation._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graduations;
