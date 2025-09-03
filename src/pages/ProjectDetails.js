import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../pages_styling/ProjectDetails.module.scss';
function ProjectDetails({projects}){
    console.log(projects)
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
            setRoundsCompleted( //go thorugh the rounds array and for each round in a piece, we're going to create an array of the same number of rounds for each piece and fill it with false
                project.pieces.map(piece => Array(piece.rounds).fill(false))
            )
        }
    }, [project]) //project doesn't change so this'll only happen when everything is being loaded in (ideally)

    const handleRoundClick = (pieceIdx, roundIdx) => {
        setRoundsCompleted(prev => //prev refers to the previous state of the array of pieces + their rounds
            prev.map((pieceRounds, idx) =>
            idx === pieceIdx //this is the piece we want to update (the one we're clicking the rounds on)
                ? pieceRounds.map((completed, rIdx) =>
                (rIdx === roundIdx //if this is the round we wanna toggle
                ? !completed : completed)) //toggle the completion state otherwise leave it alone
                : pieceRounds //if this isn't the piece we're looking for, just leave it alone
            )
        );
    };
    if(!project) return <div>Project not found!</div>;

    //check if all the rounds in a piece at pieceIdx are completed
    const isPieceComplete = pieceIdx => { //takes in the current index of our piece in the roundsCompleted array
        return roundsCompleted[pieceIdx] ? roundsCompleted[pieceIdx].every(Boolean) : false; //ternary oprator, .every(Boolean) method checks if every element of the array is truthy
        //if anything in the array is found as false, it returns false
    };
    //when it comes to the progress bar, we're counting the number of true values in the roundsCompleted array to see a user's progress on the piece
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
                    <p>Progress: {roundsCompleted[idx]?.filter(Boolean).length || 0} of {p.rounds}</p>
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
