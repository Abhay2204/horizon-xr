import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ControllerSection.css'

gsap.registerPlugin(ScrollTrigger)

const gestures = [
    { id: 'pinch', icon: '✦', label: 'Pinch to select' },
    { id: 'swipe', icon: '⟶', label: 'Swipe to scroll' },
    { id: 'tap', icon: '◎', label: 'Air tap to open' },
    { id: 'hold', icon: '⊛', label: 'Hold to drag' },
    { id: 'spread', icon: '⬡', label: 'Spread to zoom' },
    { id: 'wrist', icon: '◷', label: 'Wrist to menu' },
]

const stats = [
    { value: '27', label: 'Joint points tracked' },
    { value: '<1ms', label: 'Tracking latency' },
    { value: '8K', label: 'Hand cam resolution' },
]

export default function ControllerSection() {
    const sectionRef = useRef(null)
    const imgRef = useRef(null)
    const headlineRef = useRef(null)
    const [imgLoaded, setImgLoaded] = useState(false)

    // Parallax image
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
    const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1.2, 1.3])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Eyebrow
            gsap.fromTo('.ctrl__eyebrow', { opacity: 0, y: 20 }, {
                opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
            })

            // Headline lines — clip-path wipe up
            gsap.fromTo(
                headlineRef.current?.querySelectorAll('.ctrl__title-line'),
                { clipPath: 'inset(100% 0% 0% 0%)', y: 20, opacity: 0 },
                {
                    clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1,
                    stagger: 0.14, duration: 1.0, ease: 'expo.out', delay: 0.1,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none none' },
                }
            )

            // Body copy
            gsap.fromTo('.ctrl__body', { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 0.35,
                scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
            })

            // Stats counter-up
            gsap.fromTo('.ctrl__stat', { opacity: 0, y: 24 }, {
                opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: 'expo.out', delay: 0.5,
                scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', toggleActions: 'play none none none' },
            })

            // Gesture grid
            gsap.fromTo('.ctrl__gesture', { opacity: 0, y: 20, scale: 0.94 }, {
                opacity: 1, y: 0, scale: 1,
                stagger: 0.07, duration: 0.65, ease: 'expo.out', delay: 0.6,
                scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none none' },
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section className="ctrl" id="controller-section" ref={sectionRef}>
            {/* Parallax background image */}
            <div className="ctrl__image-wrap">
                <motion.img
                    ref={imgRef}
                    src="/assets/you are the controller.png"
                    alt="Hand tracking — you are the controller"
                    className={`ctrl__image ${imgLoaded ? 'ctrl__image--loaded' : ''}`}
                    onLoad={() => setImgLoaded(true)}
                    style={{ y: bgY, scale: bgScale }}
                />
                <div className="ctrl__image-overlay" />
            </div>

            <div className="ctrl__content">
                {/* Left */}
                <div className="ctrl__left">
                    <span className="ctrl__eyebrow">Hand Tracking</span>

                    <h2 className="ctrl__title" ref={headlineRef}>
                        <span className="ctrl__title-line ctrl__title-line--dim">You are</span>
                        <span className="ctrl__title-line">the controller.</span>
                    </h2>

                    <p className="ctrl__body">
                        No remotes. No haptic gloves. Horizon XR reads the world's
                        most expressive input device — your hands — at sub-millisecond latency.
                        27 joint points. Infinite commands.
                    </p>

                    <div className="ctrl__stat-row">
                        {stats.map((s) => (
                            <div key={s.label} className="ctrl__stat">
                                <span className="ctrl__stat-value">{s.value}</span>
                                <span className="ctrl__stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: gesture grid */}
                <div className="ctrl__right">
                    <p className="ctrl__gesture-heading">Gesture library</p>
                    <div className="ctrl__gestures">
                        {gestures.map((g) => (
                            <motion.div
                                key={g.id}
                                className="ctrl__gesture"
                                whileHover={{
                                    scale: 1.06,
                                    background: 'rgba(255,255,255,0.1)',
                                    borderColor: 'rgba(255,255,255,0.22)',
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <motion.span
                                    className="ctrl__gesture-icon"
                                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                                >
                                    {g.icon}
                                </motion.span>
                                <span className="ctrl__gesture-label">{g.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
