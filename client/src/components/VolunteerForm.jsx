// VolunteerForm.jsx — Reusable form for volunteer registration.
// Skills are entered as a comma-separated string and split into an array on submit.
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Star, Clock } from 'lucide-react';

function VolunteerForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    availability: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert comma-separated skills string to a trimmed, non-empty array
    const skillsArray = formData.skills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '');

    onSubmit({ ...formData, skills: skillsArray });
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid">
        {/* Full Name */}
        <div className="form-group full">
          <label htmlFor="name">
            <User size={13} style={{ display: 'inline', marginRight: 4 }} />
            Full Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="e.g. Jane Smith"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">
            <Mail size={13} style={{ display: 'inline', marginRight: 4 }} />
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">
            <Phone size={13} style={{ display: 'inline', marginRight: 4 }} />
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="+1 555 000 0000"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="form-group full">
          <label htmlFor="location">
            <MapPin size={13} style={{ display: 'inline', marginRight: 4 }} />
            Location
          </label>
          <input
            id="location"
            name="location"
            placeholder="City, Country"
            required
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        {/* Skills */}
        <div className="form-group full">
          <label htmlFor="skills">
            <Star size={13} style={{ display: 'inline', marginRight: 4 }} />
            Skills
          </label>
          <input
            id="skills"
            name="skills"
            placeholder="e.g. Teaching, First Aid, React, Photography"
            required
            value={formData.skills}
            onChange={handleChange}
          />
          <span className="form-hint">Separate multiple skills with commas</span>
        </div>

        {/* Availability */}
        <div className="form-group full">
          <label htmlFor="availability">
            <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
            Availability
          </label>
          <input
            id="availability"
            name="availability"
            placeholder="e.g. Weekends, Evenings after 6 PM"
            required
            value={formData.availability}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary btn-full btn-lg"
        style={{ marginTop: '1.5rem' }}
        disabled={loading}
      >
        {loading ? 'Registering…' : 'Register as Volunteer'}
      </button>
    </form>
  );
}

export default VolunteerForm;
