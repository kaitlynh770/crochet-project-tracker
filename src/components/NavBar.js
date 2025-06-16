import React from 'react';
import styles from './NavBar.module.scss';
import {Link} from 'react-router-dom';


//component to handle navigation, this is all wrapped in a nav component
//this is what displays the clickable links that the user can interact with (for this project, it'll be the links in the side menu)

function NavBar() {
    return(
        <div>
            <nav className = {styles.nav}>
                <ul>
                    <Link className = {styles.links} to = "/projects">All Projects</Link>
                    <Link className = {styles.links} to = "/projects/new">New Project</Link>
                </ul>
            </nav>
        </div>
    );
}
export default NavBar
