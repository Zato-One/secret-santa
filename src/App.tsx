import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import RevealPage from './pages/RevealPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reveal/:encryptedData" element={<RevealPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
