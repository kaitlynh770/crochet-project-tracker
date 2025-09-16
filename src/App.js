import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import ProjectsPage from './components/ProjectsPage';
import Login from './components/Login';
import './global_styles/global.scss'
function App() {
  return (
    <div className="App">
      <div className = "navigate">
        <NavBar />
        <div className = "main-content">
          <Login />
          {/* <ProjectsPage /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
