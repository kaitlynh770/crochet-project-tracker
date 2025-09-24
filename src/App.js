import { auth } from '../src/firebase';
import { signOut } from 'firebase/auth';
import './App.css';
import NavBar from './components/NavBar';
import { useState } from 'react';
import ProjectsPage from './components/ProjectsPage';
import Login from './components/Login';
import './global_styles/global.scss';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  

  return (
    <div className="App">
      <div className="navigate">
        <NavBar />
        <div className="main-content">
          {!user ? (
            <Login setUser={setUser} />
          ) : (
            <ProjectsPage user={user} onLogout={handleLogout} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
