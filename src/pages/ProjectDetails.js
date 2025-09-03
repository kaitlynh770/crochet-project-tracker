import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../pages_styling/ProjectDetails.module.scss';
function ProjectDetails({projects}){
    console.log(projects)
    const [clicked, setClicked] = useState(false)
    const [roundsCompleted, setRoundsCompleted] = useState([]); //rounds is an array of arrays that is one per piece with booleans for each of the rounds
    //outer array represents the piece and the inner array represents the state of the rounds
    //[
    //  [true, false, false, false, false, false],    this first array refers to piece #1 (like an arm) the values inside refer to the state of each round (first round is completed, the rest of the rounds aren't completed yet)
    //  [false, false, false, false, false false]     piece #2
    //]
    const { projectId } = useParams();
    const id = Number(projectId)
    const project = projects.find(p => p.id === id);
    console.log('projectId from params:', projectId, typeof projectId);
    console.log('project ids:', projects.map(p => typeof p.id));
        useEffect(() => {
        if(project && project.pieces){ //when we have a valid project and we know how many pieces there are in the project, we can map and fill it all with false to initialize it
            setRoundsCompleted(
                project.pieces.map(piece => Array(piece.rounds).fill(false))
            )
        }
    }, [project])

    const handleRoundClick = (pieceIdx, roundIdx) => {
        setRoundsCompleted(prev =>
            prev.map((pieceRounds, idx) =>
            idx === pieceIdx
                ? pieceRounds.map((completed, rIdx) => (rIdx === roundIdx ? !completed : completed))
                : pieceRounds
            )
        );
    };
    if(!project) return <div>Project not found!</div>;
    console.log(project)
    console.log(clicked);

    const isPieceComplete = pieceIdx => {
        return roundsCompleted[pieceIdx] ? roundsCompleted[pieceIdx].every(Boolean) : false;
    };
    return(
    <div className = {styles.project_details}>
        <h1>{project.name} Pattern</h1>
        <div>
            {project.pieces.map((p, idx) => (
                <div
                    key={idx}
                    style={{
                    opacity: isPieceComplete(idx) ? 0.5 : 1
                    }}
                >
                    <h2>{p.name} (make {p.quantity})</h2>
                    <div className={styles.round_text}>
                    <p>Total Rounds: {p.rounds}</p>
                    <p>Progress: 0 of {p.rounds} completed</p>
                    <div className={styles.rounds_container}>
                        {[...Array(p.rounds)].map((_, i) => (
                        <button
                            key={i}
                            className={
                            roundsCompleted[idx] && roundsCompleted[idx][i]
                                ? styles.rounds_clicked
                                : styles.rounds_unclicked
                            }
                            onClick={() => handleRoundClick(idx, i)}
                        >
                            {roundsCompleted[idx] && roundsCompleted[idx][i] ? '✓' : `${i + 1}`}
                        </button>
                        ))}
                    </div>
                    </div>
                </div>
                ))}
        </div>
        {project.notes && <p>Notes: {project.notes}</p>}
    </div>
    )
}
export default ProjectDetails
