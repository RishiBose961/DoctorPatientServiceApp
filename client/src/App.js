import './App.css';
import { Routes, Route } from "react-router-dom"
import Authentication from './pages/Authentication'
import Community from './pages/Community'
import SymptomsMenu from './pages/SymptomsMenu'

function App() {
  return (
    <div className="bg-bgprimary flex">
      <Routes>
        <Route path="/" element={<Authentication />}/>
        <Route path="/symptoms" element={<SymptomsMenu />}/>
        <Route path="/community" element={<Community />}/>
      </Routes>
    </div>
  )
}

export default App;
