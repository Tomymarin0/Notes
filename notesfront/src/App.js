import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MyNotes from './Pages/MyNotes';
import ArchivedNotes from './Pages/ArchivedNotes';
import CreateNote from './Pages/CreateNote';
import EditNote from './Pages/EditNote';
import NotePage from './Pages/NotePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyNotes />} />
        <Route path="/ArchivedNotes" element={<ArchivedNotes />} />
        <Route path="/CreateNote" element={<CreateNote />} />
        <Route path="/EditNote" element={<EditNote />} />
        <Route path="/NotePage" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
