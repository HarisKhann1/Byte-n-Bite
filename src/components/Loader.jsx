import React from 'react'
import './loader.css'
export default function Loader(props) {
    
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="loading-wave">
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
            </div>
        </div>
    )
}
