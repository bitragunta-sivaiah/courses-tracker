import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import Marquee from 'react-fast-marquee';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { 
  BookOpen, CheckCircle, AlertTriangle, Calendar, Trophy, 
  Flame, ChevronRight, Youtube, ThumbsUp, MessageSquare, 
  Share2, Code, Activity, List, Sun, Moon, 
  Cookie, X, Upload, Camera, Zap, RotateCcw
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILITIES ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- MARQUEE MESSAGES ---
const TICKER_MESSAGES = [
  "🔥 KEEP THE STREAK ALIVE!",
  "💡 TIP: Drink water while debugging.",
  "🚀 React 19 is coming soon – stay prepared.",
  "⚡ Consistency > Intensity.",
  "👨‍💻 Committing code every day makes you a pro.",
  "📚 Don't just watch tutorials, BUILD things.",
  "🛑 Stuck? Take a 5-minute walk."
];

// --- FULL CURRICULUM DATA ---
const CURRICULUM = [
  { day: 0, title: "Setup + Roadmap", desc: "Course overview, tool installation (VS Code, Node, Python), folder structure, GitHub setup" },
  { day: 1, title: "HTML Foundations", desc: "Structure, tags, headings, paragraphs, lists, comments" },
  { day: 2, title: "HTML Forms & Media", desc: "Forms, inputs, labels, audio/video, tables, semantic tags" },
  { day: 3, title: "HTML Project", desc: "Build personal portfolio (static), linking pages, assets" },
  { day: 4, title: "CSS Basics", desc: "Selectors, colors, backgrounds, box model" },
  { day: 5, title: "CSS Layouts", desc: "Flexbox, Grid, alignment, spacing" },
  { day: 6, title: "CSS Advanced", desc: "Pseudo-classes, transitions, animations, responsive design" },
  { day: 7, title: "CSS Project", desc: "Build responsive landing page (real business example)" },
  { day: 8, title: "JavaScript Basics", desc: "Variables, datatypes, operators, conditions" },
  { day: 9, title: "JS Loops & Functions", desc: "for/while loops, functions, arrow functions" },
  { day: 10, title: "JS Arrays & Objects", desc: "CRUD operations, nested structures" },
  { day: 11, title: "DOM Manipulation", desc: "Query selectors, events, event bubbling" },
  { day: 12, title: "DOM Projects", desc: "Calculator + To-Do App" },
  { day: 13, title: "JS Advanced", desc: "Callbacks, Promises, async/await" },
  { day: 14, title: "Fetch API", desc: "GET/POST, calling dummy APIs, error handling" },
  { day: 15, title: "JS Mini Project", desc: "Weather App + API integration" },
  { day: 16, title: "Version Control", desc: "Git basics, branching, PR, GitHub workflow" },
  { day: 17, title: "React Introduction", desc: "SPA concept, components, props" },
  { day: 18, title: "React State & Events", desc: "useState, event handling, forms" },
  { day: 19, title: "React Hooks Deep-Dive", desc: "useEffect, cleanup, lifecycle logic" },
  { day: 20, title: "React Routing", desc: "react-router-dom, navigation, dynamic routes" },
  { day: 21, title: "React APIs", desc: "Axios, data fetching, loaders" },
  { day: 22, title: "React Context", desc: "Global state, provider pattern" },
  { day: 23, title: "Advanced React", desc: "Memoization, custom hooks, performance" },
  { day: 24, title: "React UI Project", desc: "Blog frontend or product listing UI" },
  { day: 25, title: "Node.js Basics", desc: "Intro, modules, fs, path, events, npm" },
  { day: 26, title: "Express.js Intro", desc: "Routing, middleware, controllers" },
  { day: 27, title: "Express + REST API", desc: "CRUD operations, JSON handling" },
  { day: 28, title: "MongoDB Basics", desc: "Collections, documents, CRUD using Compass" },
  { day: 29, title: "Mongoose", desc: "Schemas, models, queries" },
  { day: 30, title: "Authentication", desc: "JWT, bcrypt, login/signup APIs" },
  { day: 31, title: "API Validation & Error Handling", desc: "Joi/Validator, centralized errors" },
  { day: 32, title: "File Uploads", desc: "Multer, image uploads, static hosting" },
  { day: 33, title: "MERN Integration", desc: "Connect React frontend + Node backend" },
  { day: 34, title: "MERN Project (Part 1)", desc: "User Auth System" },
  { day: 35, title: "MERN Project (Part 2)", desc: "Product CRUD + UI" },
  { day: 36, title: "MERN Project (Part 3)", desc: "Dashboard with filters, pagination" },
  { day: 37, title: "Deployment", desc: "Backend: Render / Railway, Frontend: Vercel" },
  { day: 38, title: "Python Core Basics", desc: "Syntax, variables, input/output, datatypes" },
  { day: 39, title: "Python Control Flow", desc: "Conditions, loops, match case" },
  { day: 40, title: "Python Collections", desc: "List, tuple, dict, set methods" },
  { day: 41, title: "Functions & Lambda", desc: "*args, **kwargs, scope, higher-order functions" },
  { day: 42, title: "Python OOP", desc: "Classes, objects, inheritance, polymorphism" },
  { day: 43, title: "File Handling", desc: "open(), read/write, CSV/JSON" },
  { day: 44, title: "Error Handling", desc: "try/except/else/finally, custom errors" },
  { day: 45, title: "Python Modules & Scripts", desc: "Imports, packages, virtual environments" },
  { day: 46, title: "Flask Basics", desc: "Routes, templates, Jinja2" },
  { day: 47, title: "Flask CRUD", desc: "Forms, models, Mongo/SQL integration" },
  { day: 48, title: "Flask API", desc: "REST API creation" },
  { day: 49, title: "Django Basics", desc: "Models, views, templates" },
  { day: 50, title: "Django Advanced", desc: "ORM, admin panel, authentication" },
  { day: 51, title: "Django API", desc: "Django REST Framework" },
  { day: 52, title: "Python Full-Stack App", desc: "Small project (blog/tasks/dashboard)" },
  { day: 53, title: "Deployment (Python)", desc: "Render/Hostinger + DB connections" },
  { day: 54, title: "DSA for Developers", desc: "Arrays, Two-pointer, Hashmap" },
  { day: 55, title: "APIs Advanced", desc: "Rate limits, caching, optimization" },
  { day: 56, title: "Testing", desc: "Jest (JS) + PyTest (Python)" },
  { day: 57, title: "System Design Basics", desc: "Scalability, load balancers, caching" },
  { day: 58, title: "Resume + Portfolio", desc: "GitHub optimization, LinkedIn setup" },
  { day: 59, title: "Final Project & Interview Prep", desc: "Capstone project + mock interview questions" }
];

// --- AVATAR PRESETS ---
const AVATAR_PRESETS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Alex",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Robot",
  "https://api.dicebear.com/7.x/micah/svg?seed=Denny",
];

