import React, { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ProductFeaturesSection from './components/ProductFeaturesSection'
import ImmersionOSSection from './components/ImmersionOSSection'
import FeelItSection from './components/FeelItSection'
import ControllerSection from './components/ControllerSection'
import SpecsSection from './components/SpecsSection'
import TestimonialsSection from './components/TestimonialsSection'
import BuySection from './components/BuySection'
import Footer from './components/Footer'
import './App.css'

function App() {
    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        if (showSplash) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            // Ensure we start at the top once the splash screen finishes
            window.scrollTo(0, 0)
        }
    }, [showSplash])

    return (
        <div className="app">
            {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <ProductFeaturesSection />
            <ImmersionOSSection />
            <FeelItSection />
            <ControllerSection />
            <SpecsSection />
            <BuySection />
            <TestimonialsSection />
            <Footer />
        </div>
    )
}

export default App
