import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import NewProject from './pages/NewProject';
import AllProjects from './pages/AllProjects';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path = "/projects" element = {<AllProjects />} />
        <Route path = "projects/new" element = {<NewProject />} />
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
