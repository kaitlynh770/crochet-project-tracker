import NewProject from '../pages/NewProject';
import AllProjects from '../pages/AllProjects';
import ProjectDetails from '../pages/ProjectDetails';
import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../global_styles/global.scss';
import styles from './ProjectsPage.module.scss';
import { Routes, Route } from 'react-router-dom';

function ProjectsPage({ user, onLogout }) {
  const [projects, setProjects] = useState([]);

  // wrap in useCallback so that the call gets updated when user updates.
  // NOTE: this is not required when using react-compiler.
  // @see https://react.dev/learn/react-compiler
  const fetchProjects = useCallback(async () => {
    if (user?.uid) {
      const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'projects'));
      setProjects(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
  }, [user]);

  useEffect(() => { //runs whenever fetchProjects or user changes, calls fetchProjects if there is a user
    if (user) {
      fetchProjects();
    }
  }, [fetchProjects, user]);

  return (
    <div className="main-content">
      <div className={styles.welcome_logout_container}>
        <h3>Welcome back, {user.displayName}</h3>
        <button onClick={onLogout}>Logout</button>
      </div>
      <Routes>
        <Route path="/projects" element={<AllProjects projects={projects} />} />
        <Route
          path="projects/new"
          element={<NewProject user={user} onProjectAdded={fetchProjects} />}
        />
        <Route path="projects/:projectId" element={<ProjectDetails projects={projects} />} />
      </Routes>
    </div>
  );
}
export default ProjectsPage;
