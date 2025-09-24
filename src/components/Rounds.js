import React from 'react';
import styles from '../pages_styling/ProjectDetails.module.scss';

function Rounds({ pieceRounds, roundsCompleted, handleRoundClick }) {
  return (
    <div className={styles.rounds_container}>
      {[...Array(pieceRounds)].map((_, i) => (
        <button
          key={i}
          className={
            roundsCompleted && roundsCompleted[i]
              ? styles.rounds_clicked
              : styles.rounds_unclicked
          }
          onClick={() => handleRoundClick(i)}
        >
          {roundsCompleted && roundsCompleted[i] ? '✓' : `${i + 1}`}
        </button>
      ))}
    </div>
  );
}

export default Rounds;
