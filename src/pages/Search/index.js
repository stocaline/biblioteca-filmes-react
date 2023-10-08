import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiSearch } from "react-icons/fi";
import "./search.css"

const apiKey = process.env.REACT_APP_API_KEY;

function Search() {

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    async function searchMovie() {
        setLoading(true);
        const response = await api.get("search/movie", {
            params: {
                query: `${inputValue}`,
                api_key: `${apiKey}`,
                language: "pt-BR",
            }
        })
        setMovies(response.data.results.slice(0, 10))
        setLoading(false);
    }

    return (
        <div className="search">
            <div className="heading">
                <h2>Pequise pelo seu Filme</h2>
                <div className='form'>
                    <input type="text"
                        placeholder="Filme"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button onClick={searchMovie}>
                        <FiSearch />
                    </button>
                </div>
                {loading &&
                    <div className="loading">
                        <h2>Carregando movies....</h2>
                    </div>
                }
            </div>
            <div className="content">
                <div className="movies-list">
                    {movies.map((filme) => {
                        return (
                            <article key={filme.id}>
                                <strong>{filme.original_title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.original_title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })}
                </div>
            </div>

        </div>
    )

}

export default Search