const Dashboard = () => {
  // --- STATE ---
  // 1. Theme (Initial System Detection)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1000, height: typeof window !== 'undefined' ? window.innerHeight : 800 });
  const [cookieConsent, setCookieConsent] = useState(null); 
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // User Data
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState({ name: '', reason: '', startDate: null, avatar: '' });
  
  // Tracker State (Updated to track skipped status of current day)
  const [trackerState, setTrackerState] = useState({
    skippedDays: 0,
    isSkippedToday: false, // NEW: Tracks if today is in "Skip Mode"
    completedDays: [],
    dailyData: {}, 
  });

  // --- EFFECTS ---
  
  // 1. Theme Handler
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // 2. Window Resize
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Load Data
  useEffect(() => {
    const savedUser = localStorage.getItem('fs_tracker_user');
    const savedTracker = localStorage.getItem('fs_tracker_data');
    const savedCookie = localStorage.getItem('fs_cookie_consent');

    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsOnboarded(true);
    }
    if (savedTracker) setTrackerState(JSON.parse(savedTracker));
    if (savedCookie) setCookieConsent(savedCookie);
  }, []);

  // 4. Save Data
  useEffect(() => {
    if (isOnboarded && cookieConsent === 'accepted') {
      localStorage.setItem('fs_tracker_user', JSON.stringify(userData));
      localStorage.setItem('fs_tracker_data', JSON.stringify(trackerState));
    }
  }, [userData, trackerState, isOnboarded, cookieConsent]);

  // --- LOGIC ---
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const getCurrentDayIndex = () => {
    if (!userData.startDate) return 0;
    const start = new Date(userData.startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 
    const activeDay = diffDays - trackerState.skippedDays;
    return Math.max(0, Math.min(activeDay, 59));
  };

  const activeDayIndex = getCurrentDayIndex();
  const currentTopic = CURRICULUM[activeDayIndex] || { title: "Course Complete", desc: "You did it!" };
  const isDayCompleted = trackerState.completedDays.includes(activeDayIndex);

  const getDisplayDateInfo = (offset = 0) => {
    if (!userData.startDate) return { dateStr: '', weekStr: '' };
    const date = new Date(userData.startDate);
    const totalDaysPassed = activeDayIndex + trackerState.skippedDays + offset;
    date.setDate(date.getDate() + totalDaysPassed);
    
    // Logic: Week 1 = Days 0-6, Week 2 = Days 7-13
    const weekNum = Math.floor(activeDayIndex / 7) + 1;
    
    return {
      dateStr: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      weekStr: `Week ${weekNum}`
    };
  };

  const { dateStr, weekStr } = getDisplayDateInfo();

  // --- CHART DATA GENERATION ---
  const chartData = CURRICULUM.map((item) => {
    const isCompleted = trackerState.completedDays.includes(item.day);
    return {
      name: `Day ${item.day}`,
      completed: isCompleted ? 1 : 0,
      cumulative: trackerState.completedDays.filter(d => d <= item.day).length
    };
  });

  // --- ACTIONS ---
  const handleCompleteDay = (dayId, data) => {
    if(trackerState.completedDays.includes(dayId)) return;
    setTrackerState(prev => ({
      ...prev,
      isSkippedToday: false, // Reset skip if completed
      completedDays: [...prev.completedDays, dayId],
      dailyData: { ...prev.dailyData, [dayId]: data }
    }));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); 
    toast.success("Day Completed! Charts updated.");
  };

  // --- NEW TOGGLE SKIP LOGIC ---
  const handleToggleSkip = () => {
    if (isDayCompleted) return; // Cannot skip/unskip if already completed

    if (trackerState.isSkippedToday) {
      // UN-SKIP LOGIC
      setTrackerState(prev => ({
        ...prev,
        skippedDays: Math.max(0, prev.skippedDays - 1),
        isSkippedToday: false
      }));
      toast.success("Day restored! Let's get to work.");
    } else {
      // SKIP LOGIC
      setTrackerState(prev => ({
        ...prev,
        skippedDays: prev.skippedDays + 1,
        isSkippedToday: true
      }));
      toast("Day skipped. Form disabled.", { icon: '⏸️' });
    }
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setUserData(prev => ({ ...prev, avatar: newAvatarUrl }));
    setIsAvatarModalOpen(false);
    toast.success("Avatar updated!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) return toast.error("Max 500KB!"); 
      const reader = new FileReader();
      reader.onloadend = () => handleAvatarChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCookie = (choice) => {
    setCookieConsent(choice);
    localStorage.setItem('fs_cookie_consent', choice);
    if (choice === 'rejected') toast("Cookies rejected. Progress not saved.", { icon: '🍪' });
    else toast.success("Preferences saved!");
  };

  // --- RENDER ---
  if (!isOnboarded) return <OnboardingScreen onSubmit={(data) => { setUserData(data); setIsOnboarded(true); }} />;

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-300 pb-20",
      theme === 'dark' ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      <Toaster position="top-right" toastOptions={{ className: theme === 'dark' ? '!bg-slate-800 !text-white' : '!bg-white !text-slate-900' }} />
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}

      {/* --- MARQUEE --- */}
      <div className={cn("h-8 flex items-center overflow-hidden z-50 relative", 
        theme === 'dark' ? "bg-indigo-900/50 text-indigo-200" : "bg-indigo-100 text-indigo-700")}>
        <div className="px-3 font-bold text-xs bg-indigo-600 text-white h-full flex items-center z-10 absolute left-0 shadow-lg">
          NEWS FEED
        </div>
        <Marquee gradient={false} speed={40} className="text-xs font-medium tracking-wide">
           {TICKER_MESSAGES.map((msg, i) => (
             <span key={i} className="mx-8 flex items-center gap-2"><Zap size={10} /> {msg}</span>
           ))}
        </Marquee>
      </div>

      {/* --- HEADER --- */}
      <header className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md bg-opacity-90 transition-colors duration-300",
        theme === 'dark' ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/20">
                <img src={userData.avatar || AVATAR_PRESETS[0]} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Full Stack Tracker
              </h1>
              <p className="text-xs opacity-70">Welcome back, {userData.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex gap-4 text-xs font-bold opacity-60">
                <div className="flex items-center gap-1"><Flame size={14} className="text-orange-500" /> STREAK: {trackerState.completedDays.length > 0 ? "ACTIVE" : "0"}</div>
                <div className="flex items-center gap-1"><Trophy size={14} className="text-yellow-500" /> DONE: {trackerState.completedDays.length}/60</div>
             </div>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN GRID --- */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: ACTIVE CARD & CHARTS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Card */}
          <motion.div 
            key={activeDayIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border transition-all",
              theme === 'dark' ? "bg-slate-900 border-slate-800 shadow-indigo-500/10" : "bg-white border-slate-200 shadow-slate-200"
            )}
          >
            <div className={cn("absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none",
               theme === 'dark' ? "bg-indigo-500" : "bg-purple-300")} 
            />

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-xs font-bold border border-indigo-500/20">
                    DAY {activeDayIndex}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-bold border border-purple-500/20">
                    {weekStr}
                  </span>
                  {/* VISUAL INDICATOR FOR SKIPPED */}
                  {trackerState.isSkippedToday && (
                    <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold border border-red-500/20 animate-pulse">
                      PAUSED
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl md:text-4xl font-bold mb-3">{currentTopic.title}</h2>
                <div className="flex items-center gap-2 text-sm opacity-60 mb-6">
                  <Calendar size={16} />
                  <span>{dateStr}</span>
                </div>

                <div className={cn("p-4 rounded-xl border mb-6", 
                  theme === 'dark' ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200")}>
                   <h3 className="text-xs font-bold opacity-50 uppercase mb-3 flex items-center gap-2">
                      <List size={14} /> Today's Breakdown
                   </h3>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentTopic.desc ? currentTopic.desc.split(',').map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm opacity-80">
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
                              {topic.trim()}
                          </li>
                      )) : <li>Final Review</li>}
                   </ul>
                </div>
              </div>

              <button 
                onClick={handleToggleSkip}
                disabled={isDayCompleted}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all border text-sm font-medium",
                  isDayCompleted 
                    ? "opacity-30 cursor-not-allowed bg-slate-800 border-transparent text-slate-500" 
                    : trackerState.isSkippedToday 
                      ? "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500" // Unskip Style
                      : "bg-transparent border-red-500/20 text-red-500 hover:bg-red-500/10" // Skip Style
                )}
              >
                {trackerState.isSkippedToday ? (
                    <>
                        <RotateCcw size={16} /> Unskip this day
                    </>
                ) : (
                    <>
                        <AlertTriangle size={16} /> {isDayCompleted ? "Completed" : "Skip Day"}
                    </>
                )}
              </button>
            </div>

            {/* FORM WRAPPER - HANDLES DISABLE LOGIC */}
            <div className={cn("transition-all duration-500", trackerState.isSkippedToday ? "opacity-30 pointer-events-none grayscale filter" : "opacity-100")}>
                <DailyTrackerForm 
                  dayId={activeDayIndex} 
                  isCompleted={isDayCompleted}
                  onComplete={handleCompleteDay}
                  theme={theme}
                />
            </div>

          </motion.div>

          {/* VISUAL ANALYTICS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chart 1: Cumulative Progress Area */}
              <div className={cn("p-6 rounded-2xl border shadow-sm", theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                  <h3 className="text-sm font-bold opacity-70 mb-4 flex items-center gap-2"><Activity size={16} /> Progress Trajectory</h3>
                  <div className="h-48 w-full">
                     
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData.slice(0, activeDayIndex + 5)}>
                        <defs>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip 
                            contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
                        />
                        <Area type="monotone" dataKey="cumulative" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
              </div>

              {/* Chart 2: Completion Stats Bar */}
              <div className={cn("p-6 rounded-2xl border shadow-sm", theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                  <h3 className="text-sm font-bold opacity-70 mb-4 flex items-center gap-2"><Trophy size={16} /> Completion Ratio</h3>
                  <div className="h-48 w-full flex items-center justify-center relative">
                    {/* Simplified Circular Progress Logic using Recharts Pie or CSS, sticking to Bar for simplicity/responsiveness */}
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{ name: 'Done', val: trackerState.completedDays.length }, { name: 'Left', val: 60 - trackerState.completedDays.length }]}>
                          <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', border: 'none' }} />
                          <Bar dataKey="val" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <Trophy size={80} />
                     </div>
                  </div>
              </div>
          </div>
        </div>

        {/* RIGHT: SIDEBAR */}
        <div className="lg:col-span-1">
           <div className={cn("border rounded-2xl p-6 h-[calc(100vh-8rem)] sticky top-24 flex flex-col",
              theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
           )}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-indigo-500" /> Syllabus
              </h3>
              <div className="overflow-y-auto pr-2 space-y-2 flex-1 custom-scrollbar">
                  {CURRICULUM.map((item) => {
                    const isDone = trackerState.completedDays.includes(item.day);
                    const isActive = item.day === activeDayIndex;
                    return (
                      <div key={item.day} className={cn(
                        "p-3 rounded-lg border text-sm transition-all",
                        isActive 
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                          : isDone 
                            ? "bg-emerald-500/10 border-emerald-500/20 opacity-60" 
                            : theme === 'dark' ? "bg-slate-950 border-slate-800 opacity-50" : "bg-slate-50 border-slate-200 opacity-60"
                      )}>
                        <div className="flex justify-between">
                           <span className={cn("font-bold text-xs", isActive ? "text-indigo-200" : "opacity-50")}>DAY {item.day}</span>
                           {isDone && <CheckCircle size={14} className="text-emerald-500" />}
                        </div>
                        <p className="font-medium truncate">{item.title}</p>
                      </div>
                    )
                  })}
              </div>
           </div>
        </div>
      </main>

      {/* --- COOKIE BANNER --- */}
      <AnimatePresence>
        {!cookieConsent && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={cn("fixed bottom-6 right-6 max-w-sm p-6 rounded-xl border shadow-2xl z-50 flex flex-col gap-4",
              theme === 'dark' ? "bg-slate-900/90 border-slate-700 backdrop-blur-xl" : "bg-white/90 border-slate-200 backdrop-blur-xl"
            )}
          >
            <div className="flex items-start gap-4">
               <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-500"><Cookie size={24} /></div>
               <div>
                 <h4 className="font-bold text-sm">We use cookies</h4>
                 <p className="text-xs opacity-70 mt-1">We use local storage to save your progress.</p>
               </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleCookie('rejected')} className="flex-1 py-2 text-xs font-bold border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Deny</button>
              <button onClick={() => handleCookie('accepted')} className="flex-1 py-2 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">Accept</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- AVATAR MODAL --- */}
      <AnimatePresence>
        {isAvatarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className={cn("w-full max-w-md p-6 rounded-2xl border shadow-2xl", 
                 theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
               )}
             >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Change Avatar</h3>
                  <button onClick={() => setIsAvatarModalOpen(false)}><X size={20} /></button>
                </div>

                <p className="text-sm opacity-60 mb-4">Choose a preset:</p>
                <div className="flex gap-4 mb-6 justify-center">
                   {AVATAR_PRESETS.map((src, i) => (
                     <button key={i} onClick={() => handleAvatarChange(src)} className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all hover:scale-110">
                        <img src={src} alt="avatar" className="w-full h-full" />
                     </button>
                   ))}
                </div>

                <div className="relative border-t border-slate-700/50 pt-6 text-center">
                    <p className="text-sm opacity-60 mb-4">Or upload your own:</p>
                    <label className="inline-flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-slate-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-slate-400" />
                            <p className="text-xs text-slate-500">SVG, PNG, JPG (MAX. 500KB)</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB COMPONENTS ---

const DailyTrackerForm = ({ dayId, isCompleted, onComplete, theme }) => {
  const [formState, setFormState] = useState({
    assignment: false, understanding: 50, realCase: 50,
    subscribed: false, liked: false, commented: false, followed: false
  });

  const handleSubmit = () => {
    if (!formState.assignment) return toast.error("You must finish the assignment!");
    onComplete(dayId, formState);
  };

  if (isCompleted) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center mt-6">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
          <CheckCircle size={40} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-500">Mission Accomplished!</h3>
        <p className="opacity-70 mt-2">Day {dayId} is in the books.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <RangeInput label="Concept Understanding" value={formState.understanding} onChange={v => setFormState({...formState, understanding: v})} theme={theme} color="indigo" />
         <RangeInput label="Real World Application" value={formState.realCase} onChange={v => setFormState({...formState, realCase: v})} theme={theme} color="pink" />
      </div>

      <hr className={cn("border-t", theme === 'dark' ? "border-slate-800" : "border-slate-200")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Checkbox label="Assignment Complete" checked={formState.assignment} onChange={() => setFormState({...formState, assignment: !formState.assignment})} icon={<Code size={18} className="text-blue-400" />} theme={theme} />
        <Checkbox label="Subscribed" checked={formState.subscribed} onChange={() => setFormState({...formState, subscribed: !formState.subscribed})} icon={<Youtube size={18} className="text-red-500" />} theme={theme} />
        <Checkbox label="Liked Video" checked={formState.liked} onChange={() => setFormState({...formState, liked: !formState.liked})} icon={<ThumbsUp size={18} className="text-yellow-500" />} theme={theme} />
        <Checkbox label="Commented" checked={formState.commented} onChange={() => setFormState({...formState, commented: !formState.commented})} icon={<MessageSquare size={18} className="text-purple-400" />} theme={theme} />
        <Checkbox label="Followed Socials" checked={formState.followed} onChange={() => setFormState({...formState, followed: !formState.followed})} icon={<Share2 size={18} className="text-pink-400" />} theme={theme} />
      </div>

      <button onClick={handleSubmit} disabled={!formState.assignment} 
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        Mark Day {dayId} Complete <ChevronRight size={20} />
      </button>
    </div>
  );
};

const RangeInput = ({ label, value, onChange, theme, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-sm font-medium">
       <span className="opacity-70">{label}</span>
       <span className={cn("font-bold", `text-${color}-500`)}>{value}%</span>
    </div>
    <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(e.target.value)}
      className={cn("w-full h-2 rounded-lg appearance-none cursor-pointer", theme === 'dark' ? "bg-slate-700" : "bg-slate-200")} 
    />
  </div>
);

const Checkbox = ({ label, checked, onChange, icon, theme }) => (
  <div onClick={onChange} className={cn(
    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none",
    checked 
      ? "bg-indigo-500/10 border-indigo-500/50" 
      : theme === 'dark' ? "bg-slate-900 border-slate-800 hover:bg-slate-800" : "bg-white border-slate-200 hover:bg-slate-50"
  )}>
    <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", 
       checked ? "bg-indigo-500 border-indigo-500" : "border-slate-500 bg-transparent")}>
       {checked && <CheckCircle size={12} className="text-white" />}
    </div>
    <div className="flex items-center gap-2 text-sm opacity-80">{icon}{label}</div>
  </div>
);

const OnboardingScreen = ({ onSubmit }) => {
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome, Dev.</h1>
          <p className="text-slate-400">Your 60-day journey starts here.</p>
        </div>
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            onSubmit({ 
              name: formData.get('name'), 
              reason: formData.get('reason'), 
              startDate: new Date().toISOString(),
              avatar: avatar
            });
        }} className="space-y-6">
           
           <div className="flex justify-center gap-4">
              {AVATAR_PRESETS.map((src, i) => (
                 <div key={i} onClick={() => setAvatar(src)} className={cn("w-14 h-14 rounded-full border-2 cursor-pointer transition-all", avatar === src ? "border-indigo-500 scale-110" : "border-transparent opacity-50")}>
                    <img src={src} className="w-full h-full" alt="av" />
                 </div>
              ))}
           </div>

           <div>
             <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
             <input name="name" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" placeholder="e.g. Jordan" />
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-400 mb-1">Motivation</label>
             <textarea name="reason" required rows="3" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none resize-none transition-colors" placeholder="I want to build..." />
           </div>
           <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold transition-all">Launch Dashboard</button>
        </form>
      </motion.div>
    </div>
  );
}

export default Dashboard;