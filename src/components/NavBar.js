import React from 'react';
import {Link} from 'react-router-dom';
 
//component to handle navigation, this is all wrapped in a nav component 
//this is what displays the clickable links that the user can interact with (for this project, it'll be the links in the side menu)

function NavBar() { 
    return(
        <nav>
            <Link to = "/projects">All Projects</Link>
            <Link to = "/projects/new">New Project</Link>
        </nav>
    );
}
export default NavBar