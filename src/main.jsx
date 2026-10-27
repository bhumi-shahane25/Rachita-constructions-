import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X, MapPin, Phone, Mail, Instagram, MoveUpRight, CheckCircle2 } from 'lucide-react';
import './styles.css';

const projects = [
  { name: 'Sky View Panchavati', type: 'Residential', status: 'Upcoming', location: 'Panchavati, Nashik', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', number: '01' },
  { name: 'Rachita Glory Apartment', type: 'Residential', status: 'Project details', location: 'Makhmalabad, Nashik', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85', number: '02' },
  { name: 'Green Village — Phase IV', type: 'Land & Farmhouse', status: 'Ongoing', location: 'Beze Village, Trimbakeshwar', image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85', number: '03' },
  { name: 'Sai Residency Apartment', type: 'Residential', status: 'Project details', location: 'Peth Road, Nashik', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', number: '04' },
  { name: 'Residential Final — N.A. Plots', type: 'Land & Farmhouse', status: 'Project details', location: 'Jalalpur, Nashik', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85', number: '05' },
  { name: 'AAA Business', type: 'Commercial', status: 'Project details', location: 'Pune, Maharashtra', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85', number: '06' }
];
const services = [
  ['01', 'Residential', 'Homes and apartments made for everyday living.'],
  ['02', 'Commercial', 'Considered spaces for business and enterprise.'],
  ['03', 'Land & plotted development', 'Room to grow, invest and make your own.'],
  ['04', 'Industrial & warehousing', 'Practical infrastructure for ambitious operations.']
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ name: '', phone: '', interest: 'Residential property', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const filtered = projects.filter(p => filter === 'All' || p.type === filter);
  const closeMenu = () => setMenuOpen(false);
  const jump = (id) => { closeMenu(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <div className="site">
    <div className="announcement"><span>ROOTED IN NASHIK. BUILT FOR WHAT'S NEXT.</span><a href="#contact">Start a conversation <ArrowUpRight size={13}/></a></div>
    <header className="header">
      <a className="wordmark" href="#top" aria-label="Rachita home"><span className="mark">R<span>.</span></span><span className="wordmark-copy">RACHITA<small>CONSTRUCTIONS</small></span></a>
      <nav className="desktop-nav"><a href="#projects">Projects</a><a href="#approach">Our approach</a><a href="#about">Our story</a><a href="#services">Expertise</a></nav>
      <a className="header-cta" href="#contact">Enquire <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    {menuOpen && <div className="mobile-menu"><a onClick={() => jump('projects')}>Projects <ArrowUpRight/></a><a onClick={() => jump('approach')}>Our approach <ArrowUpRight/></a><a onClick={() => jump('about')}>Our story <ArrowUpRight/></a><a onClick={() => jump('services')}>Expertise <ArrowUpRight/></a><a onClick={() => jump('contact')}>Enquire <ArrowUpRight/></a></div>}

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"></span> A LEGACY OF BUILDING WELL <span>EST. 1992</span></div>
          <h1>Spaces for<br/>what comes <em>next.</em></h1>
          <div className="hero-bottom"><p>Thoughtfully developed places to live, work, invest and find a little more room for life.</p><a href="#projects" className="round-link" aria-label="Explore projects"><ArrowDownRight/></a></div>
          <div className="hero-index"><span>01 — 04</span><span>NASHIK · MAHARASHTRA</span></div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90" alt="Modern home surrounded by thoughtful landscaping" />
          <div className="image-caption"><span>01 / A PLACE TO CALL YOURS</span><span>Designed around life.</span></div>
          <div className="vertical-note">A DIFFERENT KIND OF GROWTH — RACHITA</div>
          <div className="hero-stamp"><span>BUILT ON</span><strong>TRUST.</strong><span>GROWING WITH YOU.</span></div>
        </div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-label"><span>01 / THE RACHITA STORY</span><span>OUR FOUNDATION</span></div>
        <div className="intro-grid">
          <h2>Good spaces<br/>make room for<br/><em>good lives.</em></h2>
          <div className="intro-text"><p className="lead">Since 1992, we've believed that building is about more than bricks and blueprints. It's about the trust people place in a place — and the possibilities it gives them.</p><p>From homes and commercial spaces to land and countryside retreats, Rachita brings a considered approach to property development across Nashik and beyond.</p><a className="text-link" href="#approach">Get to know us <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="stats-row"><div><strong>1992</strong><span>Where our story began</span></div><div><strong>03<span className="stat-plus">+</span></strong><span>Ways to find your space</span></div><div><strong>01</strong><span>A relationship-first approach</span></div><div className="stats-note">A lasting foundation<br/>for every next chapter.</div></div>
      </section>

      <section className="projects section-pad" id="projects">
        <div className="section-label"><span>02 / SELECTED DEVELOPMENTS</span><span>MADE FOR MANY WAYS OF LIVING</span></div>
        <div className="section-heading"><h2>Find your kind<br/>of <em>space.</em></h2><p>Different needs. Different possibilities.<br/>One thoughtful approach to every development.</p></div>
        <div className="filters" role="group" aria-label="Filter projects">{['All', 'Residential', 'Commercial', 'Land & Farmhouse'].map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'filter active' : 'filter'}>{f}<span>{f === 'All' ? '06' : String(projects.filter(p => p.type === f).length).padStart(2,'0')}</span></button>)}</div>
        <div className="project-grid">{filtered.map((p, i) => <article className={`project-card ${i === 0 ? 'project-feature' : ''}`} key={p.name}>
          <a href="#contact" className="project-image"><img src={p.image} alt={`${p.name} architectural visual`} loading="lazy"/><span className="project-num">{p.number} / 06</span><span className="project-arrow"><ArrowUpRight/></span><span className="project-status">{p.status}</span></a>
          <div className="project-meta"><span>{p.type}</span><span><MapPin size={12}/>{p.location}</span></div><h3>{p.name}</h3><a className="project-detail" href="#contact">Discover this project <ArrowUpRight size={14}/></a>
        </article>)}</div>
        <p className="disclaimer">Project imagery is illustrative. Please enquire for verified photographs, specifications, availability and current project status.</p>
      </section>

      <section className="manifesto" id="approach">
        <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Quiet, light-filled contemporary architecture" loading="lazy"/><span className="manifesto-image-label">A PLACE, CONSIDERED.</span></div>
        <div className="manifesto-copy"><div className="section-label"><span>03 / WHAT WE BELIEVE</span></div><h2>Built with care.<br/>Grounded in <em>trust.</em></h2><p>We believe the best developments begin by listening — to the land, to the people who will use it, and to the future they imagine.</p><div className="principles"><div><span>01</span><div><h3>Quality in the details</h3><p>Thoughtful planning and a respect for the craft of building.</p></div></div><div><span>02</span><div><h3>People before property</h3><p>Clear communication and relationships that extend beyond handover.</p></div></div><div><span>03</span><div><h3>Possibility with purpose</h3><p>Spaces shaped around real needs, not just square footage.</p></div></div></div><a href="#contact" className="text-link">Talk to our team <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-label"><span>04 / OUR EXPERTISE</span><span>FROM EVERYDAY TO EXTRAORDINARY</span></div>
        <div className="services-top"><h2>One foundation.<br/><em>Many possibilities.</em></h2><p>Whether you're looking for a home, a business address or land to make your own, explore what we can help you build towards.</p></div>
        <div className="service-list">{services.map(s => <a href="#contact" className="service-row" key={s[0]}><span className="service-no">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><span className="service-arrow"><ArrowUpRight/></span></a>)}</div>
      </section>

      <section className="quote-section"><div className="quote-mark">“</div><blockquote>While buildings can be created, <em>trust is built</em> — one relationship at a time.</blockquote><div className="quote-credit"><span>THE RACHITA PHILOSOPHY</span><span>EST. 1992 · NASHIK</span></div></section>

      <section className="contact section-pad" id="contact">
        <div className="section-label"><span>05 / YOUR NEXT CHAPTER</span><span>LET'S TALK</span></div>
        <div className="contact-grid"><div className="contact-copy"><h2>Let's find<br/>your <em>place.</em></h2><p>Tell us a little about what you're looking for. Our team will help you take the next step.</p><div className="contact-links"><a href="tel:+912533500021"><Phone size={16}/> +91 253 350 0021</a><a href="mailto:info@rachita.in"><Mail size={16}/> info@rachita.in</a><span><MapPin size={16}/> Thatte Nagar, Gangapur Road, Nashik</span></div></div>
          <form className="enquiry-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            {submitted ? <div className="success-state"><CheckCircle2 size={34}/><h3>Thank you for reaching out.</h3><p>Your enquiry has been prepared in this demo. Connect this form to Rachita's email or CRM before launch.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight size={15}/></button></div> : <>
              <div className="form-top"><span>PROPERTY ENQUIRY</span><span>01 — 04</span></div>
              <label>Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="How should we address you?"/></label>
              <label>Phone number<input required type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 00000 00000"/></label>
              <label>I'm interested in<select value={form.interest} onChange={e=>setForm({...form,interest:e.target.value})}><option>Residential property</option><option>Commercial property</option><option>Land & farmhouse</option><option>Industrial / warehouse</option><option>General enquiry</option></select></label>
              <label>Anything else? <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us what you have in mind (optional)" rows="2"/></label>
              <button type="submit" className="submit-btn">Send enquiry <ArrowUpRight size={16}/></button><p className="form-privacy">By submitting, you agree to be contacted about your enquiry.</p>
            </>}</form></div>
      </section>
    </main>

    <footer className="footer"><div className="footer-top"><a className="wordmark footer-wordmark" href="#top"><span className="mark">R<span>.</span></span><span className="wordmark-copy">RACHITA<small>CONSTRUCTIONS</small></span></a><p>Spaces for what comes next.<br/>Rooted in Nashik since 1992.</p><a className="back-top" href="#top">BACK TO TOP <MoveUpRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Rachita Constructions. All rights reserved.</span><span>MADE WITH PURPOSE, BUILT ON TRUST.</span><a href="https://rachitaconstructions.com/" target="_blank" rel="noreferrer">Current website <ArrowUpRight size={12}/></a></div></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
