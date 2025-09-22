import { useNavigate, Link } from 'react-router-dom';
import Project from '../components/Project';
import styles from '../pages_styling/AllProjects.module.scss'
import confusedBear from '../assets/bear.gif';
import confusedRabbit from '../assets/Confused Rabbit Sticker.gif';
import confusedBunny from '../assets/Confused Bunny Sticker.gif';
function AllProjects({projects}){
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
            {projects.length > 0 &&
            <h1>
                All Projects
            </h1>
            }
            <div className = {styles.all_projects}>
                {projects.length == 0 &&
                    <div className = {styles.no_projects}>
                        <img src = {confusedBear} />
                        <h2>
                            Hmm, seems like you don't have any projects. Why not try <Link to = "/projects/new">creating one?</Link>
                        </h2>
                    </div>
                }
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
