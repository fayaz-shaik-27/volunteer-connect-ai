// RegisterVolunteer.jsx — Page for volunteer registration
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CheckCircle } from 'lucide-react';
import VolunteerForm from '../components/VolunteerForm';
import { registerVolunteer } from '../services/api';

const RegisterVolunteer = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await registerVolunteer(data);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="form-card text-center"
        >
          <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
            <CheckCircle size={64} style={{ margin: '0 auto' }} />
          </div>
          <h2 className="heading" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Success!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Thank you for joining. Our AI matching engine will now automatically suggest 
            your profile to NGOs based on your unique skills.
          </p>
          <button onClick={() => setSuccess(false)} className="btn btn-primary btn-lg">
            Register Another Profile
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-sm">
      <div className="page-banner">
        <h1>Join the Community</h1>
        <p>Register as a volunteer and let AI find the perfect social work for your skills.</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-card">
          <h2 className="form-title">
            <UserPlus size={20} /> Volunteer Registration
          </h2>
          <p className="form-subtitle">Tell us about your skills and availability.</p>
          <VolunteerForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterVolunteer;
