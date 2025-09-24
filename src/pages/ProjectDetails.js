import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import PieceGroup from '../components/PieceGroup';
import styles from '../pages_styling/ProjectDetails.module.scss';
import { Notes } from '../components/Notes';

function ProjectDetails({ projects, onGroupComplete, onPieceComplete }) {
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

  return (
    <div className={styles.project_details}>
      <h1>{project.name} Pattern</h1>
      {project.notes && <Notes notes={project.notes} />}
      <div>
        {Object.entries(groupedPieces).map(([originalName, pieces]) => (
          <PieceGroup
            key={originalName}
            originalName={originalName}
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
