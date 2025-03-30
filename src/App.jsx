import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ContentProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/create" element={<CreatePostPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;