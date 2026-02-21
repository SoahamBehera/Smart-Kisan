'use client';

import React, { useState, useRef, useEffect } from 'react';
import SectionWrapper from '@/components/common/SectionWrapper';
import Card from '@/components/common/Card';
import { Layers, Droplet, Search, BarChart3, Bot, X, Send } from 'lucide-react';

/* ─── Static data ───────────────────────────────────────────── */
const solutions = [
    { id: 'soil', title: 'Soil Health Management', icon: <Layers size={40} />, desc: 'Get precise NPK sensors data and recover soil fertility with tailored fertilizer recommendations.' },
    { id: 'irrigation', title: 'Smart Irrigation', icon: <Droplet size={40} />, desc: 'Monitor soil moisture at root zones and automate irrigation to save water and improve yield.' },
    { id: 'disease', title: 'Crop Disease Diagnosis', icon: <Search size={40} />, desc: 'Early warning system for blights and rusts using computer vision and local weather patterns.' },
    { id: 'market', title: 'Market Intelligence', icon: <BarChart3 size={40} />, desc: 'Forecast prices and find the best mandis to sell your produce for maximum profit.' },
    { id: 'ai', title: 'AI Advisory', icon: <Bot size={40} />, desc: 'Your personal agri-expert available 24/7 in Hindi, English and regional languages.' },
];

const CLICKABLE = ['soil', 'irrigation', 'disease', 'market', 'ai'];

const soilInsights = [
    { label: 'Your N (72.0) is high. Ideal is ~40.1.', type: 'manage', color: '#fce4ec' },
    { label: 'Your P (33.0) is low. Ideal is ~67.8.', type: 'fix', color: '#fff8e1' },
    { label: 'Your K (100.0) is high. Ideal is ~79.9.', type: 'manage', color: '#fce4ec' },
    { label: 'Your humidity (50.0) is high. Ideal is ~16.9.', type: 'manage', color: '#fce4ec' },
    { label: 'Your ph (3.5) is low. Ideal is ~7.3.', type: 'fix', color: '#fff8e1' },
    { label: 'Your rainfall (100.0) is high. Ideal is ~80.1.', type: 'manage', color: '#fce4ec' },
];
const barData = [
    { label: 'N', value: 72, ideal: 40, max: 100 },
    { label: 'P', value: 33, ideal: 67.8, max: 100 },
    { label: 'K', value: 100, ideal: 79.9, max: 100 },
];

const CROPS = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Sugarcane', 'Tomato', 'Potato'];
const STATES = ['Punjab', 'Haryana', 'UP', 'MP', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Bihar'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const SOIL_TYPES = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Peat', 'Chalky', 'Clay-Loam'];

type DayForecast = { day: string; icon: string; hi: number; lo: number; rain: string };
type StateWeather = { forecast: DayForecast[]; moisture: string; temp: string; humidity: string; season: string };

