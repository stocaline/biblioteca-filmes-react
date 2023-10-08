import './header.css'
import { Link } from 'react-router-dom';

function Header() {

    function searchMovie(movieName) {
        const url = 'https://api.themoviedb.org/3/search/movie?query=transformers&include_adult=false&language=en-US&page=1';
        console.log(movieName)
    }

    return (
        <header>
            <Link className='logo' to='/'>StocaFlix</Link>
            <div>
                <Link className='favoritos' to='/favoritos'>Meus Filmes</Link>
                <input className='input' onSubmit={searchMovie} placeholder='Pesquisar' />
            </div>
        </header>
    )
}

export default Header;