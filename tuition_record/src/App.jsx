import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import {Home} from './components/Home'
import {Login} from './components/Login'
import {StudentDetails} from './components/StudentDetails'
function App() {
  return (
    <div className="App">

      <Routes>
    <Route path="/" element={<Login />} ></Route>
    <Route path="/home" element={<Home />} ></Route>
     <Route path="/home/:studentId" element={<StudentDetails/>}></Route> 
      <Route path="*" element={<div>404 page not found </div>} ></Route>   
      </Routes>
      
   
    </div>
  );
}

export default App;
