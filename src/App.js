import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import NewProject from './pages/NewProject';
import AllProjects from './pages/AllProjects';
import { Routes, Route } from 'react-router-dom';
import './global_styles/global.scss'
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path = "/projects" element = {<AllProjects />} />
        <Route path = "projects/new" element = {<NewProject />} />
      </Routes>
    </div>
  );
}

export default App;
