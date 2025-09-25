import { useEffect, useRef, useState } from 'react';
import styles from './NewPiece.module.scss';

function NewPiece({ initialData, onClose, onSave }) {
  const [pieceName, setPieceName] = useState(initialData?.pieceName || '');
  const [pieceQuantity, setPieceQuantity] = useState(initialData?.pieceQuantity || 1);
  const quantity = [1, 2, 3, 4, 5];
  const [pieceRounds, setPieceRounds] = useState(initialData?.pieceRounds || '');
  function savePiece(e) {
    e.preventDefault();
    if (!pieceName || pieceRounds === '') {
      alert('Please fill out all fields!');
      console.log(`piece name: ${pieceName}, quantity: ${pieceQuantity}, rounds: ${pieceRounds}`);
      return;
    }
    const np = {
      pieceName,
      pieceQuantity,
      pieceRounds,
    };
    console.log(`Saving piece: ${np}`);
    console.log(`Name : ${pieceName} Quantity: ${pieceQuantity} Rounds: ${pieceRounds}`);
    onSave(np);
    onClose(); // close overlay after save
  }
  const inputRef = useRef(null); //create a reference to the DOM element that we want to keep track of
  const menuRef = useRef(null);

  useEffect(() => {
    //check if anything is an element is attached to the ref, if there is then focus on it
    inputRef.current && inputRef.current.focus();
  }, []);

  useEffect(() => {
    //this useEffect hook is listening for any mouse clicks anywhere on the page, if the click happened outside of what was stored in inputRef, we would close the element
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        //check if there's anything attached to the ref and check if the click happened inside or outside the element
        onClose(); //if there is a DOM element attached to it and the click happened outside the element (in this case, the menu) then close it
      }
    }
    document.addEventListener('mousedown', handleClickOutside); //addEventListener to the whole document to catch all the clicks
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //cleanup function in case component unmounts or any dependencies change
    };
  }, [onClose]);
  return (
    <div className={styles.overlay}>
      <form className={styles.new_piece} ref={menuRef}>
        <h2>New Piece</h2>
        <div className={styles['field-container']}>
          <label> Piece Name </label>
          <input
            ref={inputRef}
            type="text"
            value={pieceName}
            onChange={(e) => setPieceName(e.target.value)}
          />
        </div>
        <div className={styles['field-container']}>
          <label> Quantity: </label>
          <select
            id="pieces_quantity"
            value={pieceQuantity}
            onChange={(e) => setPieceQuantity(Number(e.target.value))}
          >
            <option value=""></option>
            {quantity.map((number) => {
              return (
                <option key={number} value={number}>
                  {number}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles['field-container']}>
          <label> # of Rounds: </label>
          <input
            type="number"
            value={pieceRounds}
            min="1"
            onChange={(e) => {
              const val = e.target.value;
              // Allow empty string or convert to number
              setPieceRounds(val === '' ? '' : Number(val));
            }}
          />
        </div>
        <button onClick={savePiece} className={styles.save_piece}>
          Save Piece
        </button>
      </form>
    </div>
  );
}
export default NewPiece;
