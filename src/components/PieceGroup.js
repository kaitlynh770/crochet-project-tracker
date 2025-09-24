import React, { useState, useEffect } from 'react';
import PieceItem from './PieceItem';

function PieceGroup({ originalName, pieces, onGroupComplete, onPieceComplete }) {
  // Each piece manages its own completion state, but we track group completion here
  const [pieceStates, setPieceStates] = useState(pieces.map((_) => ({ completed: false })));

  // Handler for when a piece is completed
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
  }, [groupComplete, onGroupComplete, originalName]);

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
