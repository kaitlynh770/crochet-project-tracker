import { useState, useEffect } from 'react';
import Piece from './Piece';
import styles from './Project.module.scss';
import { useNavigate } from 'react-router-dom';

//this is going to be what a project is made up of
//photo, name, pieces Piece[], notes
function Project({ projectImg, name, pieces, id, notes = '', onRightClick }) {
  const navigate = useNavigate();
  const [details, showDetails] = useState(false); //showing details of a project should initially be set to false
  const [menuPosition, setMenuPosition] = useState(null);



  const handleButtonClick = (e) => {
    e.stopPropagation(); //prevent event bubbling, specifically prevent the navigation from happening when clicking the toggle button
    setMenuPosition(null);
    showDetails(!details);
  };

  const onClickProject = () => {
    navigate(`/projects/${id}`);
    setMenuPosition(null);
  };

  // const handleRightClick = (e) => {
  //   e.preventDefault(); //prevent default menu from opening
  //   e.stopPropagation(); //prevent event bubbling, prevent navigation in particular from happening

  //   setMenuPosition({
  //     x: e.clientX,
  //     y: e.clientY
  //   });

    //console.log(`project id: ${id}`)
  // };

  return (
    <div className={styles.project} onClick={onClickProject} onContextMenu={onRightClick}>
      <img src={projectImg} alt="" />
      <h2 className={styles.projectName}>{name}</h2>
      <button className={styles.toggleButton} onClick={handleButtonClick}>
        {details ? '▲' : '▼'}
      </button>
      <div
        className={styles.project_details}
        style={{
          maxHeight: details ? '1000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        {details &&
          pieces.map((piece, index) => (
            <Piece
              key={index}
              name={piece.pieceName}
              rounds={piece.pieceRounds}
              quantity={piece.pieceQuantity}
            />
          ))}
      </div>
    </div>
  );
}
export default Project;
