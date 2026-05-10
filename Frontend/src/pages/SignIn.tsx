import { Link, useNavigate } from 'react-router-dom';
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/useUser';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, loading,handleLogin}=useUser()

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      await handleLogin({email,password})
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#05070a]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[5%] w-64 h-32 border border-cyan-500/20 glass-card p-4 hidden lg:block">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-[10px] font-orbitron text-cyan-400">AJ-X HEALTH: 98%</span>
          </div>
          <div className="flex items-end gap-1 h-12">
            {[40, 60, 45, 80, 55, 70].map((h, i) => (
              <div key={i} className="flex-1 bg-cyan-500/30" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>

        <div className="absolute top-[30%] right-[5%] w-72 h-40 border border-cyan-500/20 glass-card p-4 hidden lg:block">
          <div className="w-full h-2 bg-cyan-900/50 rounded-full mb-4 overflow-hidden">
            <div className="w-[70%] h-full bg-cyan-400"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-cyan-500/10 rounded"></div>
            <div className="h-2 w-full bg-cyan-500/10 rounded"></div>
            <div className="h-2 w-[80%] bg-cyan-500/10 rounded"></div>
          </div>
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 aspect-square bg-cyan-500/20"></div>
            ))}
          </div>
        </div>

        {/* Floating grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6 py-12 flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-cyan-400 flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(0,243,255,0.5)]">
            <div className="w-10 h-10 border border-cyan-400/50 flex items-center justify-center -rotate-45 bg-cyan-400/10">
              <div className="w-4 h-4 bg-cyan-400 rounded-sm rotate-45 shadow-[0_0_10px_#00f3ff]"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold font-orbitron tracking-[0.3em] text-white neon-glow-cyan mb-1">AJ-X</h1>
          <p className="text-[10px] font-orbitron tracking-[0.5em] text-cyan-400/60 uppercase">Neural Interface Access</p>
        </div>

        {/* Form Card */}
        <div className="w-full glass-card p-8 neon-border relative">
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50"></div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-orbitron text-cyan-400/60 tracking-widest uppercase mb-2">Identity Hash</label>
              <div className="relative">
                <MdAlternateEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder="user@aj-x.core"
                  className="w-full input-cyber pl-12 font-rajdhani text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-orbitron text-cyan-400/60 tracking-widest uppercase mb-2">Encryption Key</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="hidden" />
                <div className="w-4 h-4 border border-cyan-400/50 flex items-center justify-center group-hover:border-cyan-400 transition-all">
                  <div className="w-2 h-2 bg-cyan-400 scale-0 transition-transform"></div>
                </div>
                <span className="text-[10px] font-orbitron text-cyan-400/60 tracking-widest uppercase">Persist Session</span>
              </label>
              <button type="button" className="text-[10px] font-orbitron text-cyan-400 hover:text-white tracking-widest uppercase transition-colors">Restore Key?</button>
            </div>

            <button className="w-full neon-button py-4 flex items-center justify-center gap-2 group">
              <span>Authorize Link</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-cyan-400/10 flex flex-col items-center gap-4">
            <div className="flex justify-between w-full text-[8px] font-orbitron text-cyan-400/40 tracking-[0.2em] uppercase">
              <span>• AJ-X Secure Link: Active</span>
              <span>Proto: AES-256-GCM</span>
            </div>
            <p className="text-xs text-white/60">
              Unregistered node? <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-bold ml-1">Initiate Sequence</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;