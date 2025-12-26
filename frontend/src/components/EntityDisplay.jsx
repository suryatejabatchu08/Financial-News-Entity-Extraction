const ENTITY_COLORS = {
    // Light mode colors
    light: {
        PERSON: 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
        PER: 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
        ORG: 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200',
        GPE: 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200',
        MONEY: 'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200',
        DATE: 'bg-pink-100 text-pink-700 border-pink-300 hover:bg-pink-200',
        PERCENT: 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200',
        PRODUCT: 'bg-cyan-100 text-cyan-700 border-cyan-300 hover:bg-cyan-200',
        EVENT: 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200',
        LOC: 'bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200',
        NORP: 'bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200',
        TICKER: 'bg-violet-100 text-violet-700 border-violet-300 hover:bg-violet-200',
        INDICATOR: 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200',
        ROLE: 'bg-sky-100 text-sky-700 border-sky-300 hover:bg-sky-200',
    },
    // Dark mode colors
    dark: {
        PERSON: 'bg-blue-500/20 text-blue-300 border-blue-500/50 hover:bg-blue-500/30',
        PER: 'bg-blue-500/20 text-blue-300 border-blue-500/50 hover:bg-blue-500/30',
        ORG: 'bg-purple-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30',
        GPE: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30',
        MONEY: 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30',
        DATE: 'bg-pink-500/20 text-pink-300 border-pink-500/50 hover:bg-pink-500/30',
        PERCENT: 'bg-orange-500/20 text-orange-300 border-orange-500/50 hover:bg-orange-500/30',
        PRODUCT: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/30',
        EVENT: 'bg-red-500/20 text-red-300 border-red-500/50 hover:bg-red-500/30',
        LOC: 'bg-teal-500/20 text-teal-300 border-teal-500/50 hover:bg-teal-500/30',
        NORP: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 hover:bg-indigo-500/30',
        TICKER: 'bg-violet-500/20 text-violet-300 border-violet-500/50 hover:bg-violet-500/30',
        INDICATOR: 'bg-rose-500/20 text-rose-300 border-rose-500/50 hover:bg-rose-500/30',
        ROLE: 'bg-sky-500/20 text-sky-300 border-sky-500/50 hover:bg-sky-500/30',
    }
}

const ENTITY_ICONS = {
    PERSON: '👤',
    PER: '👤',
    ORG: '🏢',
    GPE: '🌍',
    MONEY: '💰',
    DATE: '📅',
    PERCENT: '📊',
    PRODUCT: '📦',
    EVENT: '🎯',
    LOC: '📍',
    NORP: '👥',
    TICKER: '📈',
    INDICATOR: '📉',
    ROLE: '💼',
}

const ENTITY_DESCRIPTIONS = {
    PERSON: 'Person',
    PER: 'Person',
    ORG: 'Organization',
    GPE: 'Geo-Political Entity',
    MONEY: 'Monetary Value',
    DATE: 'Date/Time',
    PERCENT: 'Percentage',
    PRODUCT: 'Product',
    EVENT: 'Event',
    LOC: 'Location',
    NORP: 'Nationality/Group',
    TICKER: 'Stock Ticker',
    INDICATOR: 'Economic Indicator',
    ROLE: 'Job Role/Title',
}

