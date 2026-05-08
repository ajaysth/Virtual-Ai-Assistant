import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Protected from './components/Protected';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/signin" replace />} /> */}
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/' element={<Protected><Home /></Protected>} />
    </Routes>
  )
}

export default App