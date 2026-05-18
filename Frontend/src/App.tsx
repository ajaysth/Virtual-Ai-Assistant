import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Protected from './components/Protected';
import Customize from './pages/Customize';
import { useUser } from './contexts/useUser';
import Customize2 from './pages/Customize2';

const App = () => {

  const {user}= useUser()
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