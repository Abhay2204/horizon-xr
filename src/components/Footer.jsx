import React from 'react'
import './Footer.css'

export default function Footer() {
    const columns = [
        {
            title: 'Product',
            links: ['Overview', 'Features', 'Specifications', 'Compare'],
        },
        {
            title: 'Support',
            links: ['Help Center', 'Contact Us', 'Warranty', 'Returns'],
        },
        {
            title: 'Company',
            links: ['About', 'Careers', 'Press', 'Privacy'],
        },
    ]

    return (
        <footer className="footer" id="main-footer">
            <div className="footer__inner">
                <div className="footer__brand">
                    <span className="footer__logo-text">Horizon XR</span>
                    <p className="footer__tagline">Redefining the boundaries of reality.</p>
                </div>

                <div className="footer__columns">
                    {columns.map((col) => (
                        <div key={col.title} className="footer__col">
                            <h4>{col.title}</h4>
                            {col.links.map((link) => (
                                <a key={link} href="#">{link}</a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer__bottom">
                <p>© 2026 Horizon XR. All rights reserved.</p>
            </div>
        </footer>
    )
}
