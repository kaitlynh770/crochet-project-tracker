import {useState} from 'react';
import ReactDOM from 'react-dom/client';
import styles from '../pages_styling/NewProject.module.scss';

function NewProject(){
    const [projectName, setProjectName] = useState("");
    const [notes, setNotes] = useState("");
    return(
        <div className = {styles.form}>
            <form className = {styles.new_project}>
                <h2> New Project </h2>
                <label> Project Name
                    <input
                        type = "text"
                        value = {projectName}
                        onChange = {(e) => setProjectName(e.target.value)}
                    />
                </label>
                <label>Overall Notes
                    <input
                        className= {styles.notes}
                        type = "text"
                        value = {notes}
                        onChange = {(e) => setNotes(e.target.value)}
                    />
                </label>
                <button className = {styles.add_piece}> Add Piece</button>
            </form>
        </div>
    )
}
export default NewProject
