// Home.jsx — Landing page with hero banner, feature cards, and quick stats
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Heart, UserPlus, ArrowRight, PlusSquare } from 'lucide-react';

// Stagger animation helper
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

function Home() {
  // Platform feature highlights
  const features = [
    {
      icon: <Sparkles size={26} />,
      title: 'Smart Matching',
      desc: 'Our engine analyses volunteer skills against required skills to surface the best fit for every role.',
    },
    {
      icon: <Globe size={26} />,
      title: 'Global Opportunities',
      desc: 'Browse hundreds of NGO-posted drives — from environmental clean-ups to digital literacy programs.',
    },
    {
      icon: <Heart size={26} />,
      title: 'Make Real Impact',
      desc: 'Every registration connects a passionate person with a cause that genuinely needs their talent.',
    },
    {
      icon: <UserPlus size={26} />,
      title: 'Easy Onboarding',
      desc: 'Sign up in under two minutes. List your skills and availability — the AI will handle the rest.',
    },
  ];

  return (
    <main className="page">
      {/* ── Hero ─────────────────────────────────────────── */}
      <motion.div className="hero" {...fadeUp(0)}>
        <h1>Connecting Passion<br />with Purpose</h1>
        <p>
          Volunteer Connect uses skill-based smart matching to pair passionate
          individuals with the NGO opportunities where they'll have the biggest impact.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-white btn-lg">
            <UserPlus size={18} /> Volunteer Now
          </Link>
          <Link to="/opportunities" className="btn btn-white-outline btn-lg">
            Browse Opportunities <ArrowRight size={18} />
          </Link>
          <Link to="/post-opportunity" className="btn btn-white-outline btn-lg">
            <PlusSquare size={18} /> Post for NGO
          </Link>
        </div>
      </motion.div>

      {/* ── Quick stats ───────────────────────────────────── */}
      <motion.div className="stats-grid" {...fadeUp(0.15)}>
        {[
          { value: '1,200+', label: 'Volunteers Registered' },
          { value: '340+',   label: 'NGO Opportunities' },
          { value: '95%',    label: 'Match Satisfaction' },
          { value: '50+',    label: 'Partner NGOs' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Features ──────────────────────────────────────── */}
      <motion.div {...fadeUp(0.3)}>
        <h2 className="section-title">
          <span className="icon"><Sparkles size={22} /></span>
          Why Volunteer Connect?
        </h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── How it works ──────────────────────────────────── */}
      <motion.div {...fadeUp(0.45)}>
        <h2 className="section-title">
          <span className="icon"><Globe size={22} /></span>
          How It Works
        </h2>
        <div className="features-grid">
          {[
            { step: '01', title: 'Volunteer Registers', desc: 'Fill in skills, location & availability.' },
            { step: '02', title: 'NGO Posts Opportunity', desc: 'Describe the role, required skills & volunteer count.' },
            { step: '03', title: 'System Calculates Match', desc: 'The engine scores each volunteer against required skills.' },
            { step: '04', title: 'Best Fits Revealed',  desc: 'NGOs see a ranked list of top volunteers instantly.' },
          ].map((h, i) => (
            <div key={i} className="feature-card" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, right: 16, fontSize: '2rem', fontWeight: 900, color: 'var(--primary-light)' }}>
                {h.step}
              </div>
              <h3 style={{ marginBottom: '0.4rem', marginTop: '0.5rem' }}>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

export default Home;
