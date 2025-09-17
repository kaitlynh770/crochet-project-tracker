import { useNavigate } from 'react-router-dom';
import Project from '../components/Project';
import styles from '../pages_styling/AllProjects.module.scss'
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
function AllProjects({user, projects}){
    const navigate = useNavigate(); //this is what we'll use to navigate to a specific project
    //create function to look at project details
    const clickOnProject = (projectId) =>{
        navigate(`/projects/${projectId}`)
        //this will be tied to each projects onClick function
        //will navigate to a route that looks something like '/projects/id={project-id}
        //will then take the information of the project and map out each portion (each piece and rounds associted with it, etc)
    }
    return(
        <div>
            <h1>
                All Projects
            </h1>
            <div className = {styles.all_projects}>
                {projects.map((project) => (
                    <div key = {`project-${project.id}-${project.name}`} onClick = {() => clickOnProject(project.id)} style = {{cursor: 'pointer'}} className = {styles.project_wrapper} >
                        <Project key = {`project-${project.id}-${project.name}`} name = {project.name} projectImg = {project.projectImg} pieces = {project.pieces} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AllProjects
