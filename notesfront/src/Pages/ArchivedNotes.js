import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import NoteCard from '../Components/NoteCard';
import { GetNotes } from '../Services/NotesServices';

function ArchivedNotes() {
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

  // Función para manejar el filtro
  const handleFilter = () => {
    // Crear el objeto de filtros, con 'archived' fijo en 'false'
    const filter = {
      important: tags.includes('important'),
      study: tags.includes('study'),
      work: tags.includes('work'),
      personal: tags.includes('personal'),
      urgent: tags.includes('urgent'),
      archived: true, // Solo mostrar notas no archivadas
    };

    // Resetear las notas y obtener las nuevas notas filtradas
    setNotes([]); // Limpiar notas previas
    setPage(1); // Resetear la página a 1
    setHasMore(true); // Volver a permitir más notas si se cargan nuevas
    fetchNotes(filter); // Cargar nuevas notas con los filtros
  };

  // Función para obtener las notas filtradas
  const fetchNotes = (filters) => {
    setLoading(true);

    // Llamada al servicio que obtiene las notas con el filtro
    GetNotes(filters)
      .then((response) => {
        // Verifica que la respuesta tenga notas
        const newNotes = response.data || [];
        if (newNotes.length < notesPerPage) {
          setHasMore(false); // Si la cantidad de notas es menor a las que deberían cargarse, no hay más
        }

        setNotes(newNotes); // Establece las nuevas notas obtenidas
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
        setLoading(false);
      });
  };

  // Llamada inicial para obtener las notas sin filtros
  useEffect(() => {
    fetchNotes({
      important: false,
      study: false,
      work: false,
      personal: false,
      urgent: false,
      archived: true,
    });
  }, [page]);

  // Función para manejar el evento de scroll
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header title={"Archived Notes"} />

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
                className={`px-4 py-2 rounded-full text-sm ${
                  tags.includes(tag) ? 'bg-orange-500' : 'bg-gray-700'
                } text-white`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-4xl mb-4 flex justify-center">
          <button
            onClick={handleFilter}
            className="px-6 py-2 rounded-full text-sm bg-orange-500 text-white"
          >
            Filter
          </button>
        </div>

        <div
          onScroll={handleScroll}
          className="w-full grid grid-cols-1 gap-4 overflow-y-auto max-h-screen sm:grid-cols-2 lg:grid-cols-3"
        >
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard key={note.id} note={note} />
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

export default ArchivedNotes;

