import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import styles from '../pages_styling/ProjectDetails.module.scss';
import complete from '../assets/check-mark.png';
import redo from '../assets/redo.png';

function ProjectDetails({ projects }) {
  const [roundsCompleted, setRoundsCompleted] = useState([]); //create an array of arrays (so a 2d array) where each row represents a piece and it's rounds
  //[
  // [true, true, false, false, false]      this refers to piece 1 with 2 rounds completed
  // [false, false, false, false, false]    this refers to piecee 2 with 0 rounds completed
  //]
  const { projectId } = useParams(); //get the projectId via parameters
  const id = Number(projectId); //convert it to a number because that's how its stored in the project object
  const project = projects.find(p => p.id === id); //find the project we're clicking on based off of the id passed to us

  // Expand pieces by quantity with displayName and keep originalName
  const expandedPieces = useMemo(() => { //we need to calcuate which pieces will need to be expanded or not, this is something that won't really change too so using useMemo is a great option for this. We wouldn't want this calculation (creating the newArray with expanded pieces) calculated everytime on a render so we should Memoize it so it's cached and ONLY changes if project changes (which it won't)
    if (!project || !project.pieces) return []; //safety check, if there is no project or no pieces then return
    return project.pieces.flatMap(piece => //this is a method that both maps and flattens (merges nested arrays into one array)
      Array.from({ length: piece.quantity }, (_, i) => ({ //so for each piece in the project.pieces array, we're going to create another array that's the length of that piece's quantity
        ...piece,
        displayName: piece.quantity > 1 ? `${piece.name} ${i + 1}` : piece.name, //if the quantity is more than 1 than we label it as {piece} {quantity} else if it's just one, just show the name
        originalName: piece.name,
        quantity: piece.quantity,
      }))
    );
  }, [project]);
  //so basically what's happening in the flatMap is that if a piece has a quantity larger than 1 (let's use ears for an example, there's 2 ears) the flatMap and Array.from will now split Ears into 2 separate pieces: Ear 1 and Ear 2
  //the expanded pieces are still being grouped via the original piece name (called originalName)

  useEffect(() => {
    if (expandedPieces.length > 0) { //if there's something in the expandedPieces array
      setRoundsCompleted( //we're going to map through the array and set all the rounds to false
        expandedPieces.map(piece => Array(piece.rounds).fill(false))
      );
    }
  }, [expandedPieces]); //this should only happen once, when the project initially gets loaded in

  const handleRoundClick = (pieceIdx, roundIdx) => {
    setRoundsCompleted(prev => //this is referring to the previous state of the pieces array
      prev.map((pieceRounds, idx) =>
        idx === pieceIdx //if this is the piece we're looking for
          ? pieceRounds.map((completed, rIdx) =>
              rIdx === roundIdx ? !completed : completed //if this is the round we're looking to toggle, either change the state or leave it alone
            )
          : pieceRounds //if it's not the round we're looking for leave it alone
      )
    );
  };

  const redoPiece = (pieceIdx) => {
    setRoundsCompleted(prev=>
        prev.map((pieceRounds, idx) =>
            idx === pieceIdx
            ? Array(pieceRounds.length).fill(false)
            : pieceRounds
        )
    )
  }

  const isPieceComplete = pieceIdx => //check if the piece is complete
    roundsCompleted[pieceIdx] ? roundsCompleted[pieceIdx].every(Boolean) : false; //if all rounds for a piece are coming back as true then return true else return false

  // Group expanded pieces by originalName
  const groupedPieces = useMemo(() => {
    const groups = {}; //create an empty object called groups
    expandedPieces.forEach((piece, idx) => { //for each piece in the expanded pieces array
      if (!groups[piece.originalName]) { //if groups object doesn't have a key for piece.OriginalName
        groups[piece.originalName] = []; //create an empty array for that piece
      }
      groups[piece.originalName].push({ ...piece, expandedIdx: idx }); //if the key does exist, push the the current piece into the group AND the expandedIdx (original index of the piece in expandedPieces)
    });
    return groups; //when everything is finished, return groups
    /*
    this is what expandedPieces looks like:
    [
        { originalName: "Ears", displayName: "Ears 1", ... },
        { originalName: "Ears", displayName: "Ears 2", ... },
        { originalName: "Arm", displayName: "Arm", ... }
    ]
    and this is what groupedPieces will look like:
    {
        "Ears": [
            { originalName: "Ears", displayName: "Ears 1", expandedIdx: 0, ... },
            { originalName: "Ears", displayName: "Ears 2", expandedIdx: 1, ... }
        ],
        "Arm": [
            { originalName: "Arm", displayName: "Arm", expandedIdx: 2, ... }
        ]
    }
    */
  }, [expandedPieces]);

  // Helper to check if all sub-pieces in a group are complete
  const isGroupComplete = (pieces) => {
    return pieces.every(p => isPieceComplete(p.expandedIdx));
  };

  if (!project) return <div>Project not found!</div>; //if there isn't a project then we return this statement

  return (
    <div className={styles.project_details}>
      <h1>{project.name} Pattern</h1>
      {/* <img src = {project?.projectImg} /> */}
        {project.notes &&
            <div>
                <h2>
                    Notes:
                </h2>
                <ul>
                    {project.notes
                    .split('•')
                    .map(item => item.trim())
                    .filter(item => item)
                    .map((item, idx) =>(
                        <li key = {idx}>{item}</li>
                    ))}
                </ul>
            </div>}
      <div>
        {Object.entries(groupedPieces).map(([originalName, pieces]) => { //converts the groupedPieces into key-value pairs ({head: [head1], arms: [arms1, arms2]})
          const groupComplete = isGroupComplete(pieces); //checks if a group has been completed yet (all rounds are complete)
          return (
            <div key={originalName} style={{ marginBottom: '1.5rem' }}>
              {/* Show piece name once if quantity > 1, greyed out if all sub-pieces complete */}
              {pieces[0].quantity > 1 ? (
                <h2 style={{ opacity: groupComplete ? 0.5 : 1 }}>{originalName}</h2>
              ) : null}
              {/* Render sub-pieces */}
              {pieces.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    opacity: isPieceComplete(p.expandedIdx) ? 0.5 : 1,
                    marginLeft: pieces[0].quantity > 1 ? '1.5rem' : 0,
                    marginBottom: '1rem',
                  }}
                >
                  {/* If quantity > 1, show displayName (e.g., Ear 1), else just name */}
                  <div className = {styles.piece_interactions}>
                    <h3>{pieces[0].quantity > 1 ? p.displayName : p.name}</h3>
                        <img src = {redo} onClick = {() => redoPiece(p.expandedIdx)} />
                        <img src = {complete} />
                  </div>
                  <div className={styles.round_text}>
                    <p>Total Rounds: {p.rounds}</p>
                    <p>
                      Progress:{' '}
                      {roundsCompleted[p.expandedIdx]?.filter(Boolean).length || 0} of{' '}
                      {p.rounds}
                    </p>
                    <div className={styles.rounds_container}>
                      {[...Array(p.rounds)].map((_, i) => (
                        <button
                          key={i}
                          className={
                            roundsCompleted[p.expandedIdx] &&
                            roundsCompleted[p.expandedIdx][i]
                              ? styles.rounds_clicked
                              : styles.rounds_unclicked
                          }
                          onClick={() => handleRoundClick(p.expandedIdx, i)}
                        >
                          {roundsCompleted[p.expandedIdx] &&
                          roundsCompleted[p.expandedIdx][i]
                            ? '✓'
                            : `${i + 1}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectDetails;
