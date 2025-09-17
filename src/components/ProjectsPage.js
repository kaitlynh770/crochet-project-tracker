import NewProject from "../pages/NewProject"
import AllProjects from '../pages/AllProjects';
import ProjectDetails from '../pages/ProjectDetails';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../global_styles/global.scss'
import styles from './ProjectsPage.module.scss'
import miffy from '../assets/miffy_keychain.jpeg'
import my_melody from '../assets/my_melodys.jpg'
import { Routes, Route, useNavigate } from 'react-router-dom';

function ProjectsPage ({user, onLogout}) {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    // const [projects, setProjects] = useState([
    //     {
    //         id: 1,
    //         name: 'Tulip Musie Bunnie',
    //         projectImg: miffy,
    //         pieces: [
    //             {
    //                 name: 'Head',
    //                 rounds: 10,
    //                 quantity: 1
    //             },
    //             {
    //                 name: 'Ears',
    //                 rounds: 6,
    //                 quantity: 2
    //             }
    //         ],
    //         notes: ""
    //     },
    //     {
    //         id: 2,
    //         name: 'Winter My Melody',
    //         projectImg: my_melody,
    //         pieces: [
    //             {
    //                 name: 'Head',
    //                 rounds: 15,
    //                 quantity: 1
    //             },
    //             {
    //                 name: 'Arms',
    //                 rounds: 8,
    //                 quantity: 2
    //             },
    //             {
    //                 name: 'Ears',
    //                 rounds: 12,
    //                 quantity: 2
    //             }
    //         ],
    //         notes: ""
    //     }
    // ])
    const fetchProjects = async () => {
        if(user?.uid){
            const querySnapshot = await getDocs(collection(db, "users", user.uid, "projects"));
            setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})))
        }
    };
    useEffect(() => {
        fetchProjects();
    }, [user]);


    const addProject = (project) => {
        const normalizedPieces = project.pieces.map(piece => ({ //we have to map pieces to make sure we have the correct property names
            name: piece.pieceName,
            quantity: piece.pieceQuantity,
            rounds: piece.pieceRounds,
            id: piece.id,
        }));
        setProjects(previous => [
            ...previous,
            {...project, id:Date.now(), pieces: normalizedPieces}
        ])
        alert("Project sucessfully added!");
        console.log({project});
        navigate('/projects');
    }

    return (
        <div className = "main-content">
            <div className = {styles.welcome_logout_container}>
                <h3>Welcome back, {user.displayName}</h3>
                <button onClick = {onLogout}>Logout</button>
            </div>
          <Routes>
            <Route path = "/projects" element = {<AllProjects user = {user} projects = {projects} />} />
            <Route path="projects/new" element={<NewProject user={user} onProjectAdded={fetchProjects} />} />
            <Route path = "projects/:projectId" element = {<ProjectDetails projects = {projects}/>} />
          </Routes>
        </div>
    )
}
export default ProjectsPage;
