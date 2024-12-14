import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import NoteCard from '../Components/NoteCard';
import { GetNotes } from '../Services/NotesServices';

function MyNotes() {
  const [notes, setNotes] = useState([]); // Lista de notas
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [page, setPage] = useState(1); // Página actual para la paginación
  const [hasMore, setHasMore] = useState(true); // Si hay más notas por cargar
  const availableTags = ['important', 'study', 'work', 'personal', 'urgent']; // Etiquetas disponibles
  const [tags, setTags] = useState([]); // Estado para las etiquetas seleccionadas

  const notesPerPage = 21; // Número de notas por página

  // Función para alternar la selección de las etiquetas
  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };



  // Función para obtener las notas filtradas o de la primera carga
  const fetchNotes = (filters) => {
    setLoading(true); // Mostrar el spinner de carga

    // Llamada al servicio que obtiene las notas con el filtro
    GetNotes({ ...filters, page, limit: notesPerPage })
      .then((response) => {
        const newNotes = response.data || [];
        if (newNotes.length < notesPerPage) {
          setHasMore(false); // Si la cantidad de notas es menor a las que deberían cargarse, no hay más
        } else {
          setHasMore(true);
        }

        // Si estamos en la primera página, establece las notas directamente, de lo contrario, las agrega a las anteriores
        setNotes((prevNotes) => {
          const updatedNotes = page === 1 ? newNotes : [...prevNotes, ...newNotes];
          
          // Mostrar las notas cada vez que se actualicen
          console.log('Updated Notes:', updatedNotes);
          
          return updatedNotes;
        });

        setLoading(false); // Deja de mostrar el spinner de carga
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
        setLoading(false); // Deja de mostrar el spinner de carga en caso de error
      });
  };

  const updateNotes = (deletedNoteId) => {
    if (deletedNoteId) {
      // Filtrar la lista para eliminar la nota del estado local
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== deletedNoteId));
    } else {
      // Limpiar las notas previas antes de obtener las nuevas
      setNotes([]); // Limpiar notas actuales antes de cargar las nuevas
  
      const filters = {
        important: tags.includes('important'),
        study: tags.includes('study'),
        work: tags.includes('work'),
        personal: tags.includes('personal'),
        urgent: tags.includes('urgent'),
        archived: false, // Solo mostrar notas no archivadas
      };
  
      fetchNotes(filters); // Llamar a fetchNotes para obtener las notas filtradas desde el backend
    }
  };
  
  

  // Llamada inicial para obtener las notas sin filtros
  useEffect(() => {
    // Llamar a fetchNotes cada vez que cambian las etiquetas de filtro
    const filters = {
      important: tags.includes('important'),
      study: tags.includes('study'),
      work: tags.includes('work'),
      personal: tags.includes('personal'),
      urgent: tags.includes('urgent'),
      archived: false, // Solo mostrar notas no archivadas
    };
  
    fetchNotes(filters); // Llamar para cargar las notas con los filtros aplicados
  }, [tags]); // Este effect depende de las etiquetas para recargar las notas


  useEffect(() => {
    updateNotes(); // Llamar para recargar las notas si hay algún cambio
  }, []); 

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMore && notes.length > 0) { // Asegurarse de que haya notas cargadas
      setPage((prevPage) => prevPage + 1); // Avanzar a la siguiente página
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header title={"My Notes"} />

      <main className="flex flex-col items-center h-full px-4">
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
                className={`px-4 py-2 rounded-full text-sm ${tags.includes(tag) ? 'bg-orange-500' : 'bg-gray-700'} text-white`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div
          onScroll={handleScroll}
          className="w-full grid grid-cols-1 gap-4 overflow-y-auto max-h-screen sm:grid-cols-2 lg:grid-cols-3"
        >
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard key={note.id} note={note} updateNotes={updateNotes} />
            ))
          ) : (
            <div className="w-full flex justify-center col-span-1 sm:col-span-2 lg:col-span-3 mt-4 text-gray-400">
              No notes available.
            </div>
          )}

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
