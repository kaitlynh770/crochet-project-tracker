import { useParams } from 'react-router-dom'
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
        <div>
            <h1>
                {project.name}
            </h1>
        </div>
    )
}
export default ProjectDetails
