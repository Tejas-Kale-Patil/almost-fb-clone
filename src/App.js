// import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from './components/Feed/Feed';
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/feed' element={<Feed/>}/>
        </Routes>
      </Router>

        
    </div>
  );
}

export default App;
