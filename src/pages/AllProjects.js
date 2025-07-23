import React from 'react';
import Project from '../components/Project';
import miffy from '../assets/miffy_keychain.jpeg'
import my_melody from '../assets/my_melodys.jpg'
import styles from '../pages_styling/AllProjects.module.scss'
function AllProjects(){
    const projects = [
        {
            id: 1,
            name: 'Tulip Musie Bunnie',
            projectImg: miffy,
            pieces: [
                {
                    name: 'Head',
                    rounds: 10,
                },
                {
                    name: 'Ears',
                    rounds: 6,
                    quantity: 2
                }
            ]
        },
        {
            id: 2,
            name: 'Winter My Melody',
            projectImg: my_melody,
            pieces: [
                {
                    name: 'Head',
                    rounds: 15
                },
                {
                    name: 'Arms',
                    rounds: 8,
                    quantity: 2
                },
                {
                    name: 'Ears',
                    rounds: 12,
                    quantity: 2
                }
            ]
        }
    ]
    return(
        <div>
            <h1>
                All Projects
            </h1>
            <div className= {styles.all_projects} >
                {projects.map((project, index) => {
                    return(
                        <Project key={`project-${project.id}-${project.name}`} name = {project.name} projectImg={project.projectImg} pieces={project.pieces} />
                    )
                })}
            </div>
        </div>
    )
}
export default AllProjects
