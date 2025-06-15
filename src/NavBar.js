import {Link} from 'react-router-dom';

function NavBar() {
    return(
        <nav>
            <Link to = "/projects">All Projects</Link>
            <Link to = "/projects/new">New Project</Link>
        </nav>
    );
}
export default NavBar