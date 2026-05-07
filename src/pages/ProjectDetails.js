import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import PieceGroup from '../components/PieceGroup';
import {
  CompleteProjectScissorOver,
  CompleteProjectScissorUnder,
} from '../components/CompleteProjectScissors';
import styles from '../pages_styling/ProjectDetails.module.scss';
import { Notes } from '../components/Notes';


function ProjectDetails({ projects, onGroupComplete, onPieceComplete, userId }) { // Destructuring props: ProjectDetails receives 'projects' from ProjectsPage, and the completion callbacks 'onGroupComplete' and 'onPieceComplete' are passed down to PieceGroup.
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  //expand pieces by quantity with displayName and keep originalName
  /*
    the number of pieces won't really change, so we can use useMemo here to cache the result and skip recalculation 
    unless expandedPieces changes. if we didn't have useMemo, everytime ProjectDetails gets rebuilt, groups would get 
    rebuilt as well even though it might not need to 
  */
  const expandedPieces = useMemo(() => {
    if (!project || !project.pieces) return [];
    return project.pieces.flatMap((piece) =>
      Array.from({ length: piece.pieceQuantity }, (_, i) => ({
        ...piece,
        instanceId: String(i),
        instanceIndex: i,
        displayName: piece.pieceQuantity > 1 ? `${piece.pieceName} ${i + 1}` : piece.pieceName,
        originalName: piece.pieceName,
        quantity: piece.pieceQuantity,
      })),
    );
  }, [project]);

  //group expanded pieces by originalName
  const groupedPieces = useMemo(() => {
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
      <button className={styles.complete_button} type="button">
        <span className={styles.complete_button__label}>Complete Project</span>

        <svg
          className={styles.complete_button__stitched}
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect
            className={styles.complete_button__stitched_rect}
            x="2"
            y="2"
            width="96"
            height="36"
            rx="0"
            ry="0"
            fill="none"
            vectorEffect="non-scaling-stroke"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="6 6"
          />
        </svg>

        <span className={styles.complete_button__scissor_under} aria-hidden="true">
          <CompleteProjectScissorUnder />
        </span>
        <span className={styles.complete_button__scissor_over} aria-hidden="true">
          <CompleteProjectScissorOver />
        </span>
        {/* Second pair: same clockwise lap, −50% delay → starts halfway around (always opposite pair A). */}
        <span className={`${styles.complete_button__scissor_under} ${styles.complete_button__scissor_under_b}`} aria-hidden="true">
          <CompleteProjectScissorUnder />
        </span>
        <span className={`${styles.complete_button__scissor_over} ${styles.complete_button__scissor_over_b}`} aria-hidden="true">
          <CompleteProjectScissorOver />
        </span>
      </button>
    </div>
  );
}

export default ProjectDetails;
