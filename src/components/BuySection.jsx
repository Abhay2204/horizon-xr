import React, { useEffect, useRef, useState } from 'react'
import './BuySection.css'

export default function BuySection() {
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(1)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.08 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const options = [
        { label: 'Standard', storage: '256 GB', price: '$3,499' },
        { label: 'Pro', storage: '512 GB', price: '$3,999', popular: true },
        { label: 'Elite', storage: '1 TB', price: '$4,799' },
    ]

    return (
        <section
            className={`buy ${visible ? 'buy--visible' : ''}`}
            id="buy-section"
            ref={sectionRef}
        >
            {/* Left: Large product image — takes up half the screen */}
            <div className="buy__visual">
                <img
                    src="/assets/product.png"
                    alt="Horizon XR Headset"
                    className="buy__product-img"
                />
            </div>

            {/* Right: Clean minimal buy panel */}
            <div className="buy__panel">
                <div className="buy__panel-content">

                    <div className="buy__header">
                        <span className="buy__eyebrow">Available Now</span>
                        <h2 className="buy__title">Horizon XR</h2>
                        <p className="buy__desc">The most advanced extended reality headset ever created. Starts at $3,499.</p>
                    </div>

                    {/* Variants */}
                    <div className="buy__variants">
                        <p className="buy__variants-label">Select configuration</p>
                        <div className="buy__options">
                            {options.map((opt, i) => (
                                <button
                                    key={opt.label}
                                    className={`buy__opt ${selected === i ? 'buy__opt--active' : ''}`}
                                    onClick={() => setSelected(i)}
                                >
                                    <div className="buy__opt-radio">
                                        <div className="buy__opt-radio-dot" />
                                    </div>
                                    <div className="buy__opt-info">
                                        <span className="buy__opt-name">{opt.label}</span>
                                        <span className="buy__opt-storage">{opt.storage}</span>
                                    </div>
                                    <div className="buy__opt-right">
                                        {opt.popular && <span className="buy__opt-badge">Popular</span>}
                                        <span className="buy__opt-price">{opt.price}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="buy__actions">
                        <a href="#" className="buy__cta" id="buy-cta-btn">
                            Pre-Order — {options[selected].price}
                        </a>
                        <a href="#" className="buy__secondary-link">Compare all models →</a>
                    </div>

                    {/* Trust row */}
                    <div className="buy__trust">
                        <span>Free delivery</span>
                        <span className="buy__trust-dot" />
                        <span>14-day returns</span>
                        <span className="buy__trust-dot" />
                        <span>2-year warranty</span>
                    </div>

                </div>
            </div>
        </section>
    )
}
