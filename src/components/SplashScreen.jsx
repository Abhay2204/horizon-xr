import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true)
    const videoRef = useRef(null)

    const handleVideoEnd = () => {
        setIsVisible(false)
        // Give the fade-out animation time to complete before unmounting/triggering completion
        setTimeout(() => {
            if (onComplete) onComplete()
        }, 800)
    }

    useEffect(() => {
        // Skip splash screen entirely on mobile view
        if (window.innerWidth < 768) {
            handleVideoEnd()
            return;
        }

        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.warn("Autoplay was prevented:", error)
            })
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                >
                    <video
                        ref={videoRef}
                        className="splash__video"
                        src="/assets/splash.mp4"
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                    />
                    <button className="splash__skip" onClick={handleVideoEnd}>
                        Skip
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
