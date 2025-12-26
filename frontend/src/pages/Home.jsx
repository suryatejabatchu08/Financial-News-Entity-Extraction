import { useState } from 'react'
import axios from 'axios'
import { Sparkles, Loader2, AlertCircle, Upload, FileText, Zap, Brain, Target, ChevronRight } from 'lucide-react'
import EntityDisplay from '../components/EntityDisplay'

const SAMPLE_TEXT = "Apple Inc. announced a $50 million acquisition of TechStart on Monday. The deal was finalized in New York and will be completed by December 2024. CEO Tim Cook stated that this represents 15% of their annual investment budget."

function Home({ darkMode }) {
    const [text, setText] = useState('')
    const [entities, setEntities] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [activeEndpoint, setActiveEndpoint] = useState(null)

    // Check which endpoint is available
    const checkEndpointHealth = async (url) => {
        try {
            await axios.get(url.replace('/predict', '/health').replace('/extract', '/health'), {
                timeout: 3000
            })
            return true
        } catch {
            return false
        }
    }

    const handleExtract = async () => {
        if (!text.trim()) {
            setError('Please enter some text to analyze')
            return
        }

        setLoading(true)
        setError(null)

        const PRIMARY_ENDPOINT = 'https://suryateja008-financial-news-entity-extraction.hf.space/predict'
        const FALLBACK_ENDPOINT = 'http://127.0.0.1:8000/extract'

        // Determine which endpoint to use
        let endpoint = PRIMARY_ENDPOINT
        
        if (!activeEndpoint) {
            const primaryHealthy = await checkEndpointHealth(PRIMARY_ENDPOINT)
            if (primaryHealthy) {
                endpoint = PRIMARY_ENDPOINT
                setActiveEndpoint('primary')
                console.log('🌐 Using cloud endpoint')
            } else {
                const fallbackHealthy = await checkEndpointHealth(FALLBACK_ENDPOINT)
                if (fallbackHealthy) {
                    endpoint = FALLBACK_ENDPOINT
                    setActiveEndpoint('fallback')
                    console.log('💻 Using local endpoint')
                }
            }
        } else if (activeEndpoint === 'fallback') {
            endpoint = FALLBACK_ENDPOINT
        }

        try {
            const response = await axios.post(endpoint, { text })
            setEntities(response.data.entities)
        } catch (err) {
            // If current endpoint fails, try the other one
            const alternateEndpoint = endpoint === PRIMARY_ENDPOINT ? FALLBACK_ENDPOINT : PRIMARY_ENDPOINT
            
            try {
                console.log('Trying alternate endpoint...')
                const response = await axios.post(alternateEndpoint, { text })
                setEntities(response.data.entities)
                setActiveEndpoint(endpoint === PRIMARY_ENDPOINT ? 'fallback' : 'primary')
            } catch (fallbackErr) {
                setError('Failed to extract entities. Please check your connection and backend status.')
                console.error('Both endpoints failed')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleUseSample = () => {
        setText(SAMPLE_TEXT)
        setEntities(null)
        setError(null)
        setFileName(null)
    }

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (e) => {
                const content = e.target.result

                // Handle CSV files - extract text from first column or all text
                if (file.name.endsWith('.csv')) {
                    // Simple CSV parsing - join all text content
                    const lines = content.split('\n')
                    const textContent = lines
                        .map(line => line.trim())
                        .filter(line => line.length > 0)
                        .join(' ')
                    resolve(textContent)
                } else {
                    // Handle TXT files - use content as-is
                    resolve(content)
                }
            }

            reader.onerror = () => reject(new Error('Failed to read file'))
            reader.readAsText(file)
        })
    }

    const handleFileUpload = async (file) => {
        if (!file) return

        // Validate file type
        const validExtensions = ['.txt', '.csv']
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()

        if (!validExtensions.includes(fileExtension)) {
            setError('Please upload a .txt or .csv file')
            return
        }

        setError(null)
        setFileName(file.name)

        try {
            const content = await readFileContent(file)
            setText(content)
            setEntities(null) // Clear previous results
        } catch (err) {
            setError('Failed to read file. Please try again.')
            console.error('File reading error:', err)
        }
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileUpload(file)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        const file = e.dataTransfer.files?.[0]
        if (file) {
            handleFileUpload(file)
        }
    }

    const features = [
        { icon: Brain, title: 'AI-Powered', desc: 'Advanced NLP models' },
        { icon: Zap, title: 'Lightning Fast', desc: 'Real-time extraction' },
        { icon: Target, title: 'High Accuracy', desc: '95%+ precision' },
    ]

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className={`block ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        Financial News
                    </span>
                    <span className="gradient-text block mt-2">
                        Entity Extraction
                    </span>
                </h1>
                
                <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                    Transform unstructured financial text into actionable insights.
                    Identify <span className="font-semibold text-blue-500">companies</span>,{' '}
                    <span className="font-semibold text-purple-500">people</span>,{' '}
                    <span className="font-semibold text-emerald-500">monetary values</span>, and more with precision.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx}
                            className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-105 card-hover ${
                                darkMode 
                                    ? 'bg-slate-800/50 border border-slate-700/50' 
                                    : 'bg-white/80 border border-slate-200/80 shadow-lg shadow-slate-200/50'
                            }`}
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className={`p-2 rounded-lg ${
                                darkMode 
                                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
                                    : 'bg-gradient-to-br from-blue-100 to-purple-100'
                            }`}>
                                <feature.icon className={`w-5 h-5 ${
                                    darkMode ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                            </div>
                            <div className="text-left">
                                <p className={`font-semibold text-sm ${
                                    darkMode ? 'text-white' : 'text-slate-800'
                                }`}>{feature.title}</p>
                                <p className={`text-xs ${
                                    darkMode ? 'text-slate-400' : 'text-slate-500'
                                }`}>{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Input Section */}
            <div className={`rounded-3xl p-6 md:p-8 mb-8 transition-all duration-500 card-hover ${
                darkMode 
                    ? 'bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-slate-900/50' 
                    : 'bg-white/80 border border-slate-200/80 backdrop-blur-xl shadow-2xl shadow-slate-200/50'
            }`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${
                            darkMode 
                                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
                                : 'bg-gradient-to-br from-blue-100 to-purple-100'
                        }`}>
                            <FileText className={`w-5 h-5 ${
                                darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`} />
                        </div>
                        <div>
                            <h2 className={`text-lg font-bold ${
                                darkMode ? 'text-white' : 'text-slate-800'
                            }`}>
                                Enter Financial News Text
                            </h2>
                            <p className={`text-sm ${
                                darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                                Paste text or upload a file
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleUseSample}
                        className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                            darkMode 
                                ? 'text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20' 
                                : 'text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100'
                        }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        Try Sample
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* File Upload Area */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`mb-6 border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                        isDragging
                            ? darkMode 
                                ? 'border-blue-400 bg-blue-500/10 scale-[1.02]' 
                                : 'border-blue-500 bg-blue-50 scale-[1.02]'
                            : darkMode 
                                ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/30' 
                                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className={`p-4 rounded-2xl transition-all duration-300 ${
                            isDragging 
                                ? 'bg-blue-500/20 scale-110' 
                                : darkMode 
                                    ? 'bg-slate-700/50' 
                                    : 'bg-slate-100'
                        }`}>
                            <Upload className={`w-8 h-8 transition-colors ${
                                isDragging 
                                    ? 'text-blue-400' 
                                    : darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`} />
                        </div>
                        <div className="text-center">
                            <p className={`font-medium mb-1 ${
                                darkMode ? 'text-slate-200' : 'text-slate-700'
                            }`}>
                                Drop your file here or{' '}
                                <label className={`cursor-pointer underline underline-offset-2 transition-colors ${
                                    darkMode 
                                        ? 'text-blue-400 hover:text-blue-300' 
                                        : 'text-blue-600 hover:text-blue-700'
                                }`}>
                                    browse
                                    <input
                                        type="file"
                                        accept=".txt,.csv"
                                        onChange={handleFileInputChange}
                                        className="hidden"
                                    />
                                </label>
                            </p>
                            <p className={`text-sm ${
                                darkMode ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                                Supports TXT and CSV files
                            </p>
                        </div>
                        {fileName && (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl animate-scale-in ${
                                darkMode 
                                    ? 'bg-emerald-500/20 border border-emerald-500/30' 
                                    : 'bg-emerald-50 border border-emerald-200'
                            }`}>
                                <FileText className={`w-4 h-4 ${
                                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                                }`} />
                                <span className={`text-sm font-medium ${
                                    darkMode ? 'text-emerald-300' : 'text-emerald-700'
                                }`}>{fileName}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Textarea */}
                <div className="relative">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your financial news article here or upload a file..."
                        className={`w-full h-48 rounded-2xl p-5 border-2 transition-all duration-300 resize-none input-premium ${
                            darkMode 
                                ? 'bg-slate-900/50 text-white border-slate-700/50 focus:border-blue-500/50 placeholder-slate-500' 
                                : 'bg-slate-50/50 text-slate-800 border-slate-200 focus:border-blue-400 placeholder-slate-400'
                        } focus:outline-none focus:ring-4 ${
                            darkMode ? 'focus:ring-blue-500/20' : 'focus:ring-blue-200'
                        }`}
                    />
                    
                    {/* Character count */}
                    <div className={`absolute bottom-4 right-4 text-xs font-medium ${
                        darkMode ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                        {text.length} characters
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className={`mt-4 rounded-xl p-4 flex items-start gap-3 animate-slide-down ${
                        darkMode 
                            ? 'bg-red-500/10 border border-red-500/30' 
                            : 'bg-red-50 border border-red-200'
                    }`}>
                        <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            darkMode ? 'text-red-400' : 'text-red-500'
                        }`} />
                        <p className={`text-sm ${
                            darkMode ? 'text-red-300' : 'text-red-600'
                        }`}>{error}</p>
                    </div>
                )}

                {/* Extract Button */}
                <button
                    onClick={handleExtract}
                    disabled={loading || !text.trim()}
                    className={`mt-6 w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 btn-primary ${
                        loading || !text.trim()
                            ? darkMode 
                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:shadow-2xl hover:shadow-blue-500/30'
                    }`}
                    style={{ backgroundSize: '200% auto' }}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Extracting Entities...</span>
                            <div className="flex gap-1 ml-2">
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6" />
                            Extract Entities
                            <ChevronRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>

            {/* Results Section */}
            {entities && (
                <div className="animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`p-2.5 rounded-xl ${
                            darkMode 
                                ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20' 
                                : 'bg-gradient-to-br from-emerald-100 to-cyan-100'
                        }`}>
                            <Target className={`w-5 h-5 ${
                                darkMode ? 'text-emerald-400' : 'text-emerald-600'
                            }`} />
                        </div>
                        <div>
                            <h2 className={`text-2xl font-bold ${
                                darkMode ? 'text-white' : 'text-slate-800'
                            }`}>
                                Extracted Entities
                            </h2>
                            <p className={`text-sm ${
                                darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                                {entities.length} entities found
                            </p>
                        </div>
                    </div>
                    <EntityDisplay entities={entities} text={text} darkMode={darkMode} />
                </div>
            )}

        </div>
    )
}

export default Home
