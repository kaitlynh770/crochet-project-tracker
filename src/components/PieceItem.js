import React, { useState, useEffect } from 'react';
import complete from '../assets/check-mark.png';
import redo from '../assets/redo.png';
import styles from '../pages_styling/ProjectDetails.module.scss';
import RoundsButtons from './Rounds';

function PieceItem({ piece, isComplete, onComplete, showDisplayName }) {
  // Manage round completion state locally
  const [rounds, setRounds] = useState(Array(piece.pieceRounds).fill(false));

  // Mark piece as complete if all rounds are true
  useEffect(() => {
    if (onComplete) onComplete(rounds.every(Boolean));
    // eslint-disable-next-line
  }, [rounds]);

  const handleRoundClick = (roundIdx) => {
    setRounds((prev) => prev.map((completed, idx) => (idx === roundIdx ? !completed : completed)));
  };

  const redoPiece = () => {
    setRounds(Array(piece.pieceRounds).fill(false));
  };

  const completePiece = () => {
    setRounds(Array(piece.pieceRounds).fill(true));
  };

  return (
    <div
      style={{
        opacity: isComplete ? 0.5 : 1,
        marginLeft: showDisplayName ? '1.5rem' : 0,
        marginBottom: '1rem',
      }}
    >
      <div className={styles.piece_interactions}>
        <h3>{showDisplayName ? piece.displayName : piece.pieceName}</h3>
        <img src={redo} onClick={redoPiece} alt="Redo" />
        <img src={complete} onClick={completePiece} alt="Complete" />
      </div>
      <div className={styles.round_text}>
        <p>Total Rounds: {piece.pieceRounds}</p>
        <p>
          Progress: {rounds.filter(Boolean).length} of {piece.pieceRounds}
        </p>
        <RoundsButtons
          pieceRounds={piece.pieceRounds}
          roundsCompleted={rounds}
          handleRoundClick={handleRoundClick}
        />
      </div>
    </div>
  );
}

export default PieceItem;