const STATE_WEATHER: Record<string, StateWeather> = {
    Punjab: {
        forecast: [
            { day: 'Mon', icon: '☀️', hi: 34, lo: 22, rain: '0%' },
            { day: 'Tue', icon: '☀️', hi: 35, lo: 23, rain: '5%' },
            { day: 'Wed', icon: '⛅', hi: 32, lo: 21, rain: '15%' },
            { day: 'Thu', icon: '🌦️', hi: 29, lo: 19, rain: '45%' },
            { day: 'Fri', icon: '🌧️', hi: 27, lo: 18, rain: '75%' },
            { day: 'Sat', icon: '⛅', hi: 30, lo: 20, rain: '20%' },
            { day: 'Sun', icon: '☀️', hi: 33, lo: 21, rain: '5%' },
        ],
        moisture: '38%', temp: '34°C', humidity: '55%', season: 'Semi-arid — moderate irrigation needed',
    },
    Haryana: {
        forecast: [
            { day: 'Mon', icon: '☀️', hi: 36, lo: 23, rain: '0%' },
            { day: 'Tue', icon: '☀️', hi: 37, lo: 24, rain: '0%' },
            { day: 'Wed', icon: '⛅', hi: 34, lo: 22, rain: '10%' },
            { day: 'Thu', icon: '🌦️', hi: 30, lo: 20, rain: '40%' },
            { day: 'Fri', icon: '🌧️', hi: 28, lo: 19, rain: '70%' },
            { day: 'Sat', icon: '☀️', hi: 32, lo: 21, rain: '5%' },
            { day: 'Sun', icon: '☀️', hi: 35, lo: 23, rain: '0%' },
        ],
        moisture: '35%', temp: '36°C', humidity: '48%', season: 'Hot & dry — irrigation critical',
    },
    UP: {
        forecast: [
            { day: 'Mon', icon: '⛅', hi: 31, lo: 20, rain: '20%' },
            { day: 'Tue', icon: '🌦️', hi: 29, lo: 19, rain: '50%' },
            { day: 'Wed', icon: '🌧️', hi: 27, lo: 18, rain: '85%' },
            { day: 'Thu', icon: '🌧️', hi: 26, lo: 17, rain: '80%' },
            { day: 'Fri', icon: '⛅', hi: 28, lo: 18, rain: '30%' },
            { day: 'Sat', icon: '☀️', hi: 30, lo: 19, rain: '10%' },
            { day: 'Sun', icon: '☀️', hi: 32, lo: 21, rain: '5%' },
        ],
        moisture: '55%', temp: '29°C', humidity: '72%', season: 'Monsoon-influenced — reduce irrigation',
    },
    MP: {
        forecast: [
            { day: 'Mon', icon: '🌧️', hi: 28, lo: 20, rain: '70%' },
            { day: 'Tue', icon: '🌧️', hi: 27, lo: 19, rain: '80%' },
            { day: 'Wed', icon: '⛅', hi: 29, lo: 20, rain: '30%' },
            { day: 'Thu', icon: '☀️', hi: 31, lo: 21, rain: '10%' },
            { day: 'Fri', icon: '☀️', hi: 32, lo: 22, rain: '5%' },
            { day: 'Sat', icon: '⛅', hi: 30, lo: 21, rain: '25%' },
            { day: 'Sun', icon: '🌦️', hi: 28, lo: 19, rain: '55%' },
        ],
        moisture: '60%', temp: '28°C', humidity: '78%', season: 'Heavy monsoon — skip irrigations this week',
    },
    Maharashtra: {
        forecast: [
            { day: 'Mon', icon: '☀️', hi: 33, lo: 24, rain: '5%' },
            { day: 'Tue', icon: '⛅', hi: 31, lo: 23, rain: '20%' },
            { day: 'Wed', icon: '🌦️', hi: 29, lo: 22, rain: '55%' },
            { day: 'Thu', icon: '🌧️', hi: 27, lo: 21, rain: '75%' },
            { day: 'Fri', icon: '⛅', hi: 30, lo: 22, rain: '25%' },
            { day: 'Sat', icon: '☀️', hi: 32, lo: 23, rain: '10%' },
            { day: 'Sun', icon: '☀️', hi: 34, lo: 24, rain: '0%' },
        ],
        moisture: '48%', temp: '33°C', humidity: '65%', season: 'Coastal influence — moderate humidity',
    },
    Rajasthan: {
        forecast: [
            { day: 'Mon', icon: '☀️', hi: 40, lo: 27, rain: '0%' },
            { day: 'Tue', icon: '☀️', hi: 41, lo: 28, rain: '0%' },
            { day: 'Wed', icon: '☀️', hi: 42, lo: 29, rain: '0%' },
            { day: 'Thu', icon: '⛅', hi: 39, lo: 27, rain: '5%' },
            { day: 'Fri', icon: '☀️', hi: 40, lo: 28, rain: '0%' },
            { day: 'Sat', icon: '☀️', hi: 41, lo: 28, rain: '0%' },
            { day: 'Sun', icon: '⛅', hi: 38, lo: 26, rain: '10%' },
        ],
        moisture: '18%', temp: '40°C', humidity: '28%', season: 'Arid desert — heavy frequent irrigation essential',
    },
    Karnataka: {
        forecast: [
            { day: 'Mon', icon: '⛅', hi: 30, lo: 21, rain: '25%' },
            { day: 'Tue', icon: '🌦️', hi: 28, lo: 20, rain: '60%' },
            { day: 'Wed', icon: '🌧️', hi: 26, lo: 19, rain: '80%' },
            { day: 'Thu', icon: '⛅', hi: 28, lo: 20, rain: '30%' },
            { day: 'Fri', icon: '☀️', hi: 30, lo: 21, rain: '10%' },
            { day: 'Sat', icon: '⛅', hi: 29, lo: 20, rain: '35%' },
            { day: 'Sun', icon: '🌦️', hi: 27, lo: 19, rain: '65%' },
        ],
        moisture: '52%', temp: '30°C', humidity: '70%', season: 'SW Monsoon active — monitor waterlogging',
    },
    Bihar: {
        forecast: [
            { day: 'Mon', icon: '🌧️', hi: 30, lo: 22, rain: '65%' },
            { day: 'Tue', icon: '🌧️', hi: 29, lo: 21, rain: '75%' },
            { day: 'Wed', icon: '🌦️', hi: 31, lo: 22, rain: '40%' },
            { day: 'Thu', icon: '⛅', hi: 32, lo: 23, rain: '20%' },
            { day: 'Fri', icon: '☀️', hi: 33, lo: 23, rain: '5%' },
            { day: 'Sat', icon: '⛅', hi: 31, lo: 22, rain: '25%' },
            { day: 'Sun', icon: '🌦️', hi: 30, lo: 21, rain: '50%' },
        ],
        moisture: '62%', temp: '30°C', humidity: '80%', season: 'High rainfall — irrigation mostly not required',
    },
};

const IRR_STATES = Object.keys(STATE_WEATHER);

