import React from 'react'
import { HeroSection, WeekMenu, FreinedsSection, FAQs, Loader } from '../components/index'

export default function Home(props) {
    
    return (
        <main>
            <HeroSection />
            <WeekMenu />
            <FreinedsSection />
            <FAQs />
        </main>
    )
}
