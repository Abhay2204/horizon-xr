import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SpecsSection.css'

gsap.registerPlugin(ScrollTrigger)

const specs = [
    { value: '12-core', label: 'Neural Engine', numeric: 12, suffix: '-core' },
    { value: '16 GB', label: 'Unified Memory', numeric: 16, suffix: ' GB' },
    { value: '90 fps', label: 'Refresh Rate', numeric: 90, suffix: ' fps' },
    { value: '<8ms', label: 'Latency', numeric: 8, suffix: 'ms', prefix: '<' },
    { value: '256 GB', label: 'Storage', numeric: 256, suffix: ' GB' },
    { value: 'Wi-Fi 7', label: 'Connectivity', numeric: null },
]

function AnimatedNumber({ numeric, suffix, prefix, label }) {
    const ref = useRef(null)
    const [displayed, setDisplayed] = useState(0)
    const triggered = useRef(false)

    useEffect(() => {
        if (numeric === null) return
        const el = ref.current
        if (!el) return

        ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            onEnter: () => {
                if (triggered.current) return
                triggered.current = true
                gsap.fromTo(
                    { val: 0 },
                    {
                        val: numeric, duration: 1.6, ease: 'power3.out',
                        onUpdate: function () { setDisplayed(Math.round(this.targets()[0].val)) }
                    }
                )
            },
        })
    }, [numeric])

    if (numeric === null) return <div className="specs__item-value" ref={ref}>Wi-Fi 7</div>

    return (
        <div className="specs__item-value" ref={ref}>
            {prefix}{displayed}{suffix}
        </div>
    )
}

export default function SpecsSection() {
    const sectionRef = useRef(null)
    const imgRef = useRef(null)
    const titleRef = useRef(null)

    // Parallax on processor image
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
    const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.06])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Eyebrow + title wipe
            gsap.fromTo('.specs__content-col .section-eyebrow', { opacity: 0, y: 20 }, {
                opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
            })

            // Title lines clip-path reveal
            gsap.fromTo(
                titleRef.current?.querySelectorAll('.specs__title-line'),
                { clipPath: 'inset(100% 0% 0% 0%)', y: 20, opacity: 0 },
                {
                    clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1,
                    stagger: 0.12, duration: 1.0, ease: 'expo.out', delay: 0.1,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 73%', toggleActions: 'play none none none' },
                }
            )

            // Subtitle
            gsap.fromTo('.specs .section-subtitle', { opacity: 0, y: 26 }, {
                opacity: 1, y: 0, duration: 0.85, ease: 'expo.out', delay: 0.3,
                scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none none' },
            })

            // Spec items entrance
            gsap.fromTo('.specs__item', { opacity: 0, y: 22, scale: 0.96 }, {
                opacity: 1, y: 0, scale: 1,
                stagger: 0.08, duration: 0.7, ease: 'expo.out', delay: 0.45,
                scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', toggleActions: 'play none none none' },
            })

            // Glowing aura pulse on image
            gsap.to('.specs__aura', {
                opacity: 0.55, scale: 1.12,
                duration: 2.4, ease: 'sine.inOut',
                yoyo: true, repeat: -1,
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section className="specs" id="specs-section" ref={sectionRef}>
            <div className="specs__inner">
                {/* Image column with parallax + aura glow */}
                <div className="specs__image-col">
                    <div className="specs__img-wrap">
                        <div className="specs__aura" />
                        <motion.img
                            ref={imgRef}
                            src="/assets/processor.png"
                            alt="Horizon XR Dual-Chip Processor"
                            className="specs__processor-img"
                            style={{ y: imgY, scale: imgScale }}
                        />
                    </div>
                </div>

                {/* Content column */}
                <div className="specs__content-col">
                    <span className="section-eyebrow">Performance</span>
                    <h2 className="section-title" ref={titleRef}>
                        <span className="specs__title-line">Power that</span>
                        <span className="specs__title-line">defies physics.</span>
                    </h2>
                    <p className="section-subtitle">
                        Dual-chip architecture delivers desktop-class performance in a wearable form factor.
                        NeuroVision AI Core and XR Motion Engine work in tandem.
                    </p>

                    <div className="specs__grid">
                        {specs.map((s, i) => (
                            <motion.div
                                key={s.label}
                                className="specs__item"
                                whileHover={{
                                    background: 'rgba(255,255,255,0.055)',
                                    transition: { duration: 0.2 },
                                }}
                                style={{ transitionDelay: `${0.3 + i * 0.06}s` }}
                            >
                                <AnimatedNumber
                                    numeric={s.numeric}
                                    suffix={s.suffix}
                                    prefix={s.prefix}
                                    label={s.label}
                                />
                                <div className="specs__item-label">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