/* Canned AI responses keyed on keywords */
const AI_RESPONSES: Record<string, string> = {
    default: "I'm your Smart Kisan AI advisor! Ask me anything about crops, soil, irrigation, disease, or market prices. I'm here to help 🌱",
    wheat: "**Wheat cultivation tips:**\n• Best sown: Oct–Nov (Rabi season)\n• Ideal temp: 15–25°C\n• Water requirement: 4–5 irrigations\n• Common diseases: Rust, Smut — spray Mancozeb 0.2%\n• Average yield: 35–40 q/ha with proper care.",
    rice: "**Rice (Paddy) tips:**\n• Kharif crop — sow May–Jun\n• Needs standing water (5–7 cm)\n• N:P:K ratio: 120:60:60 kg/ha\n• Watch for: Brown Plant Hopper, Blast disease\n• Use SRI method to save 30% water.",
    soil: "**Soil health basics:**\n• Ideal pH: 6.0–7.5 for most crops\n• Organic matter > 1.5% is healthy\n• Test NPK every 2 years\n• Green manure (dhaincha) improves structure\n• Avoid waterlogging — ensure drainage channels.",
    irrigation: "**Irrigation best practices:**\n• Drip irrigation saves 40–60% water vs. flood\n• Irrigate at dawn/dusk to reduce evaporation\n• Sandy soils: irrigate more frequently, less quantity\n• Clay soils: less frequent, deeper watering\n• Soil moisture sensors save 20–30% water.",
    disease: "**Crop disease management:**\n• Scout fields weekly for early detection\n• Use disease-resistant varieties where available\n• Integrated Pest Management (IPM) first\n• Proper spacing improves air circulation\n• Copper-based fungicides for fungal infections.",
    market: "**Market intelligence tips:**\n• Check eNAM (National Agriculture Market) for live prices\n• Sell within 2 weeks of harvest for best prices\n• FPOs (Farmer Producer Orgs) get 10–15% better prices\n• Cold storage extends shelf life and improves price leverage\n• Mandi fees: 1–2% commission — negotiate on bulk.",
    fertilizer: "**Fertiliser guidelines:**\n• Apply basal dose at sowing (P & K)\n• Split N application: 50% basal, 50% top-dress\n• Avoid over-application — causes soil acidification\n• Use soil test reports to calibrate doses\n• Bio-fertilisers (Rhizobium, PSB) reduce chemical use by 25%.",
    weather: "**Weather & farming advice:**\n• Pre-monsoon: Prepare land, apply organic matter\n• Monsoon: Ensure drainage, watch for fungal outbreaks\n• Post-monsoon: Ideal for Rabi sowing\n• Frost alert: Cover sensitive crops with polythene\n• Heat stress: Irrigate more frequently, use mulch.",
};

function getAIResponse(msg: string): string {
    const lower = msg.toLowerCase();
    for (const key of Object.keys(AI_RESPONSES)) {
        if (key !== 'default' && lower.includes(key)) return AI_RESPONSES[key];
    }
    return AI_RESPONSES.default;
}

/* ─── Reusable overlay ──────────────────────────────────────── */
function ExpandOverlay({ open, onClose, maxWidth = '920px', children }: { open: boolean; onClose: () => void; maxWidth?: string; children: React.ReactNode }) {
    return (
        <div
            style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', transition: 'opacity 0.35s ease' }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div style={{ background: '#f4f9f4', borderRadius: '18px', boxShadow: '0 8px 48px rgba(56,142,60,0.18)', padding: '36px 36px 32px', width: '90vw', maxWidth, maxHeight: '90vh', overflowY: 'auto', transform: open ? 'scale(1) translateY(0)' : 'scale(0.82) translateY(60px)', opacity: open ? 1 : 0, transition: 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease', position: 'relative' }}>
                {children}
            </div>
        </div>
    );
}

function PanelHeader({ icon, title, onClose }: { icon: React.ReactNode; title: string; onClose: () => void }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ color: '#388e3c', display: 'flex' }}>{icon}</span>
                <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#2e7d32' }}>{title}</h2>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = '#e8f5e9')} onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                <X size={22} />
            </button>
        </div>
    );
}

function ReadyPlaceholder({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px', padding: '40px 20px', textAlign: 'center' }}>
            <span style={{ fontSize: '64px', lineHeight: 1 }}>{emoji}</span>
            <div>
                <p style={{ fontWeight: 700, fontSize: '1.15rem', color: '#2e7d32', margin: '0 0 8px' }}>{title}</p>
                <p style={{ fontSize: '0.9rem', color: '#888', margin: 0, lineHeight: 1.6, maxWidth: '260px' }}>{subtitle}</p>
            </div>
        </div>
    );
}

