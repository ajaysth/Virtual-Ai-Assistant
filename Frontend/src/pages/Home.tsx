import React from 'react'
import { useUser } from '../contexts/useUser'
import Navbar from '../components/Navbar'
import aivoice from '../assets/aivoice.gif'
import humanvoice from '../assets/humanvoice.gif'

const Home = () => {
  const { user, listening, speaking } = useUser()

  // Dynamic configuration based on voice/listening state
  let currentImage = user?.assistantImage;
  let statusText = "System Standby";
  let statusColor = "border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]";
  let pulseColor = "bg-cyan-400";
  let cardBorderClass = "border-[#021790] shadow-[0_0_30px_rgba(2,23,144,0.3)]";

  if (speaking) {
    currentImage = aivoice;
    statusText = "Speaking...";
    statusColor = "border-fuchsia-500/40 text-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.25)]";
    pulseColor = "bg-fuchsia-400";
    cardBorderClass = "border-fuchsia-500 shadow-[0_0_40px_rgba(217,70,239,0.4)] scale-105";
  } else if (listening) {
    currentImage = humanvoice;
    statusText = "Listening to you...";
    statusColor = "border-emerald-500/40 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)] animate-pulse";
    pulseColor = "bg-emerald-400";
    cardBorderClass = "border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)] scale-105";
  }

  return (
    <div className="relative min-h-screen w-full p-5 gap-5 bg-gradient-to-t from-[black] to-[#010151] flex justify-center items-center flex-col pt-24 overflow-hidden">
      {/* Decorative Grid Lines to match SignUp/SignIn consistency */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Dynamic Glowing Card */}
        <div className={`w-[240px] h-[340px] flex justify-center items-center border-2 rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm transition-all duration-500 ease-out ${cardBorderClass}`}>
          <img 
            src={currentImage} 
            alt="Assistant State" 
            className="h-full w-full object-cover transition-all duration-500" 
          />
        </div>

        {/* Cyberpunk Status Indicator Badge */}
        <div className={`flex items-center gap-3 px-4 py-2 border rounded-full bg-black/40 backdrop-blur-md text-sm font-semibold tracking-wider uppercase transition-all duration-500 ${statusColor}`}>
          <span className="relative flex h-2.5 w-2.5">
            {/* Pulsing Dot */}
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColor}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${pulseColor}`}></span>
          </span>
          {statusText}
        </div>

        {/* Text Section */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl font-bold font-orbitron tracking-wide text-white">
            Hello, I am <span className="text-cyan-400 neon-glow-cyan">{user?.assistantName}</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xs mx-auto tracking-widest uppercase">
            {!listening && !speaking ? `Say "${user?.assistantName || 'Assistant'}" to activate` : ""}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home