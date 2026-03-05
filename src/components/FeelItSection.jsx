import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FeelItSection.css'

gsap.registerPlugin(ScrollTrigger)

const moments = [
    { id: 'weight', label: '340 g', caption: 'Feather-light on your face.' },
    { id: 'cushion', label: 'Memory foam', caption: 'Pressure-mapped comfort cushions.' },
    { id: 'fit', label: 'Infinite adjust', caption: 'The precision fit dial learns you.' },
    { id: 'material', label: 'Medical-grade', caption: 'Aerospace alloys. Zero off-gassing.' },
]

export default function FeelItSection() {
    const sectionRef = useRef(null)
    const imageColRef = useRef(null)
    const titleRef = useRef(null)
    const pillsRef = useRef(null)
    const [imgLoaded, setImgLoaded] = useState(false)

    // Parallax image drift on scroll
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

    // GSAP — image slide in
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image column
            gsap.fromTo(
                imageColRef.current,
                { x: -80, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                }
            )

            // Title lines stagger
            gsap.fromTo(
                titleRef.current?.querySelectorAll('.feelit__title-word'),
                { y: 56, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.08,
                    duration: 0.9, ease: 'expo.out',
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                        toggleActions: 'play none none none',
                    },
                }
            )

            // Subtitle
            gsap.fromTo(
                '.feelit__subtitle',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.85, ease: 'expo.out', delay: 0.4,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                        toggleActions: 'play none none none',
                    },
                }
            )

            // Pills stagger
            gsap.fromTo(
                pillsRef.current?.querySelectorAll('.feelit__moment'),
                { y: 28, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    stagger: 0.09,
                    duration: 0.75, ease: 'expo.out', delay: 0.55,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section className="feelit" id="feel-it-section" ref={sectionRef}>
            {/* Left: parallax image */}
            <div className="feelit__image-col" ref={imageColRef}>
                <div className="feelit__image-wrap">
                    <motion.img
                        src="/assets/feel it.png"
                        alt="Horizon XR — crafted for comfort"
                        className={`feelit__image ${imgLoaded ? 'feelit__image--loaded' : ''}`}
                        onLoad={() => setImgLoaded(true)}
                        style={{ y: imageY }}
                    />
                    <div className="feelit__vignette" />
                </div>
            </div>

            {/* Right: text */}
            <div className="feelit__text-col">
                <div className="feelit__text-inner">
                    <motion.span
                        className="feelit__eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Design & Comfort
                    </motion.span>

                    <h2 className="feelit__title" ref={titleRef}>
                        <span className="feelit__title-word">Built to</span>
                        <span className="feelit__title-word feelit__title-accent">disappear</span>
                        <span className="feelit__title-word">on your face.</span>
                    </h2>

                    <p className="feelit__subtitle">
                        Every curve, every material, every gram considered.
                        Horizon XR is the first headset you forget you're wearing.
                    </p>

                    {/* Animated pills */}
                    <div className="feelit__moments" ref={pillsRef}>
                        {moments.map((m) => (
                            <motion.div
                                key={m.id}
                                className="feelit__moment"
                                whileHover={{
                                    x: 8,
                                    borderColor: 'rgba(0,113,227,0.35)',
                                    backgroundColor: 'rgba(0,113,227,0.05)',
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="feelit__moment-label">{m.label}</span>
                                <span className="feelit__moment-caption">{m.caption}</span>
                                <motion.span
                                    className="feelit__moment-arrow"
                                    initial={{ opacity: 0, x: -6 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    →
                                </motion.span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
