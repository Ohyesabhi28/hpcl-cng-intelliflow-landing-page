'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X,
  Zap,
  BarChart3,
  Globe,
  Settings,
  Bell,
  User,
  LogOut,
  TrendingUp,
  Thermometer,
  Gauge
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const mockData = [
  { time: '00:00', flow: 45, pressure: 210 },
  { time: '04:00', flow: 30, pressure: 215 },
  { time: '08:00', flow: 85, pressure: 195 },
  { time: '12:00', flow: 95, pressure: 190 },
  { time: '16:00', flow: 70, pressure: 200 },
  { time: '20:00', flow: 55, pressure: 205 },
  { time: '23:59', flow: 40, pressure: 212 },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Changed to false to show landing page first
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  const slides = [
    {
      title: <>Next-Gen <span className="text-[#ffcc00]">CNG Management</span> with IntelliFlow</>,
      subtitle: "Experience the future of HPCL CNG operations with real-time precision."
    },
    {
      title: <>Powering <span className="text-[#ffcc00]">India's Green Future</span> Sustainably</>,
      subtitle: "Driving the nation forward with cleaner energy and smarter distribution networks."
    },
    {
      title: <>Seamless <span className="text-[#ffcc00]">Energy Flow</span> Redefined</>,
      subtitle: "Precision engineering meets digital innovation for uninterrupted fuel supply."
    }
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isLoggedIn, slides.length]);

  const hpBlue = "#0054a6";
  const hpRed = "#ed1c24";

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0054a6] text-white hidden lg:flex flex-col">
          <div className="p-6 flex items-center gap-3 border-b border-white/10">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/5/52/Hindustan_Petroleum_Logo.svg" 
              alt="HPCL" 
              className="h-8 w-auto brightness-0 invert"
            />
            <span className="font-bold tracking-tight">IntelliFlow</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {['Dashboard', 'Stations', 'Analytics', 'Alerts', 'Reports'].map((item) => (
              <a key={item} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item === 'Dashboard' ? 'bg-white/10 font-bold' : 'hover:bg-white/5 text-blue-100'}`}>
                {item === 'Dashboard' && <Activity size={20} />}
                {item === 'Stations' && <Globe size={20} />}
                {item === 'Analytics' && <BarChart3 size={20} />}
                {item === 'Alerts' && <Bell size={20} />}
                {item === 'Reports' && <ShieldCheck size={20} />}
                {item}
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-3 px-4 py-3 w-full text-blue-100 hover:text-white transition-colors"
            >
              <LogOut size={20} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
            <h1 className="text-xl font-bold text-gray-800">Operational Overview</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                System Live
              </div>
              <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">HPCL Mumbai Central</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#0054a6]">
                  <User size={20} />
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Flow', value: '1,284 kg', change: '+12%', icon: <Droplets className="text-blue-600" /> },
                { label: 'Avg Pressure', value: '204 Bar', change: '-2%', icon: <Gauge className="text-orange-600" /> },
                { label: 'Temperature', value: '24.5°C', change: 'Stable', icon: <Thermometer className="text-red-600" /> },
                { label: 'Active Stations', value: '42 / 45', change: '93%', icon: <Activity className="text-green-600" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Flow Rate Analysis</h3>
                    <p className="text-sm text-gray-500">Real-time CNG distribution across network</p>
                  </div>
                  <select className="bg-gray-50 border-none text-sm font-semibold rounded-lg px-3 py-2 outline-none">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                  </select>
                </div>
                <div className="h-[300px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData}>
                      <defs>
                        <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0054a6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#0054a6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="flow" stroke="#0054a6" strokeWidth={3} fillOpacity={1} fill="url(#colorFlow)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Alerts</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Pressure Drop', station: 'Station #04', time: '2 mins ago', type: 'critical' },
                    { title: 'Maintenance Due', station: 'Station #12', time: '1 hour ago', type: 'warning' },
                    { title: 'Flow Spike', station: 'Station #09', time: '3 hours ago', type: 'info' },
                  ].map((alert, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-1.5 h-12 rounded-full ${alert.type === 'critical' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{alert.title}</p>
                        <p className="text-xs text-gray-500">{alert.station} • {alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 text-sm font-bold text-[#0054a6] bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  View All Alerts
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <img 
                  src="https://hindustanpetroleum.com/images/hp-logo.png" 
                  alt="HPCL Logo" 
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if the main site blocks hotlinking
                    (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/en/5/52/Hindustan_Petroleum_Logo.svg";
                  }}
                />
              </div>
              <div className="flex flex-col border-l-2 border-gray-100 pl-4">
                <span className="text-xl font-black tracking-tight text-[#0054a6] leading-none">HPCL CNG</span>
                <span className="text-[10px] font-bold text-[#ed1c24] tracking-[0.2em] uppercase mt-1">IntelliFlow</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {['Home', 'Solutions', 'Technology', 'Support'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="relative text-gray-600 hover:text-[#0054a6] font-semibold text-sm transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0054a6] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <button 
                onClick={() => document.getElementById('login')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-[#0054a6] to-[#003d7a] text-white px-7 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Launch Portal
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-gray-100 pb-4 px-4"
          >
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#" className="text-gray-700 font-medium">Home</a>
              <a href="#" className="text-gray-700 font-medium">Solutions</a>
              <a href="#" className="text-gray-700 font-medium">Technology</a>
              <button className="bg-[#0054a6] text-white px-6 py-2 rounded-full font-semibold w-full">
                Launch Portal
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0054a6] to-[#003d7a] text-white py-20 lg:py-32 overflow-hidden">
        {/* Creative CNG Background Element */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          {/* Flowing lines representation */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M-100 100 Q 200 300 500 100 T 1100 200"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M-100 200 Q 300 100 600 300 T 1200 100"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="min-h-[400px] flex flex-col justify-center relative">
              {/* Subtle glow behind text */}
              <div className="absolute -inset-10 bg-blue-900/20 blur-3xl rounded-full -z-10"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-xl text-blue-100 mb-8 max-w-xl">
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => document.getElementById('login')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-[#ed1c24] hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl"
                    >
                      Enter Dashboard <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Slide Indicators */}
              <div className="flex gap-2 mt-12">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "w-8 bg-[#ffcc00]" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                    <Activity className="text-[#ffcc00] mb-3" size={40} />
                    <span className="text-2xl font-bold">99.9%</span>
                    <span className="text-sm text-blue-200">Uptime</span>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                    <Zap className="text-[#ffcc00] mb-3" size={40} />
                    <span className="text-2xl font-bold">Real-time</span>
                    <span className="text-sm text-blue-200">Monitoring</span>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                    <BarChart3 className="text-[#ffcc00] mb-3" size={40} />
                    <span className="text-2xl font-bold">Smart</span>
                    <span className="text-sm text-blue-200">Analytics</span>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                    <Globe className="text-[#ffcc00] mb-3" size={40} />
                    <span className="text-2xl font-bold">Global</span>
                    <span className="text-sm text-blue-200">Standards</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why IntelliFlow?</h2>
            <div className="w-20 h-1.5 bg-[#ed1c24] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Droplets className="text-[#0054a6]" size={32} />,
                title: "Precision Flow Control",
                desc: "Advanced sensors ensure accurate measurement and distribution of CNG across all stations.",
                accent: "#0054a6"
              },
              {
                icon: <ShieldCheck className="text-[#ed1c24]" size={32} />,
                title: "Enhanced Safety",
                desc: "Automated safety protocols and leak detection systems integrated directly into the flow management.",
                accent: "#ed1c24"
              },
              {
                icon: <Activity className="text-[#0054a6]" size={32} />,
                title: "Predictive Maintenance",
                desc: "AI-driven insights to predict equipment failure before it happens, reducing downtime significantly.",
                accent: "#0054a6"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden"
                style={{ borderTop: `4px solid ${feature.accent}` }}
              >
                <div className="mb-4 p-3 rounded-lg inline-block" style={{ backgroundColor: `${feature.accent}10` }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section id="login" className="py-20 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#0054a6] to-[#003d7a] p-8 text-center text-white relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck size={60} />
              </div>
              <h2 className="text-2xl font-bold relative z-10">Portal Login</h2>
              <p className="text-blue-100 text-sm mt-1 relative z-10">Access your IntelliFlow dashboard</p>
            </div>
            <div className="p-8">
              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Employee ID / Email</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0054a6] focus:border-transparent outline-none transition-all text-gray-800"
                    placeholder="Enter your credentials"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0054a6] focus:border-transparent outline-none transition-all text-gray-800"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-[#0054a6] focus:ring-[#0054a6]" />
                    Remember me
                  </label>
                  <a href="#" className="text-[#0054a6] font-semibold hover:underline">Forgot Password?</a>
                </div>
                <button 
                  disabled={isLoading}
                  className="w-full bg-[#ed1c24] hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-red-100 transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Authorized Personnel Only. <br/>
                  <a href="#" className="text-[#0054a6] font-bold hover:underline mt-1 inline-block">Request Access</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://hindustanpetroleum.com/images/hp-logo.png" 
                alt="HPCL Logo" 
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/en/5/52/Hindustan_Petroleum_Logo.svg";
                }}
              />
              <span className="text-gray-900 font-bold text-sm">HPCL IntelliFlow</span>
            </div>
            <div className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Hindustan Petroleum Corporation Limited. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
