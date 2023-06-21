import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
