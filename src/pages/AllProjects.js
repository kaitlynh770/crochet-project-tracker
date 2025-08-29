import React from 'react';
import Project from '../components/Project';
import miffy from '../assets/miffy_keychain.jpeg'
import my_melody from '../assets/my_melodys.jpg'
import styles from '../pages_styling/AllProjects.module.scss'
function AllProjects({projects}){
    return(
        <div>
            <h1>
                All Projects
            </h1>
            <div className= {styles.all_projects} >
                {projects.map((project) => {
                    return(
                        <Project key={`project-${project.id}-${project.name}`} name = {project.name} projectImg={project.projectImg} pieces={project.pieces} />
                    )
                })}
            </div>
        </div>
    )
}
export default AllProjects
