import React from 'react';
import PieceGroup from './PieceGroup';
import styles from '../pages_styling/ProjectDetails.module.scss';
import {Notes} from './Notes';

function ProjectDetails({ projects, roundsCompleted, groupedPieces, isGroupComplete, isPieceComplete, handleRoundClick, redoPiece, completePiece }) {
  if (!projects) return <div>Project not found!</div>;

  return (
    <div className={styles.project_details}>
      <h1>{projects.name} Pattern</h1>
      {projects.notes && (
        <Notes notes={projects.notes} />
      )}
      <div>
        {Object.entries(groupedPieces).map(([originalName, pieces]) => (
          <PieceGroup
            key={originalName}
            originalName={originalName}
            pieces={pieces}
            groupComplete={isGroupComplete(pieces)}
            isPieceComplete={isPieceComplete}
            roundsCompleted={roundsCompleted}
            handleRoundClick={handleRoundClick}
            redoPiece={redoPiece}
            completePiece={completePiece}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectDetails;
