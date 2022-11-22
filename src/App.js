import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from './Component/Search';
import MainPage from './Component/MainPage';

function App() {
  return (
    
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;
