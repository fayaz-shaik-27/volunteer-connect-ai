// PostOpportunity.jsx — Page for NGOs to post new volunteer openings.
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusSquare, CheckCircle, AlertCircle, Calendar, MapPin, Users, Star } from 'lucide-react';
import { createOpportunity } from '../services/api';

const PostOpportunity = () => {
  const [formData, setFormData] = useState({
    title: '',
    organizationName: '',
    description: '',
    location: '',
    date: '',
    requiredSkills: '',
    volunteersNeeded: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Process comma-separated skills
      const skillsArray = formData.requiredSkills
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '');

      await createOpportunity({ 
        ...formData, 
        requiredSkills: skillsArray, 
        volunteersNeeded: Number(formData.volunteersNeeded) 
      });

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFormData({
        title: '', organizationName: '', description: '', location: '', date: '', requiredSkills: '', volunteersNeeded: ''
      });
    } catch (err) {
      setError('Failed to post opportunity. Please check your inputs.');
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
          <h2 className="heading" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Opportunity Posted!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your social work opportunity is now live. Volunteers will be ranked by AI based on how well their skills match your requirements.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setSuccess(false)} className="btn btn-primary">
              Post Another
            </button>
            <button onClick={() => window.location.href = '/opportunities'} className="btn btn-outline">
              View Listings
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-sm">
      <div className="page-banner" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, #1d4ed8 100%)' }}>
        <h1>NGO Portal</h1>
        <p>Post an opportunity and let our AI suggest the most qualified volunteers for your mission.</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="form-card">
          <h2 className="form-title">
            <PlusSquare size={20} /> Post New Opportunity
          </h2>
          <p className="form-subtitle">Fill in the details for your social work project.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group full">
                <label>Opportunity Title</label>
                <input name="title" placeholder="e.g. Environmental Awareness Drive" required value={formData.title} onChange={handleChange} />
              </div>

              <div className="form-group full">
                <label>Organization Name</label>
                <input name="organizationName" placeholder="e.g. Green World NGO" required value={formData.organizationName} onChange={handleChange} />
              </div>

              <div className="form-group full">
                <label>Description</label>
                <textarea name="description" rows="4" placeholder="Briefly describe the mission and the work involved..." required value={formData.description} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} /> Location</label>
                <input name="location" placeholder="City or Remote" required value={formData.location} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label><Calendar size={12} style={{ display: 'inline', marginRight: 4 }} /> Date</label>
                <input name="date" type="date" required value={formData.date} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label><Users size={12} style={{ display: 'inline', marginRight: 4 }} /> Volunteers Needed</label>
                <input name="volunteersNeeded" type="number" placeholder="e.g. 5" required value={formData.volunteersNeeded} onChange={handleChange} />
              </div>

              <div className="form-group full">
                <label><Star size={12} style={{ display: 'inline', marginRight: 4 }} /> Required Skills (comma separated)</label>
                <input name="requiredSkills" placeholder="Writing, Social Media, Event Planning..." required value={formData.requiredSkills} onChange={handleChange} />
                <span className="form-hint">AI will use these skills to find candidates.</span>
              </div>
            </div>

            <button type="submit" className="btn btn-secondary btn-full btn-lg" style={{ marginTop: '2rem' }} disabled={loading}>
              {loading ? 'Posting...' : 'Create Opportunity'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PostOpportunity;
