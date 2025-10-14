import { auth } from '../src/firebase';
import { signOut } from 'firebase/auth';
import './App.css';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ProjectsPage from './components/ProjectsPage';
import Login from './components/Login';
import './global_styles/global.scss';

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    //listen for auth changes (this will let the user persist even on reload)
    //on the initial load (and on every reload), Firebase is gonna check if the user session exists
    //if not, the user is going to be null and get signed out
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user); // user is null if not logged in
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if(authLoading){
    return <div>Loading...</div>
  }

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
