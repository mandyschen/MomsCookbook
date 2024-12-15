import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import SearchResults from './pages/SearchResults';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <div className='content-wrapper'>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/search" element={<SearchResults />} />
              </Routes>
            </div>
        </Router>
    );
}

export default App;
