import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

const apiKey = process.env.REACT_APP_API_KEY;

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)

    async function loadMovies() {
        const response = await api.get("movie/now_playing", {
            params: {
                api_key: `${apiKey}`,
                language: "pt-BR",
                page: page,
            }
        })
        setPage(page + 1)
        setMovies([...movies, ...response.data.results.slice(0, 10)])
        setLoading(false);
    }

    useEffect(() => {
        loadMovies()
    }, [])

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes....</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="main">
                <div className="main-content">
                    <h1>Descubra, favorite e compartilhe seus filmes favoritos!"</h1>
                    <p>Descubra os melhores filmes e crie sua lista de favoritos personalizada em nosso site de cinema. Encontre, favorite e compartilhe suas pérolas cinematográficas.</p>
                </div>
                <img src="/imagem1.png" alt='imagem de camera de cinema'/>
            </div>
            <div className="content">
                <div className="movies-list">
                    {movies.map((movie) => {
                        return (
                            <article key={movie.id}>
                                <strong>{movie.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                                <Link to={`/filmes/${movie.id}`}>Acessar</Link>
                            </article>
                        )
                    })}
                </div>
                <button className='btn-more-itens' onClick={() => loadMovies()}>Carregar mais</button>
            </div>
        </div>
    )
}

export default Home;