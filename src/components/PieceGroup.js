import { useState, useEffect } from 'react';
import PieceItem from './PieceItem';

function PieceGroup({ originalName, pieces, onGroupComplete, onPieceComplete }) {
  // Each piece manages its own completion state, but we track group completion here

  const [pieceStates, setPieceStates] = useState(pieces.map((_) => ({ completed: false }))); //set all pieces to not complete

  // Handler for when a piece is completed
  // The logic for handling piece completion lives in PieceGroup, the callback (handlePieceComplete) is passed down to PieceItem
  // When PieceItem is completed, call the onPieceComplete prop (passed from ProjetDetails). If the onPieceComplete callback exists, then we notify the parent (ProjectDetails)
  const handlePieceComplete = (pieceIdx, completed) => {
    setPieceStates((prev) => {
      const newStates = [...prev];
      newStates[pieceIdx] = { completed };
      return newStates;
    });
    if (onPieceComplete) onPieceComplete(originalName, pieceIdx, completed);
  };

  // Check if all pieces in the group are complete
  const groupComplete = pieceStates.every((s) => s.completed);

  useEffect(() => {
    if (groupComplete && onGroupComplete) {
      onGroupComplete(originalName);
    }
  }, [groupComplete, onGroupComplete, originalName]); //call onGroupComplete when the group of pieces is complete                                                        

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {pieces[0].quantity > 1 ? (
        <h2 style={{ opacity: groupComplete ? 0.5 : 1 }}>{originalName}</h2>
      ) : null}
      {pieces.map((p, idx) => (
        <PieceItem
          key={idx}
          piece={p}
          isComplete={pieceStates[idx].completed}
          onComplete={(completed) => handlePieceComplete(idx, completed)}
          showDisplayName={pieces[0].pieceQuantity > 1}
        />
      ))}
    </div>
  );
}

export default PieceGroup;
