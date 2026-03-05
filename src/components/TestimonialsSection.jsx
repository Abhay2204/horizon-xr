import React, { useEffect, useRef, useState } from 'react'
import './TestimonialsSection.css'

const quotes = [
    {
        id: 'verge',
        quote: 'The most jaw-dropping display I have ever seen on a head-mounted device. Horizon XR doesn\'t just push the envelope — it tears it up.',
        author: 'The Verge',
        role: 'Technology Review',
        rating: 5,
    },
    {
        id: 'wired',
        quote: 'This is what the future of computing looks like. The hand tracking alone is worth the price of admission.',
        author: 'WIRED',
        role: 'Hands-On Preview',
        rating: 5,
    },
    {
        id: 'techcrunch',
        quote: 'I wore it for six hours and forgot I was wearing anything. That alone is a revolution in this category.',
        author: 'TechCrunch',
        role: 'Comfort Review',
        rating: 5,
    },
    {
        id: 'wsj',
        quote: 'Horizon XR is to mixed reality what the iPhone was to smartphones. A complete paradigm shift.',
        author: 'Wall Street Journal',
        role: 'Editor\'s Choice',
        rating: 5,
    },
    {
        id: 'engadget',
        quote: 'The passthrough quality is indistinguishable from reality. I had to take it off to confirm I was wearing a headset.',
        author: 'Engadget',
        role: 'Passthrough Test',
        rating: 5,
    },
]

// Ticker items — doubled for seamless loop
const tickerItems = [
    '5,000 nits peak brightness',
    '120° field of view',
    'Sub-1ms hand tracking',
    '340g total weight',
    '4K per eye',
    '6hr battery life',
    'Wi-Fi 7 connectivity',
    'HorizonOS 1.0',
]

function StarRating({ count }) {
    return (
        <div className="testi__stars" aria-label={`${count} stars`}>
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    )
}

export default function TestimonialsSection() {
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [active, setActive] = useState(0)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true) },
            { threshold: 0.05 }
        )
        if (sectionRef.current) obs.observe(sectionRef.current)
        return () => obs.disconnect()
    }, [])

    // Auto-advance
    useEffect(() => {
        if (!visible) return
        const t = setInterval(() => {
            setActive(a => (a + 1) % quotes.length)
        }, 4500)
        return () => clearInterval(t)
    }, [visible])

    const q = quotes[active]

    return (
        <section
            className={`testi ${visible ? 'testi--visible' : ''}`}
            id="testimonials-section"
            ref={sectionRef}
        >
            {/* Header */}
            <div className="testi__header">
                <span className="testi__eyebrow">Press & Reviews</span>
                <h2 className="testi__heading">The world is watching.</h2>
                <p className="testi__subheading">
                    Horizon XR has been praised by the world's most discerning technology editors.
                </p>
            </div>

            {/* Main quote carousel */}
            <div className="testi__carousel">
                <div className="testi__quote-wrap" key={q.id}>
                    <StarRating count={q.rating} />
                    <blockquote className="testi__quote">
                        &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <div className="testi__attribution">
                        <span className="testi__author">{q.author}</span>
                        <span className="testi__role">{q.role}</span>
                    </div>
                </div>

                {/* Navigation dots */}
                <div className="testi__dots">
                    {quotes.map((_, i) => (
                        <button
                            key={i}
                            className={`testi__dot ${i === active ? 'testi__dot--active' : ''}`}
                            onClick={() => setActive(i)}
                            aria-label={`Quote ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Press logo bar */}
            <div className="testi__press-bar">
                {quotes.map((p, i) => (
                    <button
                        key={p.id}
                        className={`testi__press-name ${i === active ? 'testi__press-name--active' : ''}`}
                        onClick={() => setActive(i)}
                    >
                        {p.author}
                    </button>
                ))}
            </div>

            {/* Scrolling ticker */}
            <div className="testi__ticker-wrap">
                <div className="testi__ticker">
                    {[...tickerItems, ...tickerItems].map((item, i) => (
                        <span key={i} className="testi__ticker-item">
                            <span className="testi__ticker-dot">✦</span>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
