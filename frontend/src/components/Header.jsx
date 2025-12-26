import { Link } from 'react-router-dom'
import { TrendingUp, Sun, Moon, Sparkles } from 'lucide-react'

function Header({ darkMode, toggleDarkMode }) {
    return (
        <header className={`sticky top-0 z-50 transition-all duration-500 ${
            darkMode 
                ? 'bg-slate-900/70 border-slate-700/50' 
                : 'bg-white/70 border-slate-200/50'
        } backdrop-blur-xl border-b`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        {/* Animated Logo */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow" />
                            <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-2.5 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className={`text-xl font-bold transition-colors ${
                                darkMode ? 'text-white' : 'text-slate-800'
                            }`}>
                                <span className="gradient-text">Financial NER</span>
                            </h1>
                            <p className={`text-xs transition-colors flex items-center gap-1 ${
                                darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                                <Sparkles className="w-3 h-3" />
                                AI-Powered Entity Extraction
                            </p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <nav className="flex gap-6">
                            <Link
                                to="/"
                                className={`font-medium transition-all duration-300 hover:scale-105 ${
                                    darkMode 
                                        ? 'text-slate-300 hover:text-white' 
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Extract
                            </Link>
                        </nav>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className={`relative p-2.5 rounded-xl transition-all duration-500 group ${
                                darkMode 
                                    ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' 
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                            aria-label="Toggle dark mode"
                        >
                            <div className="relative w-5 h-5">
                                <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                                    darkMode 
                                        ? 'opacity-100 rotate-0 scale-100' 
                                        : 'opacity-0 rotate-90 scale-50'
                                }`} />
                                <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                                    darkMode 
                                        ? 'opacity-0 -rotate-90 scale-50' 
                                        : 'opacity-100 rotate-0 scale-100'
                                }`} />
                            </div>
                            
                            {/* Glow effect on hover */}
                            <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                                darkMode 
                                    ? 'bg-yellow-400/20' 
                                    : 'bg-blue-400/20'
                            }`} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
