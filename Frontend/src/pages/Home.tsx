import React from 'react'
import { useUser } from '../contexts/useUser'
import Navbar from '../components/Navbar'

const Home = () => {
  const { user } = useUser()
  return (
    <div className="relative min-h-screen w-full p-5 gap-5 bg-gradient-to-t from-[black] to-[#010151] flex justify-center items-center flex-col pt-24 overflow-hidden">
      {/* Decorative Grid Lines to match SignUp/SignIn consistency */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-[220px] h-[320px] flex justify-center items-center shadow-[0_0_30px_rgba(2,23,144,0.3)] border-2 border-[#021790] rounded-3xl overflow-hidden group hover:border-[#00f3ff] hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition-all duration-300">
          <img src={user?.assistantImage} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <h1 className="text-4xl font-bold font-orbitron tracking-wide text-white text-center">
          Hello, I am <span className="text-cyan-400 neon-glow-cyan">{user?.assistantName}</span>
        </h1>
      </div>
    </div>
  )
}

export default Home