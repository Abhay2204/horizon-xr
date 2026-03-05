import React, { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
            <div className="navbar__inner">
                <a href="#" className="navbar__logo">
                    <span className="navbar__logo-text">Horizon XR</span>
                </a>

                <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
                    <a href="#hero" onClick={() => setMenuOpen(false)}>Overview</a>
                    <a href="#features-section" onClick={() => setMenuOpen(false)}>Features</a>
                    <a href="#immersion-os-section" onClick={() => setMenuOpen(false)}>Experience</a>
                    <a href="#specs-section" onClick={() => setMenuOpen(false)}>Technology</a>
                    <a href="#buy-section" onClick={() => setMenuOpen(false)}>Buy</a>
                </div>

                <a href="#buy-section" className="navbar__cta">Pre-Order</a>

                <button
                    className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    )
}
