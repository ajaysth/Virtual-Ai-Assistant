import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineFingerPrint, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdAlternateEmail } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsLightningCharge } from "react-icons/bs";
import { PiGraphLight } from "react-icons/pi";
import React, { useState, useEffect } from 'react';
import {useUser} from "../contexts/useUser"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const {user, loading,handleSignUp}=useUser()

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
      await handleSignUp({name,email,password})
      navigate("/")
    }catch(err){
      console.log(err)
    }

  }

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen w-full bg-[#05070a] text-white flex flex-col ">


      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6 lg:px-20 py-10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Left Side: Info */}
        <div className="flex-1 max-w-xl text-center lg:text-left z-10">
          <div className="relative inline-block mb-8">
            {/* Neural Icon Mockup */}
            <div className="w-48 h-48 rounded-full border-2 border-cyan-400/20 flex items-center justify-center p-4 relative group">
              <div className="absolute inset-0 rounded-full border border-cyan-400/10 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border border-cyan-400/10 animate-[spin_15s_linear_infinite_reverse]"></div>

              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-900/40 to-black flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,243,255,0.2)]">
                <PiGraphLight size={60} className="text-cyan-400 neon-glow-cyan" />
                {/* Orbiting particles */}
                <div className="absolute w-2 h-2 bg-cyan-400 rounded-full top-4 left-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>

          <h2 className="text-6xl lg:text-7xl font-bold font-orbitron tracking-tighter mb-4">
            AJ-X <span className="text-cyan-400 neon-glow-cyan">v2.0</span>
          </h2>
          <p className="text-white/60 text-lg lg:text-xl font-rajdhani max-w-md mx-auto lg:mx-0 leading-relaxed">
            Synchronize your neural patterns with the industry's most advanced synthetic intelligence interface. Optimization protocols ready for deployment.
          </p>

          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <div className="px-6 py-2 border border-cyan-500/20 bg-cyan-500/5 font-orbitron text-[10px] tracking-widest text-cyan-400 uppercase">Latency: 14ms</div>
            <div className="px-6 py-2 border border-cyan-500/20 bg-cyan-500/5 font-orbitron text-[10px] tracking-widest text-white uppercase">Secure_Init_Handshake</div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full max-w-md z-10">
          <div className="glass-card p-10 neon-border relative group">
            {/* Corner accents */}
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t border-r border-cyan-400 transition-all group-hover:w-12 group-hover:h-12"></div>
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b border-l border-cyan-400 transition-all group-hover:w-12 group-hover:h-12"></div>

            <div className="mb-8">
              <h3 className="text-3xl font-bold font-orbitron mb-2">Initialize Your AI Core</h3>
              <p className="text-white/40 text-sm font-rajdhani">Configure your identity parameters to begin neural integration.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-orbitron text-cyan-400/60 tracking-widest uppercase">Entity Designation</label>
                  <span className="text-[8px] font-orbitron text-white/20 tracking-widest uppercase italic">Required</span>
                </div>
                <div className="relative">
                  <HiOutlineFingerPrint className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60" size={20} />
                  <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Full Name" className="w-full input-cyber pl-12 font-rajdhani text-lg" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-orbitron text-cyan-400/60 tracking-widest uppercase">Communication Channel</label>
                  <span className="text-[8px] font-orbitron text-white/20 tracking-widest uppercase italic">Protocol: SMTP</span>
                </div>
                <div className="relative">
                  <MdAlternateEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60" size={18} />
                  <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="user@neural_net.com" className="w-full input-cyber pl-12 font-rajdhani text-lg" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-orbitron text-cyan-400/60 tracking-widest uppercase">Security Keyphrase</label>
                  <span className="text-[8px] font-orbitron text-white/20 tracking-widest uppercase italic">Encryption: AES-256</span>
                </div>
                <div className="relative">
                  <IoShieldCheckmarkOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                    placeholder="••••••••••••"
                    className="w-full input-cyber pl-12 pr-12 font-rajdhani text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400/40 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                  </button>
                </div>
              </div>

              <button className="w-full neon-button py-5 flex flex-col items-center justify-center relative overflow-hidden group">
                <span className="text-xl font-black font-orbitron tracking-tighter mb-0.5">EXECUTE INITIALIZATION</span>
                <BsLightningCharge className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl group-hover:scale-125 transition-transform" />
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-[10px] font-orbitron text-white/30 tracking-[0.2em] mb-3 uppercase">Existing node detected?</p>
              <Link to="/signin" className="text-white hover:text-cyan-400 font-bold border-b border-white/20 hover:border-cyan-400 transition-all font-orbitron text-xs tracking-widest uppercase pb-1">
                Reconnect Core (Login)
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center border-t border-white/5">
        <p className="text-[10px] font-orbitron text-white/20 tracking-[0.5em] uppercase">
          AJ-X Neural Network &copy; 2077 // All_Rights_Reserved
        </p>
      </footer>
    </div>
  );
};

export default SignUp;