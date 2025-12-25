import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import RecipeDetail from './pages/RecipeDetail';
import SearchResults from './pages/SearchResults';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <div className='content-wrapper'>
              <ScrollToTop />
              <Routes>
                  <Route path="/MomsCookbook" element={<Home />} />
                  <Route path="/MomsCookbook/about" element={<About />} />
                  <Route path="/MomsCookbook/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/MomsCookbook/search" element={<SearchResults />} />
              </Routes>
            </div>
        </Router>
    );
}

export default App;
