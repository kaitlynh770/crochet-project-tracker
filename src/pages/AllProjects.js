import { Link } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Project from '../components/Project';
import styles from '../pages_styling/AllProjects.module.scss';
import confusedBear from '../assets/bear.gif';

function AllProjects({ projects, onProjectsUpdated, userId }) {
  const [contextMenu, setContextMenu] = useState(null);
  const fileInputRef = useRef(null);
  const [chosenProjectId, setChosenProjectId] = useState(null);

  const storage = getStorage();

  useEffect(() => {
    if (!contextMenu) return;

    //close menu if user clicks outside of it
    const handleClickOutside = () => {
      setContextMenu(null);
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);

  const handleRightClick = (e, projectId) => {
    e.preventDefault(); //prevent default menu from opening
    e.stopPropagation(); //prevent event bubbling, prevent navigation in particular from happening

    // Set context menu position and project ID
    setContextMenu({
      projectId,
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const projectId = e.target.dataset.projectId; // Get from data attribute rather than setter/getter. Dataset is synchronus so this info is available immediately and we don't have to wait for state to update.
    
    if (!file || !projectId) return; //sanity check

    try {
      //upload the image to Firebase Storage
      const imageRef = ref(storage, `users/${userId}/projects/${projectId}/cover.jpg`);
      console.log(imageRef);
      await uploadBytes(imageRef, file);
      //get download url from the uploaded image (this is the only way I can upload the image to Firestore righ tnow)
      const downloadURL = await getDownloadURL(imageRef);

      //update the project's projectImg field in Firestore
      await updateDoc(
        doc(db, 'users', userId, 'projects', projectId),
        { projectImg: downloadURL }
      );

      console.log('Image uploaded and URL updated in Firestore');
      onProjectsUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      //reset the file input
      e.target.value = '';
      //clean up
      delete e.target.dataset.projectId;
    }
  };

  return (
    <div>
      {projects.length > 0 && <h1>All Projects</h1>}
      <div className={styles.all_projects}>
        {projects.length === 0 && (
          <div className={styles.no_projects}>
            <img src={confusedBear} alt="Confused Bear" />
            <h2>
              Hmm, seems like you don't have any projects. Why not try{' '}
              <Link to="/projects/new">creating one?</Link>
            </h2>
          </div>
        )}
        {projects.map((project) => (
          <div
            key={`project-${project.id}-${project.name}`}
            style={{ cursor: 'pointer' }}
            className={styles.project_wrapper}
          >
            <Project
              key={`project-${project.id}-${project.name}`}
              name={project.name}
              projectImg={project.projectImg}
              pieces={project.pieces}
              id={project.id}
              onRightClick={(e) => handleRightClick(e, project.id)}
            />
          </div>
        ))}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      {contextMenu && (
        <ul
          className={styles.context_menu}
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <li
            onClick={() => {
              fileInputRef.current.dataset.projectId = contextMenu.projectId; // Store on element
              fileInputRef.current.click();
              console.log('Replace image for project:', contextMenu.projectId);
              setContextMenu(null);
            }}
          >
            Replace Image
          </li>
        </ul>
      )}
    </div>
  );
}
export default AllProjects;
