import React, { useMemo } from 'react'
import useScrollCanvas from '../hooks/useScrollCanvas'
import './ProductFeaturesSection.css'

export default function ProductFeaturesSection() {
    const { canvasRef, progress, currentFrame, isLoaded } = useScrollCanvas({
        folder: '/assets/product features',
        frameCount: 55,
        startIndex: 23,   // starts at ezgif-frame-024.jpg
        prefix: 'ezgif-frame-',
        extension: '.jpg',
        padLength: 3,
    })

    // Frames 1–78:
    // 0–0.15: Fade in title "Look closer."
    // 0.15–0.45: Title fades out, feature callout 1 fades in (left)
    // 0.45–0.75: Feature callout 2 fades in (right)
    // 0.75–1.0: All text fades out — product dominates

    const titleOpacity = useMemo(() => {
        if (progress < 0.04) return progress / 0.04
        if (progress < 0.14) return 1
        if (progress < 0.22) return 1 - (progress - 0.14) / 0.08
        return 0
    }, [progress])

    const feat1Opacity = useMemo(() => {
        if (progress < 0.18) return 0
        if (progress < 0.28) return (progress - 0.18) / 0.10
        if (progress < 0.44) return 1
        if (progress < 0.54) return 1 - (progress - 0.44) / 0.10
        return 0
    }, [progress])

    const feat1Y = useMemo(() => {
        if (progress < 0.18) return 40
        if (progress < 0.28) return 40 * (1 - (progress - 0.18) / 0.10)
        if (progress < 0.44) return 0
        if (progress < 0.54) return -30 * ((progress - 0.44) / 0.10)
        return -30
    }, [progress])

    const feat2Opacity = useMemo(() => {
        if (progress < 0.50) return 0
        if (progress < 0.60) return (progress - 0.50) / 0.10
        if (progress < 0.74) return 1
        if (progress < 0.84) return 1 - (progress - 0.74) / 0.10
        return 0
    }, [progress])

    const feat2Y = useMemo(() => {
        if (progress < 0.50) return 40
        if (progress < 0.60) return 40 * (1 - (progress - 0.50) / 0.10)
        if (progress < 0.74) return 0
        if (progress < 0.84) return -30 * ((progress - 0.74) / 0.10)
        return -30
    }, [progress])

    return (
        <section className="pf" id="product-features-section" data-scroll-container>
            {/* Sticky canvas */}
            <div className="pf__canvas-wrapper">
                <canvas ref={canvasRef} className="pf__canvas" />
                {!isLoaded && (
                    <div className="pf__loader">
                        <div className="pf__spinner" />
                    </div>
                )}
            </div>



            {/* Phase 1: First feature callout */}
            <div
                className="pf__overlay pf__overlay--split"
                style={{ opacity: feat1Opacity, pointerEvents: 'none' }}
            >
                <div
                    className="pf__callout pf__callout--left"
                    style={{ transform: `translateY(${feat1Y}px)` }}
                >
                    <div className="pf__callout-line" />
                    <span className="pf__callout-label">Ultra-Wide Curved Display</span>
                    <p className="pf__callout-desc">
                        Dual micro-OLED panels.<br />
                        3,660 × 3,200 px per eye.<br />
                        5,000 nits peak brightness.
                    </p>
                </div>
                <div
                    className="pf__callout pf__callout--right"
                    style={{ transform: `translateY(${feat1Y}px)` }}
                >
                    <div className="pf__callout-line" />
                    <span className="pf__callout-label">Precision Fit Dial</span>
                    <p className="pf__callout-desc">
                        Titanium construction.<br />
                        Infinite micro-adjustment.<br />
                        For the perfect fit.
                    </p>
                </div>
            </div>


        </section>
    )
}
