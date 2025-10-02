import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import complete from '../assets/check-mark.png';
import redo from '../assets/redo.png';
import styles from '../pages_styling/ProjectDetails.module.scss';
import RoundsButtons from './Rounds';

function PieceItem({ piece, isComplete, onComplete, showDisplayName, userId, projectId }) {
  // Each piece is now a unique instance (e.g., id: "123456_0")
  const [rounds, setRounds] = useState(Array(piece.pieceRounds).fill(false));

  useEffect(() => {
    async function fetchRoundProgress() {
      const pieceRef = doc(db, 'users', userId, 'projects', projectId, 'pieces', String(piece.id));
      const pieceSnapshot = await getDoc(pieceRef);
      if (pieceSnapshot.exists()) {
        const data = pieceSnapshot.data();
        if (data.roundProgress && Array.isArray(data.roundProgress)) {
          setRounds(data.roundProgress);
        }
      }
    }
    fetchRoundProgress();
  }, [piece.id, userId, projectId, piece.pieceRounds]);

  useEffect(() => {
    if (onComplete) onComplete(rounds.every(Boolean));
    // eslint-disable-next-line
  }, [rounds]);

  const updateProgress = async (newRounds) => {
    console.log('Updating piece with ID:', piece);
    setRounds(newRounds);
    const pieceRef = doc(db, 'users', userId, 'projects', projectId, 'pieces', String(piece.instanceId));
    await setDoc(pieceRef, { roundProgress: newRounds }, { merge: true });
  };

  const handleRoundClick = async (roundIdx) => {
    const newRounds = rounds.map((completed, idx) => (idx === roundIdx ? !completed : completed));
    await updateProgress(newRounds);
  };

  const redoPiece = async () => {
    const resetRounds = Array(piece.pieceRounds).fill(false);
    await updateProgress(resetRounds);
  };

  const completePiece = async () => {
    const allRounds = Array(piece.pieceRounds).fill(true);
    await updateProgress(allRounds);
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
        <h3>
          {showDisplayName ? piece.displayName : piece.pieceName}
          {piece.instanceIndex !== undefined ? ` #${piece.instanceIndex + 1}` : ''}
        </h3>
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
