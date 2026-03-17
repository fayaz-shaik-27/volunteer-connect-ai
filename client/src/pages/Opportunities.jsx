// Opportunities.jsx — Listing page for browseable volunteer opportunities.
import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, AlertCircle } from 'lucide-react';
import { getOpportunities } from '../services/api';
import OpportunityCard from '../components/OpportunityCard';
import { motion } from 'framer-motion';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getOpportunities();
        setOpportunities(data);
      } catch (err) {
        setError('Failed to fetch opportunities. Is the backend server running?');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Filtering logic for search
  const filtered = opportunities.filter(op => 
    op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page">
      <div className="page-banner">
        <h1>Current Opportunities</h1>
        <p>Browse active drives and find which ones best match your profile.</p>
      </div>

      {/* Search and Filters */}
      <div className="search-bar">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by skill, NGO or title..." 
            style={{ paddingLeft: '2.5rem' }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-ghost">
          <Filter size={18} /> Filters
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      ) : filtered.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="cards-grid"
        >
          {filtered.map(op => (
            <OpportunityCard key={op._id} opportunity={op} />
          ))}
        </motion.div>
      ) : (
        <div className="empty-state">
          <Search size={48} />
          <h3>No opportunities found</h3>
          <p>Try adjusting your search or check back later for new NGO postings.</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary mt-2">
            Refresh Listings
          </button>
        </div>
      )}

    </div>
  );
};

export default Opportunities;
