import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useUser } from "../contexts/useUser";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { handleLogout } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-10 border-b border-[rgba(0,243,255,0.1)] bg-[rgba(5,7,10,0.8)] backdrop-blur-md z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold font-orbitron tracking-[0.2em] text-white">AJ-X</h1>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-orbitron tracking-widest text-[rgba(255,255,255,0.6)] uppercase">System Status:</span>
          <span className="text-[10px] font-orbitron tracking-widest text-[#00f3ff] uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse shadow-[0_0_5px_#00f3ff]"></span>
            Online
          </span>
        </div>

        <div className="flex items-center gap-4 text-white">
          <button 
            onClick={() => navigate("/customize")} 
            className="py-1.5 px-4 border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-400 font-orbitron text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer rounded shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
          >
            Customize
          </button>
          
          <button 
            onClick={handleLogout} 
            className="py-1.5 px-4 border border-red-500/30 hover:border-red-500 bg-red-950/20 hover:bg-red-950/40 text-red-400 font-orbitron text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer rounded shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            Logout
          </button>

          <button className="p-2 hover:bg-[rgba(0,243,255,0.1)] rounded-full transition-all">
            <IoNotificationsOutline size={20} />
          </button>
          <button className="p-2 hover:bg-[rgba(0,243,255,0.1)] rounded-full transition-all">
            <HiOutlineUserCircle size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
