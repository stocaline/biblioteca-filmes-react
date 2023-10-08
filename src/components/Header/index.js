import './header.css'
import { Link } from 'react-router-dom';
import { FiSearch, FiStar } from "react-icons/fi";

function Header() {

    return (
        <header>
            <Link className='logo' to='/'>StocaFlix</Link>
            <div className='nav-btns'>
                <Link className='nav-btn' to='/favoritos'>
                    <FiStar />
                    Favoritos
                </Link>
                <Link className='nav-btn' to='/search'>
                    <FiSearch />
                </Link>
            </div>
        </header>
    )
}

export default Header;