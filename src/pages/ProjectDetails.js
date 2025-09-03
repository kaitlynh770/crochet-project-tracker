import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import styles from '../pages_styling/ProjectDetails.module.scss';

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
      Array.from({ length: piece.quantity }, (_, i) => ({ //so for each piece in the project.pieces array, we're going to create another array that's the lengh of that piece's quantity
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
    if (expandedPieces.length > 0) {
      setRoundsCompleted(
        expandedPieces.map(piece => Array(piece.rounds).fill(false))
      );
    }
  }, [expandedPieces]);

  const handleRoundClick = (pieceIdx, roundIdx) => {
    setRoundsCompleted(prev =>
      prev.map((pieceRounds, idx) =>
        idx === pieceIdx
          ? pieceRounds.map((completed, rIdx) =>
              rIdx === roundIdx ? !completed : completed
            )
          : pieceRounds
      )
    );
  };

  const isPieceComplete = pieceIdx =>
    roundsCompleted[pieceIdx] ? roundsCompleted[pieceIdx].every(Boolean) : false;

  // Group expanded pieces by originalName
  const groupedPieces = useMemo(() => {
    const groups = {};
    expandedPieces.forEach((piece, idx) => {
      if (!groups[piece.originalName]) {
        groups[piece.originalName] = [];
      }
      groups[piece.originalName].push({ ...piece, expandedIdx: idx });
    });
    return groups;
  }, [expandedPieces]);

  // Helper to check if all sub-pieces in a group are complete
  const isGroupComplete = (pieces) => {
    return pieces.every(p => isPieceComplete(p.expandedIdx));
  };

  if (!project) return <div>Project not found!</div>;

  return (
    <div className={styles.project_details}>
      <h1>{project.name} Pattern</h1>
      <div>
        {Object.entries(groupedPieces).map(([originalName, pieces]) => {
          const groupComplete = isGroupComplete(pieces);
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
                  <h3>{pieces[0].quantity > 1 ? p.displayName : p.name}</h3>
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
      {project.notes && <p>Notes: {project.notes}</p>}
    </div>
  );
}

export default ProjectDetails;
