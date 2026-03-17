// OpportunityCard.jsx — Card component for a single volunteer opportunity.
// Includes an "AI Match" panel and an interactive Map preview.
import React, { useState } from 'react';
import { MapPin, Calendar, Users, Sparkles, ChevronDown, ChevronUp, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getOpportunityMatches } from '../services/api';

// Simple mock geocoder for Demo Mode
const getCoordinates = (location) => {
  const loc = location.toLowerCase();
  if (loc.includes('new york')) return [40.7128, -74.0060];
  if (loc.includes('london')) return [51.5074, -0.1278];
  if (loc.includes('san francisco')) return [37.7749, -122.4194];
  if (loc.includes('mumbai')) return [19.0760, 72.8777];
  if (loc.includes('remote')) return [0, 0];
  return [20, 0]; // Default center of the world
};

function OpportunityCard({ opportunity }) {
  const [matches, setMatches] = useState([]);
  const [showMatches, setShowMatches] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleMatches = async () => {
    if (showMatches) { setShowMatches(false); return; }
    setLoading(true);
    setError('');
    try {
      const { data } = await getOpportunityMatches(opportunity._id);
      setMatches(data.matches);
      setShowMatches(true);
    } catch (err) {
      setError('Could not load matches. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const scoreColour = (score) => {
    if (score >= 75) return '#16a34a';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const coords = getCoordinates(opportunity.location);
  const isRemote = opportunity.location.toLowerCase().includes('remote');

  return (
    <div className="opp-card">
      <div className="opp-card-header">
        <div>
          <div className="opp-card-title">{opportunity.title}</div>
          <div className="opp-org">{opportunity.organizationName}</div>
        </div>
        <span className="opp-badge">
          <Users size={11} style={{ display: 'inline', marginRight: 3 }} />
          {opportunity.volunteersNeeded} needed
        </span>
      </div>

      <p className="opp-desc">{opportunity.description}</p>

      <div className="opp-meta">
        <span className="opp-meta-item cursor-pointer" onClick={() => !isRemote && setShowMap(!showMap)}>
          <MapPin size={14} /> {opportunity.location}
          {!isRemote && (showMap ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
        </span>
        <span className="opp-meta-item">
          <Calendar size={14} /> {opportunity.date}
        </span>
      </div>

      {/* Interactive Map Preview */}
      <AnimatePresence>
        {showMap && !isRemote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="map-container"
          >
            <MapContainer center={coords} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '8px' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={coords}>
                <Popup>{opportunity.title}<br/>{opportunity.location}</Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          Required Skills
        </p>
        <div className="skills-list">
          {opportunity.requiredSkills.map((skill, i) => (
            <span key={i} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="opp-card-footer">
        {error && <p className="form-error" style={{ marginBottom: '0.5rem' }}>{error}</p>}
        <button
          className={`btn btn-full ${showMatches ? 'btn-outline' : 'btn-primary'}`}
          onClick={toggleMatches}
          disabled={loading}
        >
          <Sparkles size={15} />
          {loading ? 'Analysing…' : showMatches ? 'Hide AI Matches' : 'Find AI Matches'}
          {showMatches ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      <AnimatePresence>
        {showMatches && (
          <motion.div
            key="match-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="match-panel">
              <div className="match-panel-title">
                <Sparkles size={16} /> AI Recommended Volunteers
              </div>

              {matches.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem' }}>
                  No matches found. Try a different skill set!
                </p>
              ) : (
                <div className="match-list">
                  {matches.slice(0, 5).map((match, idx) => (
                    <div key={idx} className="match-item">
                      <div className="match-avatar">
                        {match.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="match-info">
                        <div className="match-name">{match.name}</div>
                        <div className="match-meta">
                          {match.location} &bull; {match.explanation}
                        </div>
                      </div>
                      <div className="match-score-wrap">
                        <span className="match-score" style={{ color: scoreColour(match.score) }}>
                          {match.score}%
                        </span>
                        <div className="match-bar-bg">
                          <div
                            className="match-bar-fill"
                            style={{ width: `${match.score}%`, background: scoreColour(match.score) }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OpportunityCard;
