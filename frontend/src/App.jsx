import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        // Check for saved preference or system preference
        const savedMode = localStorage.getItem('darkMode')
        if (savedMode !== null) {
            setDarkMode(savedMode === 'true')
        }
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <Router>
            <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
                darkMode 
                    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
                    : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
            }`}>
                {/* Animated Background Orbs */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className={`orb orb-1 -top-40 -left-40 ${darkMode ? 'opacity-30' : 'opacity-20'}`}></div>
                    <div className={`orb orb-2 top-1/3 -right-40 ${darkMode ? 'opacity-25' : 'opacity-15'}`}></div>
                    <div className={`orb orb-3 -bottom-40 left-1/3 ${darkMode ? 'opacity-20' : 'opacity-10'}`}></div>
                </div>
                
                {/* Grid Pattern Overlay */}
                <div className={`fixed inset-0 pointer-events-none ${darkMode ? 'opacity-[0.02]' : 'opacity-[0.03]'}`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    <Routes>
                        <Route path="/" element={<Home darkMode={darkMode} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
