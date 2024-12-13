import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import notesData from './notes.json'; 
import NoteCard from '../Components/NoteCard'; 

function MyNotes() {
  // Estado para almacenar las notas visibles
  const [notes, setNotes] = useState([]);
  // Estado para saber si estamos cargando más notas
  const [loading, setLoading] = useState(false);
  // Estado para el número de página (para paginación)
  const [page, setPage] = useState(1);
  // Estado para saber si hay más notas para cargar
  const [hasMore, setHasMore] = useState(true);
  const availableTags = ['important', 'study', 'work', 'personal', 'urgent'];
  const [tags, setTags] = useState([]);
  

  // Tamaño de la página 
  const notesPerPage = 21;

    // Función para manejar la selección de etiquetas
  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

 
  const fetchNotes = () => {
    setLoading(true);
    setTimeout(() => {
      // Calculamos el índice de inicio y fin según la página actual
      const startIndex = (page - 1) * notesPerPage;
      const endIndex = startIndex + notesPerPage;
      const newNotes = notesData.slice(startIndex, endIndex);
      
      // Si no hay más notas, desactivamos la paginación
      if (newNotes.length < notesPerPage) {
        setHasMore(false);
      }
      
      setNotes(prevNotes => [...prevNotes, ...newNotes]); // Añadimos las nuevas notas al estado
      setLoading(false);
    }, 1000);
  };


  useEffect(() => {
    fetchNotes(); // Cargar las primeras 21 notas
  }, [page]); // Cada vez que la página cambia, cargamos más notas

  // Función que detecta cuando se ha hecho scroll y carga más notas
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage(prevPage => prevPage + 1); // Incrementamos la página para cargar más notas
    }
  };

  return (
<div className="bg-black text-white min-h-screen">
  {/* Header */}
  <Header title={"My Notes"} />

  {/* Contenedor principal */}
  <main className="flex flex-col items-center h-full px-4">
    {/* Etiquetas */}
    <div className="w-full max-w-4xl mb-4">
      <label htmlFor="tags" className="block text-lg font-medium mb-2 text-center">
        Select Tags to Filter
      </label>
      <div className="flex justify-center flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full text-sm ${
              tags.includes(tag) ? 'bg-orange-500' : 'bg-gray-700'
            } text-white`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>

    {/* Grilla de notas */}
    <div
      onScroll={handleScroll}
      className="w-full grid grid-cols-1 gap-4 overflow-y-auto max-h-screen sm:grid-cols-2 lg:grid-cols-3"
    >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} /> 
      ))}


      {loading && (
        <div className="w-full flex justify-center col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
          <div className="spinner-border text-orange-500" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}


      {!hasMore && (
        <div className="w-full flex justify-center col-span-1 sm:col-span-2 lg:col-span-3 mt-4 text-gray-400">
          No more notes to load.
        </div>
      )}
    </div>
  </main>
</div>


  );
}

export default MyNotes;
