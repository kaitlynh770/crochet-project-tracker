import { Link } from 'react-router-dom';
import Project from '../components/Project';
import styles from '../pages_styling/AllProjects.module.scss';
import confusedBear from '../assets/bear.gif';

function AllProjects({ projects }) {
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllProjects;
