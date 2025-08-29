import {useState} from 'react';
import NewProject from "../pages/NewProject"
import AllProjects from '../pages/AllProjects';
import '../global_styles/global.scss'
import miffy from '../assets/miffy_keychain.jpeg'
import my_melody from '../assets/my_melodys.jpg'
import { Routes, Route, useNavigate } from 'react-router-dom';

function ProjectsPage () {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([
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
    ])

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
        navigate('/projects')
        console.log(
            `Project being added is called: ${project.name} with ${project.pieces.length} pieces which include ${project.pieces[0].pieceQuantity} ${project.pieces[0].pieceName} with ${project.pieces[0].pieceRounds} rounds.`
        );
        if (project.pieces && project.pieces.length > 0) {
            console.log(
                `Project being added is called: ${project.name} with ${project.pieces.length} pieces which include ${project.pieces[0].quantity} ${project.pieces[0].name} with ${project.pieces[0].rounds} rounds.`
            );
            console.log("First piece object:", project.pieces[0]);
        }
        else {
            console.log("No pieces found in project.pieces");
        }
    }

    return (
        // <div>
        //     <NewProject onSave = {addProject} />
        //     <AllProjects projects = {projects} />
        // </div>
                <div className = "main-content">
          <Routes>
            <Route path = "/projects" element = {<AllProjects projects = {projects}/>} />
            <Route path = "projects/new" element = {<NewProject onSave = {addProject} />} />
          </Routes>
        </div>
    )
}
export default ProjectsPage;
