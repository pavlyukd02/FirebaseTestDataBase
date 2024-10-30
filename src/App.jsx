import { useState } from 'react'
import './App.css'
import CreateBlog from './components/blogs/CreateBlog'
import Bloglist from './Bloglist'
import BlogView from './BlogView'
import BlogEdit from './BlogEdit'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        
        <Route exact path='/blog/' element={<Bloglist />} />

        <Route path='/blog/create' element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogView />} />
        <Route path='/blog/edit/:id' element={<BlogEdit />} />

      </Routes>
    </BrowserRouter>
  );
}


export default App
