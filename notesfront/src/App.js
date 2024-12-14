import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import MyNotes from './Pages/MyNotes';
import ArchivedNotes from './Pages/ArchivedNotes';
import CreateNote from './Pages/CreateNote';
import EditNote from './Pages/EditNote';
import NotePage from './Pages/NotePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyNotesWithKey />} />
        <Route path="/ArchivedNotes" element={<ArchivedNotes />} />
        <Route path="/CreateNote" element={<CreateNote />} />
        <Route path="/EditNote" element={<EditNote />} />
        <Route path="/NotePage" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Componente que forzará el re-renderizado de MyNotes al cambiar la clave de location
function MyNotesWithKey() {
  const location = useLocation();

  return <MyNotes key={location.key} />;
}

export default App;