const colStyle: React.CSSProperties = { background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column' };

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function Solutions() {
    /* panel open states */
    const [soilOpen, setSoilOpen] = useState(false);
    const [irrigationOpen, setIrrigationOpen] = useState(false);
    const [diseaseOpen, setDiseaseOpen] = useState(false);
    const [marketOpen, setMarketOpen] = useState(false);
    const [aiOpen, setAiOpen] = useState(false);

    /* result states */
    const [analyzed, setAnalyzed] = useState(false);
    const [detected, setDetected] = useState(false);
    const [predicted, setPredicted] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    /* irrigation form */
    const [irrState, setIrrState] = useState('');
    const [irrCrop, setIrrCrop] = useState('');
    const [irrSoil, setIrrSoil] = useState('');
    const [irrAdvised, setIrAdvised] = useState(false);

    const stateData: StateWeather | null = irrState ? STATE_WEATHER[irrState] : null;

    /* chatbot */
    type Msg = { from: 'user' | 'bot'; text: string };
    const [messages, setMessages] = useState<Msg[]>([{ from: 'bot', text: AI_RESPONSES.default }]);
    const [chatInput, setChatInput] = useState('');
    const [botTyping, setBotTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, botTyping]);

    const sendChat = () => {
        const text = chatInput.trim();
        if (!text) return;
        setMessages(prev => [...prev, { from: 'user', text }]);
        setChatInput('');
        setBotTyping(true);
        setTimeout(() => {
            setBotTyping(false);
            setMessages(prev => [...prev, { from: 'bot', text: getAIResponse(text) }]);
        }, 900 + Math.random() * 600);
    };

    /* closers */
    const closeSoil = () => { setSoilOpen(false); setAnalyzed(false); };
    const closeIrrigation = () => { setIrrigationOpen(false); setIrAdvised(false); setIrrCrop(''); setIrrSoil(''); setIrrState(''); };
    const closeDisease = () => { setDiseaseOpen(false); setDetected(false); };
    const closeMarket = () => { setMarketOpen(false); setPredicted(false); };
    const closeAi = () => { setAiOpen(false); setMessages([{ from: 'bot', text: AI_RESPONSES.default }]); };

    const openPanel = (id: string) => {
        if (id === 'soil') setSoilOpen(true);
        if (id === 'irrigation') setIrrigationOpen(true);
        if (id === 'disease') setDiseaseOpen(true);
        if (id === 'market') setMarketOpen(true);
        if (id === 'ai') setAiOpen(true);
    };

    /* irrigation advice based on crop + soil */
    const irrigationAdvice = () => {
        const cropAdv: Record<string, { freq: string; amount: string; method: string }> = {
            Wheat: { freq: 'Every 10–12 days', amount: '60–80 mm/cycle', method: 'Furrow / Flood' },
            Rice: { freq: 'Continuous flooding (5–7 cm)', amount: '1200–2000 mm/season', method: 'Flood Irrigation' },
            Maize: { freq: 'Every 7–10 days', amount: '50–70 mm/cycle', method: 'Drip / Sprinkler' },
            Tomato: { freq: 'Every 4–5 days', amount: '40–50 mm/cycle', method: 'Drip Irrigation' },
            Cotton: { freq: 'Every 10–14 days', amount: '60–80 mm/cycle', method: 'Furrow / Drip' },
            Sugarcane: { freq: 'Every 7–10 days', amount: '100–120 mm/cycle', method: 'Furrow / Drip' },
            Soybean: { freq: 'Every 10–12 days', amount: '50–70 mm/cycle', method: 'Sprinkler' },
            Potato: { freq: 'Every 5–7 days', amount: '40–60 mm/cycle', method: 'Drip / Sprinkler' },
        };
        const soilAdj: Record<string, string> = {
            Clay: 'Reduce frequency by 20% — clay retains water longer. Avoid waterlogging.',
            Sandy: 'Increase frequency by 30% — sandy soil drains fast. Use drip for efficiency.',
            Loamy: 'Ideal soil — follow standard schedule. Loamy retains and drains well.',
            Silt: 'Slightly reduce quantity — silt holds moisture well. Watch for surface crusting.',
            Peat: 'Monitor moisture closely — peat absorbs heavily. Irrigate when top 2 cm dries.',
            Chalky: 'Irrigate more frequently — chalky soil drains quickly and can be alkaline.',
            'Clay-Loam': 'Good retention. Follow standard schedule with slight reduction in frequency.',
        };
        const base = cropAdv[irrCrop] || { freq: 'Every 7–10 days', amount: '50–70 mm/cycle', method: 'Drip Irrigation' };
        const adj = soilAdj[irrSoil] || 'Follow crop-specific guidelines.';
        return { ...base, adj };
    };

    return (
        <div className="page-content">
            <SectionWrapper bg="dark">
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Our Solutions</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px' }}>
                    End-to-end technologies for every stage of the farming cycle.
                </p>
            </SectionWrapper>

            <SectionWrapper>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    {solutions.map((s, i) => {
                        const clickable = CLICKABLE.includes(s.id);
                        if (clickable) {
                            return (
                                <div key={i} id={s.id} onClick={() => openPanel(s.id)}
                                    style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: 'var(--spacing-lg)', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s' }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = '#d4edda'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = 'var(--shadow-lg)'; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'white'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'var(--shadow-md)'; }}
                                >
                                    <div style={{ color: 'hsl(var(--color-primary))', marginBottom: '20px' }}>{s.icon}</div>
                                    <h3>{s.title}</h3>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.6' }}>{s.desc}</p>
                                </div>
                            );
                        }
                        return (
                            <Card key={i} id={s.id} hoverable>
                                <div style={{ color: 'hsl(var(--color-primary))', marginBottom: '20px' }}>{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p style={{ color: 'var(--color-text-light)', lineHeight: '1.6' }}>{s.desc}</p>
                            </Card>
                        );
                    })}
                </div>
            </SectionWrapper>

            {/* ══════ SOIL HEALTH ══════ */}
            <ExpandOverlay open={soilOpen} onClose={closeSoil}>
                <PanelHeader icon={<Layers size={32} />} title="Soil Health Management" onClose={closeSoil} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    <div style={colStyle}>
                        <h3 style={sH}>🌱 Soil Nutrients</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                            {[{ label: 'Nitrogen (N)', val: '90', hint: '0-200 mg/kg' }, { label: 'Phosphorus (P)', val: '42', hint: '0-150 mg/kg' }, { label: 'Potassium (K)', val: '43', hint: '0-200 mg/kg' }].map(f => (
                                <div key={f.label}><label style={fL}>{f.label}</label><input defaultValue={f.val} style={iS} /><span style={hS}>{f.hint}</span></div>
                            ))}
                        </div>
                        <h3 style={sH}>🌿 Environment</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            {[{ label: 'Temperature (°C)', val: '20.8', hint: '0-50°C' }, { label: 'Humidity (%)', val: '82', hint: '0-100%' }, { label: 'pH Level', val: '6.5', hint: '0-14' }].map(f => (
                                <div key={f.label}><label style={fL}>{f.label}</label><input defaultValue={f.val} style={iS} /><span style={hS}>{f.hint}</span></div>
                            ))}
                        </div>
                        <div style={{ marginBottom: '20px' }}><label style={fL}>Rainfall (mm)</label><input defaultValue="202" style={{ ...iS, width: '45%' }} /><span style={{ ...hS, display: 'block' }}>0-500mm</span></div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                            <button style={oBS}>🌾 Sample Data</button>
                            <button style={pBS} onClick={() => setAnalyzed(true)}>● Analyze Soil</button>
                        </div>
                    </div>
                    <div style={colStyle}>
                        {!analyzed ? <ReadyPlaceholder emoji="🧪" title="Ready for Analysis" subtitle="Fill in your soil data and click analyze to get personalized crop recommendations" /> : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f4f9f4', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🌾</div>
                                    <div><div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2px' }}>Recommended Crop</div><div style={{ fontWeight: 700, fontSize: '1.4rem', color: '#1b5e20' }}>Chickpea</div></div>
                                </div>
                                <h3 style={{ margin: '0 0 12px', fontSize: '1rem', color: '#333' }}>💡 Soil Insights</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                                    {soilInsights.map((ins, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: ins.color, borderRadius: '8px', padding: '8px 12px', fontSize: '0.82rem', color: '#333', borderLeft: `3px solid ${ins.type === 'fix' ? '#f9a825' : '#e53935'}` }}>
                                            <span>{ins.type === 'fix' ? '⚠️' : '📝'} {ins.label}</span>
                                            <button style={{ background: ins.type === 'fix' ? '#f9a825' : '#2e7d32', color: 'white', border: 'none', borderRadius: '20px', padding: '3px 14px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>{ins.type === 'fix' ? 'Fix' : 'Manage'}</button>
                                        </div>
                                    ))}
                                </div>
                                <h3 style={{ margin: '0 0 12px', fontSize: '1rem', color: '#333' }}>📊 Your vs Ideal</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {barData.map(b => (
                                        <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '18px', fontWeight: 700, fontSize: '0.85rem', color: '#444' }}>{b.label}</span>
                                            <div style={{ flex: 1, background: '#e8f5e9', borderRadius: '20px', height: '16px', overflow: 'hidden' }}><div style={{ width: `${(b.value / b.max) * 100}%`, background: '#2e7d32', height: '100%', borderRadius: '20px', transition: 'width 0.6s ease' }} /></div>
                                            <span style={{ fontSize: '0.78rem', color: '#555', whiteSpace: 'nowrap', background: '#e8f5e9', borderRadius: '10px', padding: '1px 8px' }}>{b.value}/{b.ideal}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ExpandOverlay>

            {/* ══════ SMART IRRIGATION ══════ */}
            <ExpandOverlay open={irrigationOpen} onClose={closeIrrigation}>
                <PanelHeader icon={<Droplet size={32} />} title="Smart Irrigation" onClose={closeIrrigation} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    {/* LEFT — inputs */}
                    <div style={colStyle}>
                        {/* ── State selector (FIRST) ── */}
                        <h3 style={sH}>📍 Select Your State</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <select
                                style={{ ...selS, fontWeight: 600 }}
                                value={irrState}
                                onChange={e => { setIrrState(e.target.value); setIrAdvised(false); }}
                            >
                                <option value="">-- Select Indian State --</option>
                                {IRR_STATES.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* ── 7-day weather strip — shown only after state picked ── */}
                        <h3 style={sH}>🌤️ 7-Day Weather Forecast {irrState && <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#666' }}>— {irrState}</span>}</h3>
                        {!stateData ? (
                            <div style={{ background: '#f0f8f0', borderRadius: '12px', padding: '20px', textAlign: 'center', color: '#aaa', fontSize: '0.85rem', marginBottom: '20px' }}>
                                🗺️ Select a state above to see its weather forecast
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
                                {stateData.forecast.map((d, i) => (
                                    <div key={i} style={{ flex: '0 0 auto', textAlign: 'center', background: '#f0f8f0', borderRadius: '12px', padding: '10px', minWidth: '60px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#555', marginBottom: '4px' }}>{d.day}</div>
                                        <div style={{ fontSize: '22px', margin: '2px 0' }}>{d.icon}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#c62828', fontWeight: 600 }}>{d.hi}°</div>
                                        <div style={{ fontSize: '0.72rem', color: '#888' }}>{d.lo}°</div>
                                        <div style={{ fontSize: '0.68rem', color: '#1565c0', marginTop: '2px' }}>{d.rain}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── Season note ── */}
                        {stateData && (
                            <div style={{ background: '#fff8e1', borderRadius: '8px', padding: '7px 12px', fontSize: '0.78rem', color: '#5d4037', marginBottom: '16px', borderLeft: '3px solid #f9a825' }}>
                                🌾 <strong>Season Note:</strong> {stateData.season}
                            </div>
                        )}

                        {/* ── Crop & Soil selectors ── */}
                        <h3 style={sH}>🌱 Crop &amp; Soil Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <label style={fL}>Crop Type</label>
                                <select style={selS} value={irrCrop} onChange={e => setIrrCrop(e.target.value)}>
                                    <option value="">Select Crop</option>
                                    {CROPS.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={fL}>Soil Type</label>
                                <select style={selS} value={irrSoil} onChange={e => setIrrSoil(e.target.value)}>
                                    <option value="">Select Soil</option>
                                    {SOIL_TYPES.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* ── Current conditions — state-driven ── */}
                        <h3 style={sH}>📡 Current Conditions {irrState && <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#666' }}>— {irrState}</span>}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                            {[
                                { label: 'Soil Moisture', val: stateData?.moisture ?? '—', icon: '💧', color: '#e3f2fd' },
                                { label: 'Temperature', val: stateData?.temp ?? '—', icon: '🌡️', color: '#fff3e0' },
                                { label: 'Humidity', val: stateData?.humidity ?? '—', icon: '💦', color: '#e8f5e9' },
                            ].map(c => (
                                <div key={c.label} style={{ background: c.color, borderRadius: '10px', padding: '12px 10px', textAlign: 'center', opacity: stateData ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                                    <div style={{ fontSize: '22px' }}>{c.icon}</div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#333' }}>{c.val}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#777' }}>{c.label}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                            <button style={pBS} onClick={() => { if (irrState && irrCrop && irrSoil) setIrAdvised(true); }}>💧 Get Irrigation Advice</button>
                        </div>
                        {(!irrState || !irrCrop || !irrSoil) && (
                            <p style={{ fontSize: '0.76rem', color: '#e65100', marginTop: '8px' }}>
                                ⚠️ Please select {!irrState ? 'state, ' : ''}{!irrCrop ? 'crop, ' : ''}{!irrSoil ? 'soil type' : ''}.
                            </p>
                        )}
                    </div>

                    {/* RIGHT — advice */}
                    <div style={colStyle}>
                        {!irrAdvised ? (
                            <ReadyPlaceholder emoji="💧" title="Ready for Advice" subtitle="Select your crop and soil type, then click 'Get Irrigation Advice' for a personalized schedule" />
                        ) : (
                            <>
                                {/* Today's recommendation banner */}
                                <div style={{ background: 'linear-gradient(135deg,#e3f2fd,#bbdefb)', borderRadius: '14px', padding: '16px 18px', marginBottom: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '24px' }}>🚿</span>
                                        <div style={{ fontWeight: 700, color: '#0d47a1', fontSize: '1rem' }}>Today's Recommendation</div>
                                    </div>
                                    {(() => {
                                        const adv = irrigationAdvice();
                                        return (
                                            <>
                                                <div style={{ fontSize: '0.85rem', color: '#1565c0', marginBottom: '4px' }}>
                                                    <strong>Irrigate today</strong> — Rain probability is low (0%), soil moisture below threshold.
                                                </div>
                                                <div style={{ fontSize: '0.78rem', color: '#555' }}>For <strong>{irrCrop}</strong> on <strong>{irrSoil}</strong> soil:</div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                                                    {[{ label: 'Frequency', val: adv.freq }, { label: 'Water Amount', val: adv.amount }, { label: 'Best Method', val: adv.method }].map(r => (
                                                        <div key={r.label} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '8px 10px' }}>
                                                            <div style={{ fontSize: '0.68rem', color: '#999', marginBottom: '2px' }}>{r.label}</div>
                                                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0d47a1' }}>{r.val}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>

                                {/* Soil adjustment note */}
                                <div style={{ background: '#fff8e1', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', fontSize: '0.82rem', color: '#555', borderLeft: '3px solid #f9a825' }}>
                                    <strong>🏔️ Soil Adjustment ({irrSoil}):</strong> {irrigationAdvice().adj}
                                </div>

                                {/* Weekly plan */}
                                <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: '#333' }}>📅 Weekly Irrigation Plan</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {(stateData?.forecast ?? []).map((d: DayForecast, i: number) => {
                                        const rain = parseInt(d.rain);
                                        const irrigate = rain < 40;
                                        return (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: irrigate ? '#e8f5e9' : '#f3e5f5', borderRadius: '8px', padding: '7px 12px', fontSize: '0.82rem' }}>
                                                <span style={{ width: '36px', fontWeight: 700, color: '#555' }}>{d.day}</span>
                                                <span style={{ fontSize: '18px' }}>{d.icon}</span>
                                                <span style={{ flex: 1, color: '#555' }}>{d.hi}°/{d.lo}° · Rain: {d.rain}</span>
                                                <span style={{ fontWeight: 700, color: irrigate ? '#2e7d32' : '#7b1fa2', background: irrigate ? '#c8e6c9' : '#e1bee7', borderRadius: '20px', padding: '2px 12px', fontSize: '0.75rem' }}>
                                                    {irrigate ? '💧 Irrigate' : '🌧️ Skip'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Water saving tip */}
                                <div style={{ background: '#e8f5e9', borderRadius: '10px', padding: '10px 14px', marginTop: '14px', fontSize: '0.82rem', color: '#2e7d32', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '18px' }}>💡</span>
                                    <span><strong>Water Saving Tip:</strong> Irrigate early morning (5–7 AM) to reduce evaporation by up to 30%.</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ExpandOverlay>

            {/* ══════ CROP DISEASE ══════ */}
            <ExpandOverlay open={diseaseOpen} onClose={closeDisease}>
                <PanelHeader icon={<Search size={32} />} title="Crop Disease Diagnosis" onClose={closeDisease} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    <div style={colStyle}>
                        <h3 style={sH}>📷 Upload Crop Image</h3>
                        <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); setDetected(true); }} onClick={() => setDetected(true)}
                            style={{ border: `2px dashed ${dragOver ? '#2e7d32' : '#bcd8bc'}`, borderRadius: '12px', padding: '36px 20px', textAlign: 'center', background: dragOver ? '#e8f5e9' : '#f9fdf9', cursor: 'pointer', marginBottom: '14px', transition: 'border-color 0.2s, background 0.2s' }}>
                            <span style={{ fontSize: '36px' }}>📸</span>
                            <p style={{ margin: '10px 0 0', color: '#555', fontSize: '0.9rem' }}>Click to upload or drag image here</p>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: '#aaa', fontStyle: 'italic', marginBottom: '24px' }}>Supported formats: JPG, PNG (Max 5MB)</p>
                        <button style={pBS} onClick={() => setDetected(true)}>● Detect Disease</button>
                    </div>
                    <div style={colStyle}>
                        {!detected ? <ReadyPlaceholder emoji="🔬" title="Ready for Analysis" subtitle="Upload a crop image and click detect to identify diseases and get treatment recommendations" /> : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#fff3e0', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: '4px solid #e65100' }}>
                                    <span style={{ fontSize: '32px' }}>🍂</span>
                                    <div><div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2px' }}>Detected Disease</div><div style={{ fontWeight: 700, fontSize: '1.3rem', color: '#bf360c' }}>Early Blight</div><div style={{ fontSize: '0.8rem', color: '#e65100' }}>Confidence: 87%</div></div>
                                </div>
                                <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: '#333' }}>🌿 Affected Crop</h3>
                                <div style={{ background: '#f4f9f4', borderRadius: '10px', padding: '10px 14px', marginBottom: '18px', fontSize: '0.88rem', color: '#333' }}><strong>Tomato</strong> — Alternaria solani fungal infection</div>
                                <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: '#333' }}>💊 Treatment Recommendations</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                                    {[{ step: '1', text: 'Remove and destroy infected leaves immediately.' }, { step: '2', text: 'Apply copper-based fungicide (Bordeaux mixture).' }, { step: '3', text: 'Ensure adequate spacing for air circulation.' }, { step: '4', text: 'Avoid overhead irrigation; use drip instead.' }].map(r => (
                                        <div key={r.step} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#f0f8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '0.82rem', color: '#333' }}>
                                            <span style={{ background: '#2e7d32', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{r.step}</span>
                                            <span>{r.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: '#333' }}>⚠️ Severity</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ flex: 1, background: '#e0e0e0', borderRadius: '20px', height: '10px', overflow: 'hidden' }}><div style={{ width: '65%', background: 'linear-gradient(90deg,#ffd54f,#e65100)', height: '100%', borderRadius: '20px' }} /></div>
                                    <span style={{ fontSize: '0.8rem', color: '#e65100', fontWeight: 600 }}>Moderate (65%)</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ExpandOverlay>

            {/* ══════ MARKET INTELLIGENCE ══════ */}
            <ExpandOverlay open={marketOpen} onClose={closeMarket}>
                <PanelHeader icon={<BarChart3 size={32} />} title="Market Intelligence" onClose={closeMarket} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    <div style={colStyle}>
                        <h3 style={sH}>🌾 Crop &amp; Location</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                            <div><label style={fL}>Crop Type</label><select style={selS}><option value="">Select Crop</option>{CROPS.map(c => <option key={c}>{c}</option>)}</select></div>
                            <div><label style={fL}>State</label><select style={selS}><option value="">Select State</option>{STATES.map(s => <option key={s}>{s}</option>)}</select></div>
                        </div>
                        <h3 style={sH}>📅 Time Period</h3>
                        <div style={{ marginBottom: '20px' }}><label style={fL}>Month</label><select style={selS}><option value="">Select Month</option>{MONTHS.map(m => <option key={m}>{m}</option>)}</select></div>
                        <h3 style={sH}>🌦️ Weather Conditions</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                            <div><label style={fL}>Rainfall (mm)</label><input placeholder="0-500" style={iS} /></div>
                            <div><label style={fL}>Temperature (°C)</label><input placeholder="0-50" style={iS} /></div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                            <button style={oBS}>📋 Sample</button>
                            <button style={pBS} onClick={() => setPredicted(true)}>✅ Predict Price</button>
                        </div>
                    </div>
                    <div style={colStyle}>
                        {!predicted ? <ReadyPlaceholder emoji="💰" title="Ready for Prediction" subtitle="Fill in the market data and click predict to get accurate price forecasts and market trends" /> : (
                            <>
                                <div style={{ background: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)', borderRadius: '14px', padding: '20px 22px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <div style={{ fontSize: '0.78rem', color: '#555', marginBottom: '4px' }}>Predicted Price (per quintal)</div>
                                    <div style={{ fontWeight: 800, fontSize: '2rem', color: '#1b5e20' }}>₹4,250</div>
                                    <div style={{ fontSize: '0.82rem', color: '#388e3c', marginTop: '4px' }}>↑ 8.3% vs last month</div>
                                </div>
                                <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: '#333' }}>📈 Monthly Price Trend</h3>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '80px', marginBottom: '8px' }}>
                                    {[55, 60, 50, 70, 65, 85, 90, 75, 95, 80, 88, 100].map((h, idx) => (
                                        <div key={idx} style={{ flex: 1, background: idx === 11 ? '#2e7d32' : '#a5d6a7', borderRadius: '4px 4px 0 0', height: `${h}%` }} title={MONTHS[idx]} />
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                                    {MONTHS.map(m => <div key={m} style={{ flex: 1, fontSize: '0.6rem', color: '#aaa', textAlign: 'center' }}>{m.slice(0, 1)}</div>)}
                                </div>
                                <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: '#333' }}>🏪 Best Mandis to Sell</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {[{ name: 'Azadpur Mandi, Delhi', price: '₹4,380', dist: '12 km' }, { name: 'Narela Market, Haryana', price: '₹4,290', dist: '28 km' }, { name: 'Kundli APMC, Sonipat', price: '₹4,210', dist: '35 km' }].map((m, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0f8f0', borderRadius: '8px', padding: '8px 14px', fontSize: '0.82rem' }}>
                                            <div><div style={{ fontWeight: 600, color: '#1b5e20' }}>{m.name}</div><div style={{ color: '#888', fontSize: '0.75rem' }}>{m.dist} away</div></div>
                                            <span style={{ fontWeight: 700, color: '#2e7d32', fontSize: '0.95rem' }}>{m.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ExpandOverlay>

            {/* ══════ AI ADVISORY CHATBOT ══════ */}
            <ExpandOverlay open={aiOpen} onClose={closeAi} maxWidth="860px">
                <PanelHeader icon={<Bot size={32} />} title="AI Advisory" onClose={closeAi} />

                {/* Chat window */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '520px' }}>
                    {/* Suggested topics */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {['Wheat cultivation', 'Soil health', 'Irrigation tips', 'Market prices', 'Disease control', 'Fertilizer use'].map(topic => (
                            <button key={topic} onClick={() => { setChatInput(topic); }}
                                style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '20px', padding: '5px 14px', fontSize: '0.78rem', color: '#2e7d32', cursor: 'pointer', transition: 'background 0.15s' }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#c8e6c9')}
                                onMouseLeave={e => (e.currentTarget.style.background = '#e8f5e9')}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'white', borderRadius: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: '14px' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end' }}>
                                {msg.from === 'bot' && (
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🤖</div>
                                )}
                                <div style={{
                                    maxWidth: '72%',
                                    background: msg.from === 'user' ? '#2e7d32' : '#f0f8f0',
                                    color: msg.from === 'user' ? 'white' : '#222',
                                    borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    padding: '10px 14px',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.6,
                                    whiteSpace: 'pre-line',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                }}>
                                    {msg.text}
                                </div>
                                {msg.from === 'user' && (
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>👤</div>
                                )}
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {botTyping && (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
                                <div style={{ background: '#f0f8f0', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a5d6a7', animation: `bounce 1s ${i * 0.2}s infinite` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input bar */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            value={chatInput}
                            onChange={e => setChatInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') sendChat(); }}
                            placeholder="Ask anything about farming, crops, soil, market..."
                            style={{ flex: 1, border: '1.5px solid #a5d6a7', borderRadius: '24px', padding: '11px 18px', fontSize: '0.9rem', outline: 'none', background: 'white', color: '#333' }}
                        />
                        <button onClick={sendChat} style={{ background: '#2e7d32', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#1b5e20')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#2e7d32')}
                        >
                            <Send size={18} color="white" />
                        </button>
                    </div>
                </div>

                {/* Bounce animation */}
                <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
            </ExpandOverlay>
        </div>
    );
}

/* ─── Shared style tokens ───────────────────────────────────── */
const sH: React.CSSProperties = { margin: '0 0 16px', color: '#2e7d32', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' };
const fL: React.CSSProperties = { fontSize: '0.78rem', color: '#555', display: 'block', marginBottom: '4px' };
const hS: React.CSSProperties = { fontSize: '0.72rem', color: '#aaa' };

const iS: React.CSSProperties = {
    width: '100%', border: '1px solid #ddd', borderRadius: '8px',
    padding: '6px 10px', fontSize: '0.9rem', outline: 'none',
    marginBottom: '2px', boxSizing: 'border-box', background: '#fafafa',
};

const selS: React.CSSProperties = {
    width: '100%', border: '1px solid #ddd', borderRadius: '8px',
    padding: '7px 10px', fontSize: '0.9rem', outline: 'none',
    background: '#fafafa', cursor: 'pointer', color: '#444',
};

const pBS: React.CSSProperties = {
    background: '#2e7d32', color: 'white', border: 'none', borderRadius: '24px',
    padding: '10px 22px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600,
    display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s',
};

const oBS: React.CSSProperties = {
    background: 'white', color: '#2e7d32', border: '1.5px solid #2e7d32', borderRadius: '24px',
    padding: '10px 22px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600,
    display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s',
};
