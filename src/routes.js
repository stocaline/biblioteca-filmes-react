import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MovieView from './pages/MovieView';
import Bookmarks from './pages/bookmarks';
import Search from './pages/Search';

import Error from './pages/Error'

import Header from './components/Header';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/filme/:id" element={ <MovieView/> } />
            <Route path="/favoritos" element={ <Bookmarks/> }/>
            <Route path="/search" element={ <Search/> }/>

            <Route path="*" element={<Error/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;
