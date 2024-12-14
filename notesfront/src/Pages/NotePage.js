import React, { useState } from 'react';
import Header from '../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faArchive, faTrash, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditNotes, DeleteNotes } from '../Services/NotesServices';  // Asegúrate de importar el servicio

function NotePage() {
  const { state } = useLocation(); // Usamos useLocation para obtener el estado de la nota
  const note = state?.note; // Obtenemos la nota del estado, si está disponible
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const availableTags = ['important', 'study', 'work', 'personal', 'urgent'];

  // Estado para controlar la visibilidad del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Funciones para manejar las acciones del menú
  const handleEdit = () => {
    // Navegamos a la página de edición y pasamos el objeto `note` como estado
    navigate('/Editnote', { state: { note } });
  };

  const handleArchive = () => {
    // Crear un nuevo objeto sin el `id` y con `archived` actualizado
    const updatedNote = { ...note, archived: !note.archived };
    delete updatedNote.id; // Eliminar `id` del objeto

    // Llamar al servicio `EditNote` para actualizar la nota en el backend
    EditNotes(note.id, updatedNote)
      .then((response) => {
        navigate('/archivednotes');
        console.log('Note updated successfully', response);
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
  };

  const handleDelete = () => {
    DeleteNotes(note.id)
      .then((response) => {
        console.log('Note deleted successfully', response);
        // Redirige dependiendo de si la nota está archivada o no
        if (note.archived) {
          navigate('/archivednotes'); // Redirige a /archivednotes si archived es true
        } else {
          navigate('/'); // Redirige a la página principal si archived es false
        }
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      {/* Contenedor principal */}
      <main className="flex flex-col items-center h-full px-4">
        {/* Título */}
        <div className="w-full max-w-4xl mb-4">
          <h1 className="text-3xl font-bold text-center mb-2">
            {note ? note.title : 'Loading...'} {/* Usamos note.title si note está disponible */}
          </h1>
        </div>

        {/* Contenido de la nota */}
        <div className="w-full max-w-4xl mb-4">
          <p className="text-lg text-gray-300 leading-relaxed">
            {note ? note.note : 'Loading...'} {/* Usamos note.note si note está disponible */}
          </p>
        </div>

        {/* Etiquetas */}
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-center flex-wrap gap-2">
            {note &&
              availableTags.map(
                (tag) =>
                  note[tag] && ( // Solo mostramos los tags con valor `true` en el objeto `note`
                    <span
                      key={tag}
                      className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm"
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)} {/* Capitalizamos el nombre del tag */}
                    </span>
                  )
              )}
          </div>
        </div>

        {/* Botón de opciones */}
        <div className="w-full max-w-4xl mb-4 text-center relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-gray-700 text-white px-4 py-2 rounded-full"
          >
            Options
          </button>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white w-38 space-y-4 shadow-lg rounded-xl z-50">
              <ul className="text-left">
                <li>
                  <a
                    href="/Editnote"
                    onClick={handleEdit}
                    className="block py-2 px-4 hover:bg-gray-700"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleArchive}
                    className="block py-2 px-4"
                  >
                    <FontAwesomeIcon icon={note.archived ? faStickyNote : faArchive} className="mr-2" />
                    {note.archived ? 'Unarchive' : 'Archive'}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleDelete}
                    className="block py-2 px-4 hover:bg-gray-700 text-red-500"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default NotePage;
