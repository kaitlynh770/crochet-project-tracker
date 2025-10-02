import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import PieceGroup from '../components/PieceGroup';
import styles from '../pages_styling/ProjectDetails.module.scss';
import { Notes } from '../components/Notes';

function ProjectDetails({ projects, onGroupComplete, onPieceComplete, userId }) { // Destructuring props: ProjectDetails receives 'projects' from ProjectsPage, and the completion callbacks 'onGroupComplete' and 'onPieceComplete' are passed down to PieceGroup.
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  // Expand pieces by quantity with displayName and keep originalName
  const expandedPieces = useMemo(() => {
    if (!project || !project.pieces) return [];
    return project.pieces.flatMap((piece) =>
      Array.from({ length: piece.pieceQuantity }, (_, i) => ({
        ...piece,
        displayName: piece.pieceQuantity > 1 ? `${piece.pieceName} ${i + 1}` : piece.pieceName,
        originalName: piece.pieceName,
        quantity: piece.pieceQuantity,
      })),
    );
  }, [project]);

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

  if (!project) return <div>Project not found!</div>;
    /*
    Here's what's going on when we're mapping each piece as a PieceGroup:
    - We pass the group name, array of expanded pieces, and completion callbacks to PieceGroup.
    - PieceGroup manages piece completion state and calls the provided callbacks when pieces or the group are completed.
    - The completion callback functions (onGroupComplete, onPieceComplete) are defined in a parent component (so, Project Details) and passed down through ProjectDetails to PieceGroup, so PieceGroup can notify the parent when completion events occur.
    */
  return (
    <div className={styles.project_details}>
      <h1>{project.name} Pattern</h1>
      {project.notes && <Notes notes={project.notes} />}
      <div>
        {Object.entries(groupedPieces).map(([originalName, pieces]) => (
          <PieceGroup
            key={originalName}
            originalName={originalName}
            userId = {userId}
            projectId={projectId}
            pieces={pieces}
            onGroupComplete={onGroupComplete}
            onPieceComplete={onPieceComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectDetails;