function EntityDisplay({ entities, text, darkMode }) {
    const colors = darkMode ? ENTITY_COLORS.dark : ENTITY_COLORS.light

    if (!entities || entities.length === 0) {
        return (
            <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${
                darkMode 
                    ? 'border-slate-700 bg-slate-800/30' 
                    : 'border-slate-200 bg-slate-50/50'
            }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    darkMode ? 'bg-slate-700/50' : 'bg-slate-100'
                }`}>
                    <span className="text-3xl">🔍</span>
                </div>
                <p className={`text-lg font-medium ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                    No entities detected
                </p>
                <p className={`text-sm mt-1 ${
                    darkMode ? 'text-slate-500' : 'text-slate-400'
                }`}>
                    Try entering some financial news text
                </p>
            </div>
        )
    }

    // Group entities by label
    const groupedEntities = entities.reduce((acc, entity) => {
        if (!acc[entity.label]) {
            acc[entity.label] = []
        }
        acc[entity.label].push(entity)
        return acc
    }, {})

    return (
        <div className="space-y-6">
            {/* Highlighted Text */}
            <div className={`rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                darkMode 
                    ? 'bg-slate-800/50 border border-slate-700/50 backdrop-blur-xl' 
                    : 'bg-white/80 border border-slate-200/80 backdrop-blur-xl shadow-xl shadow-slate-200/50'
            }`}>
                <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2 rounded-xl ${
                        darkMode 
                            ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
                            : 'bg-gradient-to-br from-blue-100 to-purple-100'
                    }`}>
                        <span className="text-xl">📝</span>
                    </div>
                    <h3 className={`text-lg font-bold ${
                        darkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                        Annotated Text
                    </h3>
                </div>
                <div className={`leading-relaxed text-base md:text-lg p-4 rounded-xl ${
                    darkMode 
                        ? 'bg-slate-900/50 text-slate-200' 
                        : 'bg-slate-50/80 text-slate-700'
                }`}>
                    {renderHighlightedText(text, entities, colors, darkMode)}
                </div>
            </div>

            {/* Entity Groups */}
            <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(groupedEntities).map(([label, labelEntities], groupIdx) => (
                    <div
                        key={label}
                        className={`rounded-2xl p-6 transition-all duration-500 card-hover animate-fade-in-up ${
                            darkMode 
                                ? 'bg-slate-800/50 border border-slate-700/50 backdrop-blur-xl' 
                                : 'bg-white/80 border border-slate-200/80 backdrop-blur-xl shadow-lg shadow-slate-200/50'
                        }`}
                        style={{ animationDelay: `${groupIdx * 0.1}s` }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2.5 rounded-xl text-xl ${
                                darkMode 
                                    ? 'bg-slate-700/50' 
                                    : 'bg-slate-100'
                            }`}>
                                {ENTITY_ICONS[label] || '🏷️'}
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold ${
                                    darkMode ? 'text-white' : 'text-slate-800'
                                }`}>
                                    {ENTITY_DESCRIPTIONS[label] || label}
                                </h3>
                                <p className={`text-sm ${
                                    darkMode ? 'text-slate-400' : 'text-slate-500'
                                }`}>
                                    {labelEntities.length} found
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {labelEntities.map((entity, idx) => (
                                <span
                                    key={idx}
                                    className={`px-3 py-1.5 rounded-xl border font-medium text-sm transition-all duration-300 cursor-default entity-tag ${
                                        colors[label] || (darkMode 
                                            ? 'bg-slate-500/20 text-slate-300 border-slate-500/50 hover:bg-slate-500/30' 
                                            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200')
                                    }`}
                                    style={{ animationDelay: `${(groupIdx * 0.1) + (idx * 0.05)}s` }}
                                >
                                    {entity.text}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Stats */}
            <div className={`rounded-2xl p-6 ${
                darkMode 
                    ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-slate-700/50' 
                    : 'bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 border border-slate-200/80'
            }`}>
                <div className="flex flex-wrap justify-center gap-8">
                    <div className="text-center">
                        <p className={`text-3xl font-bold gradient-text`}>
                            {entities.length}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Total Entities
                        </p>
                    </div>
                    <div className="text-center">
                        <p className={`text-3xl font-bold gradient-text`}>
                            {Object.keys(groupedEntities).length}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Entity Types
                        </p>
                    </div>
                    <div className="text-center">
                        <p className={`text-3xl font-bold gradient-text`}>
                            {text.split(/\s+/).length}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Words Analyzed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderHighlightedText(text, entities, colors, darkMode) {
    if (!text || !entities || entities.length === 0) return text

    // Sort entities by start position
    const sortedEntities = [...entities].sort((a, b) => a.start - b.start)

    const parts = []
    let lastIndex = 0

    sortedEntities.forEach((entity, idx) => {
        // Add text before entity
        if (entity.start > lastIndex) {
            parts.push(
                <span key={`text-${idx}`}>{text.slice(lastIndex, entity.start)}</span>
            )
        }

        // Add highlighted entity
        const colorClass = colors[entity.label] || (darkMode 
            ? 'bg-slate-500/20 text-slate-300 border-slate-500/50' 
            : 'bg-slate-100 text-slate-700 border-slate-300')
        
        parts.push(
            <span
                key={`entity-${idx}`}
                className={`${colorClass} px-2 py-0.5 rounded-lg border font-semibold transition-all duration-300 cursor-default entity-tag inline-block mx-0.5`}
                title={`${ENTITY_DESCRIPTIONS[entity.label] || entity.label}: ${entity.text}`}
            >
                <span className="mr-1">{ENTITY_ICONS[entity.label] || '🏷️'}</span>
                {entity.text}
            </span>
        )

        lastIndex = entity.end
    })

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(
            <span key="text-end">{text.slice(lastIndex)}</span>
        )
    }

    return parts
}

export default EntityDisplay
