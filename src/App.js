import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import ProjectsPage from './components/ProjectsPage';
import NewProject from './pages/NewProject';
import AllProjects from './pages/AllProjects';
import { Routes, Route } from 'react-router-dom';
import './global_styles/global.scss'
function App() {
  return (
    <div className="App">
      <div className = "navigate">
        <NavBar />
        <div className = "main-content">
          <ProjectsPage />
        </div>
      </div>
    </div>
  );
}

export default App;
