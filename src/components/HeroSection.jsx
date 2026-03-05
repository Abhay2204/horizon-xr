import React, { useMemo } from 'react'
import useScrollCanvas from '../hooks/useScrollCanvas'
import './HeroSection.css'

export default function HeroSection() {
    const { canvasRef, progress, currentFrame, isLoaded } = useScrollCanvas({
        folder: '/assets/hero frames',
        frameCount: 136,
        prefix: 'ezgif-frame-',
        extension: '.jpg',
        padLength: 3,
    })

    // Compute text visibility based on frame ranges
    // Frames 1-50 (progress 0 - 0.37): Intro text fades in then out
    // Frames 50-90 (progress 0.37 - 0.66): Features text fades in then out
    // Frames 90-136 (progress 0.66 - 1.0): No text, clean transition

    const introOpacity = useMemo(() => {
        if (progress < 0.02) return 0 // Hidden at very start
        if (progress < 0.08) return (progress - 0.02) / 0.06 // Fade in
        if (progress < 0.28) return 1 // Fully visible
        if (progress < 0.37) return 1 - (progress - 0.28) / 0.09 // Fade out
        return 0
    }, [progress])

    const introTranslateY = useMemo(() => {
        if (progress < 0.02) return 60
        if (progress < 0.08) return 60 * (1 - (progress - 0.02) / 0.06)
        if (progress < 0.28) return 0
        if (progress < 0.37) return -40 * ((progress - 0.28) / 0.09)
        return -40
    }, [progress])

    const featuresOpacity = useMemo(() => {
        if (progress < 0.37) return 0
        if (progress < 0.44) return (progress - 0.37) / 0.07 // Fade in
        if (progress < 0.58) return 1 // Fully visible
        if (progress < 0.66) return 1 - (progress - 0.58) / 0.08 // Fade out
        return 0
    }, [progress])

    const featuresTranslateY = useMemo(() => {
        if (progress < 0.37) return 60
        if (progress < 0.44) return 60 * (1 - (progress - 0.37) / 0.07)
        if (progress < 0.58) return 0
        if (progress < 0.66) return -40 * ((progress - 0.58) / 0.08)
        return -40
    }, [progress])

    // Left side stagger delay
    const introLeftStyle = {
        opacity: introOpacity,
        transform: `translateY(${introTranslateY}px)`,
    }

    const introRightStyle = {
        opacity: introOpacity,
        transform: `translateY(${introTranslateY + 10}px)`,
    }

    const featuresLeftStyle = {
        opacity: featuresOpacity,
        transform: `translateY(${featuresTranslateY}px)`,
    }

    const featuresRightStyle = {
        opacity: featuresOpacity,
        transform: `translateY(${featuresTranslateY + 10}px)`,
    }

    return (
        <section className="hero" id="hero" data-scroll-container>
            {/* Canvas for frame animation */}
            <div className="hero__canvas-wrapper">
                <canvas ref={canvasRef} className="hero__canvas" />
                {!isLoaded && (
                    <div className="hero__loader">
                        <div className="hero__loader-spinner" />
                        <span>Loading experience...</span>
                    </div>
                )}
            </div>

            {/* Intro Text Overlay (Frames 1-50) */}
            <div className="hero__overlay" style={{ pointerEvents: introOpacity > 0.1 ? 'auto' : 'none' }}>
                <div className="hero__overlay-left" style={introLeftStyle}>
                    <span className="hero__eyebrow">Introducing</span>
                    <h1 className="hero__title">
                        <span className="hero__title-line">Horizon</span>
                        <span className="hero__title-line hero__title-xr">XR</span>
                    </h1>
                    <p className="hero__subtitle">See beyond reality.</p>
                </div>

                <div className="hero__overlay-right" style={introRightStyle}>
                    <p className="hero__tagline">
                        The most advanced<br />
                        extended reality headset<br />
                        ever created.
                    </p>
                    <div className="hero__cta-group">
                        <a href="#buy-section" className="btn-primary" id="hero-buy-btn">
                            Buy Now — $3,499
                        </a>
                        <a href="#features-section" className="btn-secondary" id="hero-features-btn">
                            Explore Features
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path d="M8 3L8 13M8 13L13 8M8 13L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Features Text Overlay (Frames 50-90) */}
            <div className="hero__overlay" style={{ pointerEvents: featuresOpacity > 0.1 ? 'auto' : 'none' }}>
                <div className="hero__overlay-left" style={featuresLeftStyle}>
                    <div className="hero__feature-card">
                        <div className="hero__feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <h3>Ultra-Wide Display</h3>
                        <p>Dual micro-OLED panels delivering 4K per eye with 120° field of view</p>
                    </div>
                    <div className="hero__feature-card">
                        <div className="hero__feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3>Spatial Computing</h3>
                        <p>Advanced LiDAR and depth sensors for precise environment mapping</p>
                    </div>
                </div>

                <div className="hero__overlay-right" style={featuresRightStyle}>
                    <div className="hero__feature-card">
                        <div className="hero__feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <h3>Immersive Audio</h3>
                        <p>Personalized spatial audio with ray-traced acoustics and head tracking</p>
                    </div>
                    <div className="hero__feature-card">
                        <div className="hero__feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3>All-Day Battery</h3>
                        <p>Up to 6 hours of mixed reality use with hot-swappable battery pack</p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator at bottom */}
            <div
                className="hero__scroll-hint"
                style={{ opacity: progress < 0.05 ? 1 : 0 }}
            >
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-wheel" />
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    )
}
