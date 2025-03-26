import { Routes, Route } from 'react-router-dom'
import AuthCallback from './pages/AuthCallback'
import Welcome from './pages/Welcome'

function App() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/welcome" element={<Welcome />} />
      {/* Other routes */}
    </Routes>
  )
}