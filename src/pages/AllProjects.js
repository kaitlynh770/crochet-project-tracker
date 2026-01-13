import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Project from '../components/Project';
import styles from '../pages_styling/AllProjects.module.scss';
import confusedBear from '../assets/bear.gif';

function AllProjects({ projects }) {
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    if (!contextMenu) return;

    const handleClickOutside = () => {
      setContextMenu(null);
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);

  const handleRightClick = (e, projectId) => {
    e.preventDefault(); //prevent default menu from opening
    e.stopPropagation(); //prevent event bubbling, prevent navigation in particular from happening

    setContextMenu({
      projectId,
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div>
      {projects.length > 0 && <h1>All Projects</h1>}
      <div className={styles.all_projects}>
        {projects.length === 0 && (
          <div className={styles.no_projects}>
            <img src={confusedBear} alt="Confused Bear" />
            <h2>
              Hmm, seems like you don't have any projects. Why not try{' '}
              <Link to="/projects/new">creating one?</Link>
            </h2>
          </div>
        )}
        {projects.map((project) => (
          <div
            key={`project-${project.id}-${project.name}`}
            style={{ cursor: 'pointer' }}
            className={styles.project_wrapper}
          >
            <Project
              key={`project-${project.id}-${project.name}`}
              name={project.name}
              projectImg={project.projectImg}
              pieces={project.pieces}
              id={project.id}
              onRightClick={(e) => handleRightClick(e, project.id)}
            />
          </div>
        ))}
      </div>
      {contextMenu && (
        <ul
          className={styles.context_menu}
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <li
            onClick={() => {
              console.log('Replace image for project:', contextMenu.projectId);
              setContextMenu(null);
            }}
          >
            Replace Image
          </li>
        </ul>
      )}
    </div>
  );
}
export default AllProjects;
