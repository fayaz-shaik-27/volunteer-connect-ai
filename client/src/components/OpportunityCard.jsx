// OpportunityCard.jsx — Card component for a single volunteer opportunity.
// Includes interactive Map preview.
import React, { useState } from 'react';
import { MapPin, Calendar, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
  const [showMap, setShowMap] = useState(false);

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

      <div style={{ paddingBottom: '1rem' }}>
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
        <button className="btn btn-full btn-primary">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default OpportunityCard;
