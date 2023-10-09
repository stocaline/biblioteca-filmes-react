import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './movieView.css';
import api from '../../services/api'

const apiKey = process.env.REACT_APP_API_KEY;

function MovieView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovies() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: `${apiKey}`,
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setMovie(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", { replace: true })
                    return;
                })
        }
        loadMovies();

    }, [])

    function saveMovie(){
        const bookmarks = localStorage.getItem("@StocaFlix");

        let saveMovies = JSON.parse(bookmarks) || [];
        const hasMovie = saveMovies.some((bookmarkMovie) => bookmarkMovie.id === movie.id);

        if(hasMovie){
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        saveMovies.push(movie);
        localStorage.setItem("@StocaFlix", JSON.stringify(saveMovies));
        toast.success("Filme salvo com sucesso!");

    }


    if (loading) {
        return (
            <div className='movie-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='movie-info'>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>Avaliação: {movie.vote_average} /10</strong>
            <div className="area-buttons">
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )

}

export default MovieView;