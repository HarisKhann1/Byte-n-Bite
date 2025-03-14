import React from 'react'
import { HeroSection, Category, FreinedsSection, FAQs, Loader } from '../components/index'

export default function Home(props) {
    
    return (
        <main>
            <HeroSection />
            <Category />
            <FreinedsSection />
            <FAQs />
        </main>
    )
}
