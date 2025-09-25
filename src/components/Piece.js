import React from 'react';
import styles from './Piece.module.scss';
//each project is made up of multiple pieces
//a piece should be made up of the name (arm, leg, ear) and how many rounds it is (8 rounds total, 16 rounds total, etc)
function Piece({ name, rounds, quantity = 1 }) {
  return (
    <div className={styles.piece}>
      <span>
        <span className={styles.pieceName}>
          {name}
          {quantity > 1 ? ` x${quantity}` : ''}:{' '}
        </span>
        <span className={styles.pieceRounds}>{rounds} rounds</span>
      </span>
    </div>
  );
}
export default Piece;
