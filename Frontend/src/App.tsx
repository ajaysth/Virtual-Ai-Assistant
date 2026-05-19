import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Protected from './components/Protected';
import Customize from './pages/Customize';
import { useUser } from './contexts/useUser';
import Customize2 from './pages/Customize2';

const App = () => {

  const {user, loading}= useUser()

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#05070a] text-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Floating grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
        {/* Glowing loader */}
        <div className="relative w-24 h-24 rounded-full border-2 border-cyan-400/20 flex items-center justify-center p-2 animate-[pulse_2s_ease-in-out_infinite]">
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-[spin_3s_linear_infinite]"></div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-900/40 to-black flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,243,255,0.2)]">
            <div className="w-3 h-3 bg-cyan-400 rounded-sm rotate-45 shadow-[0_0_10px_#00f3ff] animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-[10px] font-orbitron tracking-[0.3em] text-cyan-400/80 uppercase animate-pulse">Synchronizing Neural Interface...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/signin" replace />} /> */}
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/' element={(user?.assistantImage && user?.assistantName)?<Home />:<Navigate to="/customize" />} />
      <Route path='/customize' element={<Protected><Customize /></Protected>} />
      <Route path='/customize2' element={<Protected><Customize2 /></Protected>} />
    </Routes>
  )
}

export default App