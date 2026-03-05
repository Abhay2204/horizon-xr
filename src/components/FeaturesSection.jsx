import React, { useEffect, useRef, useState } from 'react'
import './FeaturesSection.css'

export default function FeaturesSection() {
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.08 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const features = [
        {
            number: '01',
            title: 'Ultra-Wide Curved Display',
            desc: 'Custom micro-OLED with 3,660 × 3,200 pixels per eye. 92% DCI-P3 coverage. 5,000 nits peak brightness.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            ),
        },
        {
            number: '02',
            title: 'Precision Fit Dial',
            desc: 'Infinitely adjustable titanium dial for a perfect, personalized fit with even pressure distribution.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                </svg>
            ),
        },
        {
            number: '03',
            title: 'Lightweight Ergonomic Frame',
            desc: 'Magnesium-alloy chassis at just 340g. Breathable mesh cushioning for all-day comfort.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            ),
        },
        {
            number: '04',
            title: 'Advanced Optics System',
            desc: 'Anti-glare coated visor with real-time foveated rendering and prescription lens support.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
        },
        {
            number: '05',
            title: 'Spatial Audio Engine',
            desc: 'Personalized HRTF spatial audio with ray-traced acoustics adapting in real-time.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                </svg>
            ),
        },
        {
            number: '06',
            title: 'Passthrough Reality',
            desc: '12 cameras and 5 sensors deliver photorealistic passthrough at true 1:1 scale.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                </svg>
            ),
        },
    ]

    return (
        <section
            className={`features ${visible ? 'features--visible' : ''}`}
            id="features-section"
            ref={sectionRef}
        >
            {/* Hero: dark split — text | product */}
            <div className="features__hero">

                {/* Left: Copy + stats */}
                <div className="features__hero-text">
                    <span className="section-eyebrow">Technology</span>
                    <h2 className="section-title">
                        Engineered<br />for the<br />impossible.
                    </h2>
                    <p className="section-subtitle">
                        Every component precision-crafted.<br />Every detail considered.
                    </p>
                    <div className="features__stats">
                        <div className="features__stat-item">
                            <span className="features__stat-value">120°</span>
                            <span className="features__stat-label">Field of View</span>
                        </div>
                        <div className="features__stat-item">
                            <span className="features__stat-value">4K</span>
                            <span className="features__stat-label">Per Eye</span>
                        </div>
                        <div className="features__stat-item">
                            <span className="features__stat-value">340g</span>
                            <span className="features__stat-label">Total Weight</span>
                        </div>
                    </div>
                </div>

                {/* Right: Logo — large, white on dark */}
                <div className="features__hero-image">
                    <img
                        src="/assets/logo.png"
                        alt="Horizon XR"
                        className="features__logo-display"
                    />
                </div>
            </div>

            {/* Feature cards — dark bento grid */}
            <div className="features__cards-section">
                <div className="features__grid">
                    {features.map((f, index) => (
                        <div
                            key={f.number}
                            className="features__card"
                            style={{ transitionDelay: `${index * 0.07}s` }}
                        >
                            <div className="features__card-top">
                                <div className="features__card-icon">{f.icon}</div>
                                <div className="features__card-number">{f.number}</div>
                            </div>
                            <h3 className="features__card-title">{f.title}</h3>
                            <p className="features__card-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
