import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  MoveUpRight,
  CheckCircle2,
  Clock,
  Building,
  ShieldCheck,
  Compass,
  Layers,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import { projectsData, companyDetails } from './data';
import './styles.css';

const services = [
  {
    num: '01',
    title: 'Residential Developments',
    desc: 'Thoughtfully planned apartments, flats and row-houses built for everyday family life and enduring quality.',
    details: 'From contemporary 1 & 2 BHK homes in Nashik city corridors to independent row-houses at Somnath Shinde Nagar, our developments prioritize natural ventilation, structural integrity, and peaceful community surroundings.',
    image: '/assets/services/residential-development.webp'
  },
  {
    num: '02',
    title: 'Commercial & Corporate Spaces',
    desc: 'Considered, high-visibility spaces tailored for ambitious enterprises, retail hubs, and professional offices.',
    details: 'Prime commercial assets in Nashik and Pune designed with efficient floor plates, high footfall visibility, reliable utilities, and accessible transit links.',
    image: '/assets/services/commercial-shops.png'
  },
  {
    num: '03',
    title: 'Land & Plotted Development',
    desc: 'Sanctioned Non-Agricultural (NA) residential and commercial plots giving you room to design, build, and grow.',
    details: 'Legally transparent land layouts like Jalalpur NA Plots with clear titles, demarcated boundaries, internal access roads, and infrastructure provisions in emerging growth zones.',
    image: '/assets/projects/jalalpur/jalalpur-plots-banner.png'
  },
  {
    num: '04',
    title: 'Farmhouse Retreats & Countryside Living',
    desc: 'Tranquil countryside properties designed around pristine nature, open skies, and rejuvenating escapes.',
    details: 'Scenic plots at Green Village overlooking the Gautami Dam backwaters in Beze Village, Trimbakeshwar, ideal for weekend homes and long-term land ownership.',
    image: '/assets/projects/green-village/green-village-banner.png'
  },
  {
    num: '05',
    title: 'Industrial & Warehousing Infrastructure',
    desc: 'Practical, well-connected industrial spaces engineered for logistics, manufacturing, and operational scale.',
    details: 'Sturdy infrastructural planning, logistics-ready access corridors, and heavy-utility readiness suited to expanding industrial operations.',
    image: '/assets/services/industrial-infrastructure.png'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: 'Residential property', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Sync hash routing so browser back/forward and direct links work cleanly
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('project/')) {
        const id = hash.replace('project/', '');
        setSelectedProjectId(id);
        setActiveMediaIndex(0);
        setCurrentPage('project-detail');
      } else if (['home', 'about', 'services', 'projects', 'contact'].includes(hash)) {
        setCurrentPage(hash);
        setSelectedProjectId(null);
      } else {
        setCurrentPage('home');
        setSelectedProjectId(null);
      }
      window.scrollTo(0, 0);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page, projectId = null) => {
    setMenuOpen(false);
    if (page === 'project-detail' && projectId) {
      window.location.hash = `project/${projectId}`;
    } else {
      window.location.hash = page === 'home' ? '' : page;
      if (page === 'home') {
        setCurrentPage('home');
        setSelectedProjectId(null);
        window.scrollTo(0, 0);
      }
    }
  };

  const filteredProjects = projectsData.filter(p => filter === 'All' || p.type === filter);
  const selectedProject = projectsData.find(p => p.id === selectedProjectId) || projectsData[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site">
      {/* Announcement Bar */}
      <div className="announcement">
        <span>ROOTED IN NASHIK SINCE 1992. BUILT FOR WHAT'S NEXT.</span>
        <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>
          Start a conversation <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Header */}
      <header className="header">
        <a
          className="wordmark"
          href="#"
          onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
          aria-label="Rachita Constructions Home"
        >
          <span className="mark">R<span>.</span></span>
          <span className="wordmark-copy">RACHITA<small>CONSTRUCTIONS</small></span>
        </a>

        <nav className="desktop-nav">
          <button
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Home
          </button>
          <button
            className={`nav-btn ${currentPage === 'projects' || currentPage === 'project-detail' ? 'active' : ''}`}
            onClick={() => navigateTo('projects')}
          >
            Projects
          </button>
          <button
            className={`nav-btn ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => navigateTo('about')}
          >
            About Us
          </button>
          <button
            className={`nav-btn ${currentPage === 'services' ? 'active' : ''}`}
            onClick={() => navigateTo('services')}
          >
            Services
          </button>
          <button
            className={`nav-btn ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => navigateTo('contact')}
          >
            Contact
          </button>
        </nav>

        <button
          className="header-cta"
          onClick={() => navigateTo('contact')}
        >
          Enquire <ArrowUpRight size={15} />
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a onClick={() => navigateTo('home')}>Home <ArrowUpRight size={18} /></a>
          <a onClick={() => navigateTo('projects')}>Projects <ArrowUpRight size={18} /></a>
          <a onClick={() => navigateTo('about')}>About Us <ArrowUpRight size={18} /></a>
          <a onClick={() => navigateTo('services')}>Services <ArrowUpRight size={18} /></a>
          <a onClick={() => navigateTo('contact')}>Contact Us <ArrowUpRight size={18} /></a>
        </div>
      )}

      {/* Main Routed Content */}
      <main id="top">
        {/* ===================== HOME PAGE ===================== */}
        {currentPage === 'home' && (
          <>
            {/* Approved Hero Section with Genuine Rachita Project Imagery */}
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="eyebrow-line"></span> A LEGACY OF BUILDING WELL <span>EST. 1992</span>
                </div>
                <h1>Spaces for<br />what comes <em>next.</em></h1>
                <div className="hero-bottom">
                  <p>Thoughtfully developed places to live, work, invest and find a little more room for life.</p>
                  <button
                    onClick={() => navigateTo('projects')}
                    className="round-link"
                    aria-label="Explore projects"
                  >
                    <ArrowDownRight size={20} />
                  </button>
                </div>
                <div className="hero-index">
                  <span>01 — 06</span>
                  <span>NASHIK · MAHARASHTRA</span>
                </div>
              </div>
              <div className="hero-image-wrap">
                <img
                  className="hero-image"
                  src="/assets/projects/green-village/green-village-phase-iv-main.png"
                  alt="Green Village countryside project by Rachita Constructions"
                />
                <div className="image-caption">
                  <span>GREEN VILLAGE / BEZE VILLAGE, TRIMBAK</span>
                  <span>Gautami Dam Lakeside Plots</span>
                </div>
                <div className="vertical-note">A DIFFERENT KIND OF GROWTH — RACHITA</div>
                <div className="hero-stamp">
                  <span>BUILT ON</span>
                  <strong>TRUST.</strong>
                  <span>GROWING WITH YOU.</span>
                </div>
              </div>
            </section>

            {/* Concise Intro / Foundation Section */}
            <section className="intro section-pad">
              <div className="section-label">
                <span>01 / THE RACHITA STORY</span>
                <span>OUR FOUNDATION</span>
              </div>
              <div className="intro-grid">
                <h2>Good spaces<br />make room for<br /><em>good lives.</em></h2>
                <div className="intro-text">
                  <p className="lead">
                    Since 1992, founded by Mr. Prasanna Saykhedkar, we've believed that building is about more than bricks and blueprints. It's about the trust people place in a place — and the possibilities it gives them.
                  </p>
                  <p>
                    From homes and commercial spaces to land and countryside retreats, Rachita brings a considered approach to property development across Nashik and beyond.
                  </p>
                  <button className="text-link" onClick={() => navigateTo('about')}>
                    Read our full story <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
              <div className="stats-row">
                <div>
                  <strong>1992</strong>
                  <span>Founded by Mr. Prasanna Saykhedkar</span>
                </div>
                <div>
                  <strong>32<span className="stat-plus">+</span></strong>
                  <span>Years of development experience</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>A relationship-first philosophy</span>
                </div>
                <div className="stats-note">
                  A lasting foundation<br />for every next chapter.
                </div>
              </div>
            </section>

            {/* Selected Projects Showcase */}
            <section className="projects section-pad">
              <div className="section-label">
                <span>02 / SELECTED DEVELOPMENTS</span>
                <span>MADE FOR MANY WAYS OF LIVING</span>
              </div>
              <div className="section-heading">
                <h2>Find your kind<br />of <em>space.</em></h2>
                <div className="heading-action-wrap">
                  <p>Different needs. Different possibilities.<br />One thoughtful approach to every development.</p>
                  <button className="text-link" onClick={() => navigateTo('projects')}>
                    View all developments <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>

              <div className="project-grid">
                {projectsData.slice(0, 3).map((p, i) => (
                  <article className={`project-card ${i === 0 ? 'project-feature' : ''}`} key={p.id}>
                    <div
                      className="project-image"
                      onClick={() => navigateTo('project-detail', p.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={p.image} alt={`${p.name} authentic photograph`} loading="lazy" />
                      <span className="project-num">{p.number} / {String(projectsData.length).padStart(2, '0')}</span>
                      <span className="project-arrow"><ArrowUpRight size={18} /></span>
                      <span className="project-status">{p.status}</span>
                    </div>
                    <div className="project-meta">
                      <span>{p.type}</span>
                      <span><MapPin size={12} /> {p.location}</span>
                    </div>
                    <h3>{p.name}</h3>
                    <button
                      className="project-detail"
                      onClick={() => navigateTo('project-detail', p.id)}
                    >
                      Discover this project <ArrowUpRight size={14} />
                    </button>
                  </article>
                ))}
              </div>
            </section>

            {/* Approach / Manifesto Section */}
            <section className="manifesto">
              <div className="manifesto-image">
                <img
                  src="/assets/projects/sai-residency/sai-residency-elevation.png"
                  alt="Sai Residency Apartment by Rachita Constructions"
                  loading="lazy"
                />
                <span className="manifesto-image-label">SAI RESIDENCY — PETH ROAD, NASHIK</span>
              </div>
              <div className="manifesto-copy">
                <div className="section-label">
                  <span>03 / WHAT WE BELIEVE</span>
                </div>
                <h2>Built with care.<br />Grounded in <em>trust.</em></h2>
                <p>We believe the best developments begin by listening — to the land, to the people who will use it, and to the future they imagine.</p>
                <div className="principles">
                  <div>
                    <span>01</span>
                    <div>
                      <h3>Quality in the details</h3>
                      <p>Thoughtful planning, robust materials, and a respect for the craft of building.</p>
                    </div>
                  </div>
                  <div>
                    <span>02</span>
                    <div>
                      <h3>People before property</h3>
                      <p>Clear communication, transparent dealings, and relationships that extend beyond handover.</p>
                    </div>
                  </div>
                  <div>
                    <span>03</span>
                    <div>
                      <h3>Possibility with purpose</h3>
                      <p>Spaces shaped around real lives and genuine needs, not just square footage.</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => navigateTo('contact')} className="text-link">
                  Talk to our team <ArrowUpRight size={16} />
                </button>
              </div>
            </section>

            {/* Quote / Philosophy */}
            <section className="quote-section">
              <div className="quote-mark">“</div>
              <blockquote>While buildings can be created, <em>trust is built</em> — one relationship at a time.</blockquote>
              <div className="quote-credit">
                <span>THE RACHITA PHILOSOPHY</span>
                <span>EST. 1992 · NASHIK</span>
              </div>
            </section>

            {/* Concise Contact CTA */}
            <section className="contact section-pad">
              <div className="section-label">
                <span>04 / YOUR NEXT CHAPTER</span>
                <span>LET'S TALK</span>
              </div>
              <div className="contact-grid">
                <div className="contact-copy">
                  <h2>Let's find<br />your <em>place.</em></h2>
                  <p>Tell us a little about what you're looking for. Our team in Thatte Nagar, Nashik will help you take the next step.</p>
                  <div className="contact-links">
                    <a href="tel:+912533500021"><Phone size={16} /> +91 253 350 0021</a>
                    <a href="tel:+918888810406"><Phone size={16} /> +91 88888 10406</a>
                    <a href="mailto:info@rachita.in"><Mail size={16} /> info@rachita.in</a>
                    <span><MapPin size={16} /> Thatte Wadi Road, Next to HDFC Bank, Thatte Nagar, Nashik</span>
                  </div>
                </div>
                <form className="enquiry-form" onSubmit={handleFormSubmit}>
                  {submitted ? (
                    <div className="success-state">
                      <CheckCircle2 size={34} />
                      <h3>Thank you for reaching out.</h3>
                      <p>Your enquiry has been received. Our team will get in touch with you shortly.</p>
                      <button type="button" className="text-link" onClick={() => setSubmitted(false)}>
                        Send another enquiry <ArrowRight size={15} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="form-top">
                        <span>PROPERTY ENQUIRY</span>
                        <span>01 — 04</span>
                      </div>
                      <label>
                        Your name
                        <input
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="How should we address you?"
                        />
                      </label>
                      <label>
                        Phone number
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 00000 00000"
                        />
                      </label>
                      <label>
                        I'm interested in
                        <select
                          value={form.interest}
                          onChange={e => setForm({ ...form, interest: e.target.value })}
                        >
                          <option>Residential property</option>
                          <option>Commercial property</option>
                          <option>Land & farmhouse</option>
                          <option>Industrial / warehouse</option>
                          <option>General enquiry</option>
                        </select>
                      </label>
                      <label>
                        Anything else?
                        <textarea
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us what you have in mind (optional)"
                          rows="2"
                        />
                      </label>
                      <button type="submit" className="submit-btn">
                        Send enquiry <ArrowUpRight size={16} />
                      </button>
                      <p className="form-privacy">By submitting, you agree to be contacted about your enquiry.</p>
                    </>
                  )}
                </form>
              </div>
            </section>
          </>
        )}

        {/* ===================== ABOUT US PAGE ===================== */}
        {currentPage === 'about' && (
          <section className="inner-page section-pad">
            <div className="section-label">
              <span>ABOUT RACHITA CONSTRUCTIONS</span>
              <span>EST. 1992 · NASHIK</span>
            </div>

            <div className="page-header">
              <div className="eyebrow">
                <span className="eyebrow-line"></span> THREE DECADES OF TRUST
              </div>
              <h1 className="page-title">
                Building with <em>purpose.</em><br />Rooted in Nashik.
              </h1>
              <p className="page-subtitle">
                Founded in 1992 by Mr. Prasanna Saykhedkar, Rachita Constructions Pvt. Ltd. was built on a simple yet enduring premise: to transform how people perceive quality and reliability in real estate.
              </p>
            </div>

            {/* Authentic Company Visual Banner */}
            <div className="about-media-banner">
              <img
                src="/assets/company/about-us-hero.webp"
                alt="Rachita Constructions architectural development"
                className="about-hero-img"
              />
              <div className="about-banner-badge">
                <Building size={14} /> 32+ Years of Verified Development in Nashik & Maharashtra
              </div>
            </div>

            <div className="about-narrative-grid">
              <div className="about-narrative-copy">
                <h2>A journey defined by relationships, not just structures.</h2>
                <p>
                  For more than 32 years, Rachita Constructions has been an integral part of Nashik's architectural and urban landscape. From landmark residential apartments in central neighborhoods like Gangapur Road, Somnath Shinde Nagar, and Makhmalabad, to tranquil farmhouse sanctuaries in Trimbakeshwar and strategic commercial properties in Pune, each project reflects careful planning and honest execution.
                </p>
                <p>
                  Our founder, Mr. Prasanna Saykhedkar, instilled a culture where commitments made on paper are delivered with uncompromising craftsmanship on site. We prioritize legal title transparency, Vaastu-friendly space planning, and durable construction specifications.
                </p>
              </div>

              <div className="about-narrative-sidebar">
                <div className="info-card">
                  <div className="info-card-header">
                    <Building size={20} />
                    <h3>Company Overview</h3>
                  </div>
                  <dl className="details-list">
                    <div>
                      <dt>Legal Entity</dt>
                      <dd>{companyDetails.name}</dd>
                    </div>
                    <div>
                      <dt>Founder & Leadership</dt>
                      <dd>{companyDetails.founder}</dd>
                    </div>
                    <div>
                      <dt>Year Founded</dt>
                      <dd>{companyDetails.establishedYear} (32+ Years of Excellence)</dd>
                    </div>
                    <div>
                      <dt>Registered Headquarters</dt>
                      <dd>{companyDetails.corporateOffice.addressLine1}, {companyDetails.corporateOffice.addressLine2}, {companyDetails.corporateOffice.city} – {companyDetails.corporateOffice.pincode}</dd>
                    </div>
                    <div>
                      <dt>Core Geographies</dt>
                      <dd>Nashik, Trimbakeshwar, Pune (Maharashtra)</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="values-section">
              <div className="section-label">
                <span>OUR GUIDING PILLARS</span>
                <span>HOW WE OPERATE</span>
              </div>
              <div className="values-grid">
                <div className="value-box">
                  <div className="value-icon"><ShieldCheck size={26} /></div>
                  <h3>Uncompromising Integrity</h3>
                  <p>100% legal transparency, clear titles, verified approvals, and honest commitments in every agreement.</p>
                </div>
                <div className="value-box">
                  <div className="value-icon"><Compass size={26} /></div>
                  <h3>Contextual Design</h3>
                  <p>Spaces shaped around natural airflow, natural daylight, family needs, and the surrounding neighborhood fabric.</p>
                </div>
                <div className="value-box">
                  <div className="value-icon"><Layers size={26} /></div>
                  <h3>Enduring Craftsmanship</h3>
                  <p>Selected materials, tested engineering, and supervised structural execution designed to stand the test of time.</p>
                </div>
              </div>
            </div>

            {/* About Page CTA */}
            <div className="inner-page-cta">
              <div>
                <h2>Ready to explore our work?</h2>
                <p>Browse our ongoing and landmark developments across Nashik and Maharashtra.</p>
              </div>
              <div className="cta-actions">
                <button className="submit-btn-inline" onClick={() => navigateTo('projects')}>
                  View Projects <ArrowUpRight size={16} />
                </button>
                <button className="text-link" onClick={() => navigateTo('contact')}>
                  Get in touch with our team <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ===================== SERVICES / EXPERTISE PAGE ===================== */}
        {currentPage === 'services' && (
          <section className="inner-page section-pad">
            <div className="section-label">
              <span>OUR EXPERTISE & SERVICES</span>
              <span>FROM EVERYDAY TO EXTRAORDINARY</span>
            </div>

            <div className="page-header">
              <div className="eyebrow">
                <span className="eyebrow-line"></span> END-TO-END CAPABILITIES
              </div>
              <h1 className="page-title">
                One foundation.<br /><em>Many possibilities.</em>
              </h1>
              <p className="page-subtitle">
                Over three decades, Rachita Constructions has delivered across residential developments, commercial ventures, land layouts, and countryside properties with verified regulatory standards.
              </p>
            </div>

            <div className="services-full-list">
              {services.map((s) => (
                <article className="service-detail-card" key={s.num}>
                  <div className="service-card-image-wrap">
                    <img src={s.image} alt={s.title} loading="lazy" />
                  </div>
                  <div className="service-card-top">
                    <span className="service-badge">{s.num}</span>
                    <h2>{s.title}</h2>
                  </div>
                  <p className="service-lead">{s.desc}</p>
                  <p className="service-body">{s.details}</p>
                  <button
                    className="text-link"
                    onClick={() => {
                      setForm({ ...form, interest: s.title });
                      navigateTo('contact');
                    }}
                  >
                    Enquire about {s.title.toLowerCase()} <ArrowUpRight size={15} />
                  </button>
                </article>
              ))}
            </div>

            <div className="quote-section inner-quote">
              <div className="quote-mark">“</div>
              <blockquote>We create places that support life, business, and lasting peace of mind.</blockquote>
              <div className="quote-credit">
                <span>ESTABLISHED 1992</span>
                <span>NASHIK · MAHARASHTRA</span>
              </div>
            </div>
          </section>
        )}

        {/* ===================== PROJECTS CATALOG PAGE ===================== */}
        {currentPage === 'projects' && (
          <section className="inner-page section-pad">
            <div className="section-label">
              <span>PORTFOLIO OF DEVELOPMENTS</span>
              <span>NASHIK, TRIMBAK & PUNE</span>
            </div>

            <div className="page-header">
              <div className="eyebrow">
                <span className="eyebrow-line"></span> VERIFIED DEVELOPMENTS
              </div>
              <h1 className="page-title">
                Find your kind<br />of <em>space.</em>
              </h1>
              <p className="page-subtitle">
                Explore our residential communities, countryside retreats, plotted land developments, and commercial properties using genuine photography.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="filters" role="group" aria-label="Filter projects">
              {['All', 'Residential', 'Commercial', 'Land & Farmhouse'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={filter === f ? 'filter active' : 'filter'}
                >
                  {f}
                  <span>
                    {f === 'All'
                      ? String(projectsData.length).padStart(2, '0')
                      : String(projectsData.filter(p => p.type === f).length).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>

            <div className="project-grid">
              {filteredProjects.map((p, i) => (
                <article
                  className={`project-card ${i === 0 && filter === 'All' ? 'project-feature' : ''}`}
                  key={p.id}
                >
                  <div
                    className="project-image"
                    onClick={() => navigateTo('project-detail', p.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={p.image} alt={`${p.name} authentic site photograph`} loading="lazy" />
                    <span className="project-num">{p.number} / {String(projectsData.length).padStart(2, '0')}</span>
                    <span className="project-arrow"><ArrowUpRight size={18} /></span>
                    <span className="project-status">{p.status}</span>
                  </div>
                  <div className="project-meta">
                    <span>{p.type}</span>
                    <span><MapPin size={12} /> {p.location}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p className="project-card-brief">{p.summary}</p>
                  <button
                    className="project-detail"
                    onClick={() => navigateTo('project-detail', p.id)}
                  >
                    View Project Details <ArrowUpRight size={14} />
                  </button>
                </article>
              ))}
            </div>

            <p className="disclaimer">
              Photographs shown are genuine project visuals and layouts from Rachita Constructions. Detailed sanction documents and booking availability can be verified at our corporate office.
            </p>
          </section>
        )}

        {/* ===================== INDIVIDUAL PROJECT DETAIL PAGE ===================== */}
        {currentPage === 'project-detail' && (
          <section className="inner-page section-pad">
            <button
              className="back-btn"
              onClick={() => navigateTo('projects')}
            >
              <ArrowLeft size={16} /> Back to all projects
            </button>

            <div className="section-label">
              <span>PROJECT {selectedProject.number} / {String(projectsData.length).padStart(2, '0')}</span>
              <span>{selectedProject.type.toUpperCase()}</span>
            </div>

            <div className="page-header project-detail-header">
              <div className="eyebrow">
                <span className="eyebrow-line"></span> {selectedProject.status.toUpperCase()}
              </div>
              <h1 className="page-title">{selectedProject.name}</h1>
              <p className="page-subtitle">{selectedProject.tagline}</p>
            </div>

            {/* Main Interactive Media Viewer */}
            <div className="project-hero-media">
              <img
                src={selectedProject.gallery?.[activeMediaIndex] || selectedProject.image}
                alt={selectedProject.name}
              />
              <div className="media-overlay-badge">
                <MapPin size={14} /> {selectedProject.location}
              </div>
            </div>

            {/* Gallery Thumbnails if available */}
            {selectedProject.gallery && selectedProject.gallery.length > 1 && (
              <div className="gallery-thumbs-row">
                <span className="gallery-label"><ImageIcon size={13} /> Project Views:</span>
                {selectedProject.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${activeMediaIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveMediaIndex(idx)}
                  >
                    <img src={img} alt={`${selectedProject.name} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            <div className="project-detail-grid">
              <div className="detail-main">
                <h2>About the Development</h2>
                <p className="lead">{selectedProject.summary}</p>
                <p>
                  Engineered with Rachita's focus on structural longevity, natural daylight, and enduring neighborhood livability, {selectedProject.name} represents thoughtful planning and dependable building standards.
                </p>

                <h3 className="subhead">Highlights & Features</h3>
                <ul className="features-checklist">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={18} className="feat-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <p className="disclaimer">
                  All specifications, layouts, and site photographs reflect authentic documentation from Rachita Constructions Pvt. Ltd.
                </p>
              </div>

              <div className="detail-sidebar">
                <div className="info-card">
                  <div className="info-card-header">
                    <Building size={18} />
                    <h3>Project Profile</h3>
                  </div>
                  <dl className="details-list">
                    <div>
                      <dt>Project Name</dt>
                      <dd>{selectedProject.name}</dd>
                    </div>
                    <div>
                      <dt>Category</dt>
                      <dd>{selectedProject.type}</dd>
                    </div>
                    <div>
                      <dt>Configuration</dt>
                      <dd>{selectedProject.configuration}</dd>
                    </div>
                    <div>
                      <dt>Location</dt>
                      <dd>{selectedProject.location}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{selectedProject.status}</dd>
                    </div>
                    <div>
                      <dt>Developer</dt>
                      <dd>{companyDetails.name}</dd>
                    </div>
                  </dl>
                  <button
                    className="submit-btn"
                    onClick={() => {
                      setForm({ ...form, interest: `${selectedProject.name} (${selectedProject.type})` });
                      navigateTo('contact');
                    }}
                  >
                    Enquire for this project <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===================== CONTACT US PAGE ===================== */}
        {currentPage === 'contact' && (
          <section className="inner-page section-pad">
            <div className="section-label">
              <span>GET IN TOUCH</span>
              <span>THATTE NAGAR, NASHIK</span>
            </div>

            <div className="page-header">
              <div className="eyebrow">
                <span className="eyebrow-line"></span> START A CONVERSATION
              </div>
              <h1 className="page-title">
                Let's find<br />your <em>place.</em>
              </h1>
              <p className="page-subtitle">
                Visit our corporate office in Nashik, call our advisory desk, or submit your requirement below.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-copy">
                <h2>Reach our team.</h2>
                <p>
                  Whether you are planning to purchase a home, invest in NA plots, seek countryside farmhouse land, or acquire commercial space, our team is at your service.
                </p>

                <div className="contact-details-block">
                  <div className="contact-item">
                    <MapPin size={18} />
                    <div>
                      <strong>Corporate Office</strong>
                      <p>{companyDetails.corporateOffice.addressLine1},</p>
                      <p>{companyDetails.corporateOffice.addressLine2},</p>
                      <p>{companyDetails.corporateOffice.city}, {companyDetails.corporateOffice.state} – {companyDetails.corporateOffice.pincode}</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Phone size={18} />
                    <div>
                      <strong>Direct Phone Lines</strong>
                      {companyDetails.phones.map(p => (
                        <p key={p.number}>
                          <a href={`tel:${p.raw}`}>{p.number} <span className="label-tag">({p.label})</span></a>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="contact-item">
                    <Mail size={18} />
                    <div>
                      <strong>Official Email</strong>
                      {companyDetails.emails.map(m => (
                        <p key={m.email}>
                          <a href={`mailto:${m.email}`}>{m.email} <span className="label-tag">({m.label})</span></a>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="contact-item">
                    <Clock size={18} />
                    <div>
                      <strong>Office Hours</strong>
                      <p>{companyDetails.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="enquiry-form" onSubmit={handleFormSubmit}>
                {submitted ? (
                  <div className="success-state">
                    <CheckCircle2 size={34} />
                    <h3>Thank you for reaching out.</h3>
                    <p>Your enquiry has been prepared and received. Our team will contact you shortly with verified details.</p>
                    <button type="button" className="text-link" onClick={() => setSubmitted(false)}>
                      Send another enquiry <ArrowRight size={15} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="form-top">
                      <span>PROPERTY ENQUIRY</span>
                      <span>01 — 04</span>
                    </div>
                    <label>
                      Your name *
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="How should we address you?"
                      />
                    </label>
                    <label>
                      Phone number *
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                      />
                    </label>
                    <label>
                      Email address (optional)
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="yourname@domain.com"
                      />
                    </label>
                    <label>
                      I'm interested in
                      <select
                        value={form.interest}
                        onChange={e => setForm({ ...form, interest: e.target.value })}
                      >
                        <option>Residential property</option>
                        <option>Commercial property</option>
                        <option>Land & farmhouse</option>
                        <option>Industrial / warehouse</option>
                        <option>Rachita Glory Apartment</option>
                        <option>Green Village — Phase IV</option>
                        <option>Sai Residency Apartment</option>
                        <option>Residential Final — N.A. Plots</option>
                        <option>AAA Business (Pune Corporate)</option>
                        <option>Rachita Grace Row Houses</option>
                        <option>General enquiry</option>
                      </select>
                    </label>
                    <label>
                      Specific requirements / message
                      <textarea
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what you have in mind..."
                        rows="3"
                      />
                    </label>
                    <button type="submit" className="submit-btn">
                      Send enquiry <ArrowUpRight size={16} />
                    </button>
                    <p className="form-privacy">
                      Your details are held strictly in confidence by Rachita Constructions.
                    </p>
                  </>
                )}
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <a
            className="wordmark footer-wordmark"
            href="#"
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
          >
            <span className="mark">R<span>.</span></span>
            <span className="wordmark-copy">RACHITA<small>CONSTRUCTIONS</small></span>
          </a>
          <p>
            Spaces for what comes next.<br />
            Rooted in Nashik since 1992.
          </p>
          <a
            className="back-top"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            BACK TO TOP <MoveUpRight size={14} />
          </a>
        </div>

        <div className="footer-nav-row">
          <button onClick={() => navigateTo('home')}>Home</button>
          <button onClick={() => navigateTo('about')}>About Us</button>
          <button onClick={() => navigateTo('projects')}>Projects</button>
          <button onClick={() => navigateTo('services')}>Services</button>
          <button onClick={() => navigateTo('contact')}>Contact</button>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {companyDetails.name} All rights reserved.</span>
          <span>MADE WITH PURPOSE, BUILT ON TRUST.</span>
          <a href={companyDetails.officialWebsite} target="_blank" rel="noreferrer">
            Original website <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
