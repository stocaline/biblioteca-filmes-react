import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './bookmarks.css'

function Bookmarks(){

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        
        const bookmarks = localStorage.getItem("@StocaFlix");
        setMovies(JSON.parse(bookmarks) || [])

    },[])

    function deleteMovie(id){
        let moviesFilter = movies.filter((item) => {
            return(item.id !== id)
        })

        setMovies(moviesFilter);
        localStorage.setItem("@StocaFlix", JSON.stringify(moviesFilter))
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className="bookmarks">
            <h1>Meus Filmes</h1>

            {movies.length === 0 && <span>Você não possui nenhum filme salvo</span>}

            <ul>
                {movies.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}

export default Bookmarks;