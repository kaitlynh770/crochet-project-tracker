import { useParams } from 'react-router-dom';
import styles from '../pages_styling/ProjectDetails.module.scss';
function ProjectDetails({projects}){
    console.log(projects)
    const { projectId } = useParams();
    const id = Number(projectId)
    const project = projects.find(p => p.id === id);
    console.log('projectId from params:', projectId, typeof projectId);
    console.log('project ids:', projects.map(p => typeof p.id));
    if(!project) return <div>Project not found!</div>;
    console.log(project)
    return(
    <div className = {styles.project_details}>
        <h1>{project.name} Pattern</h1>
        <div>
            {project.pieces.map((p, idx) => (
            <div key={idx}>
                <p>Name: {p.name}</p>
                <p>Rounds: {p.rounds}</p>
                {p.quantity && <p>Quantity: {p.quantity}</p>}
            </div>
            ))}
        </div>
        {project.notes && <p>Notes: {project.notes}</p>}
    </div>
    )
}
export default ProjectDetails
