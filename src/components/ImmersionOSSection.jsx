import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ImmersionOSSection.css'

gsap.registerPlugin(ScrollTrigger)

const scenes = [
    {
        id: 'spatial',
        eyebrow: 'Spatial Computing',
        title: ['Your world,', 'reimagined.'],
        body: 'Pin apps anywhere in physical space. Watch a 200‑inch film on your ceiling. Collaborate with teammates across the globe as if they were in the room.',
        tag: '∞ Canvas',
    },
    {
        id: 'immersive',
        eyebrow: 'Immersive OS',
        title: ['An OS built', 'for infinity.'],
        body: 'HorizonOS adapts to every environment — bright sunlight, pitch darkness, motion. Every pixel, every interaction, tuned for your reality.',
        tag: 'HorizonOS 1.0',
    },
    {
        id: 'passthrough',
        eyebrow: 'Passthrough Reality',
        title: ['Real world.', 'XR layer.'],
        body: '12 outward cameras render photorealistic passthrough at true 1:1 scale. No lag. No distortion. Just your world — enhanced.',
        tag: '4K Passthrough',
    },
]

export default function ImmersionOSSection() {
    const sectionRef = useRef(null)
    const imageRef = useRef(null)
    const contentRef = useRef(null)
    const [activeScene, setActiveScene] = useState(0)
    const [imgLoaded, setImgLoaded] = useState(false)

    // Framer Motion parallax on scroll
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.06])

    // GSAP entrance — content slides up
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    // Auto-cycle scenes
    useEffect(() => {
        const t = setInterval(() => setActiveScene(s => (s + 1) % scenes.length), 3800)
        return () => clearInterval(t)
    }, [])

    const s = scenes[activeScene]

    const titleVariants = {
        hidden: { opacity: 0, y: 36 },
        visible: (i) => ({
            opacity: 1, y: 0,
            transition: { delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        }),
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    }

    const bodyVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, transition: { duration: 0.25 } },
    }

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
    }

    return (
        <section className="ios" id="immersion-os-section" ref={sectionRef}>
            {/* Parallax image */}
            <div className="ios__image-wrap">
                <motion.img
                    ref={imageRef}
                    src="/assets/immersion os.png"
                    alt="Horizon XR Immersion OS"
                    className={`ios__image ${imgLoaded ? 'ios__image--loaded' : ''}`}
                    onLoad={() => setImgLoaded(true)}
                    style={{ y: imageY, scale: imageScale }}
                />
                <div className="ios__image-overlay" />
            </div>

            {/* Content */}
            <div className="ios__content" ref={contentRef}>
                <div className="ios__left">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={s.id + '-ey'}
                            className="ios__eyebrow"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {s.eyebrow}
                        </motion.span>
                    </AnimatePresence>

                    <h2 className="ios__title">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={s.id + '-title-wrap'}
                                style={{ display: 'flex', flexDirection: 'column' }}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {s.title.map((line, i) => (
                                    <motion.span
                                        key={s.id + '-t' + i}
                                        className="ios__title-line"
                                        custom={i}
                                        variants={titleVariants}
                                    >
                                        {line}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </AnimatePresence>
                    </h2>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={s.id + '-body'}
                            className="ios__body"
                            variants={bodyVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {s.body}
                        </motion.p>
                    </AnimatePresence>

                    <div className="ios__dots">
                        {scenes.map((sc, i) => (
                            <motion.button
                                key={sc.id}
                                className={`ios__dot ${i === activeScene ? 'ios__dot--active' : ''}`}
                                onClick={() => setActiveScene(i)}
                                whileHover={{ scale: 1.4 }}
                                whileTap={{ scale: 0.85 }}
                                aria-label={sc.eyebrow}
                            />
                        ))}
                    </div>
                </div>

                <div className="ios__right">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={s.id + '-tag'}
                            className="ios__tag"
                            variants={tagVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {s.tag}
                        </motion.div>
                    </AnimatePresence>
                    <p className="ios__learn-more">
                        <a href="#specs-section">Explore technology →</a>
                    </p>
                </div>
            </div>
        </section>
    )
}
