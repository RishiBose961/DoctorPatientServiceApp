import './App.css';
import { Routes, Route } from "react-router-dom"
import Authentication from './pages/Authentication'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Authentication />}/>
      </Routes>
    </div>
  )
}

export default App;
