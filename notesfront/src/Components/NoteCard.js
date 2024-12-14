import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPencilAlt, faArchive, faTrash, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { EditNotes, DeleteNotes } from '../Services/NotesServices';  // Asegúrate de importar el servicio

function NoteCard({ note, updateNotes }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleEdit = () => {
    // Navegamos a la página de edición y pasamos el objeto `note` como estado
    navigate('/Editnote', { state: { note } });
  };

  const handleArchive = () => {
    const updatedNote = { ...note, archived: !note.archived };
    delete updatedNote.id;
  
    EditNotes(note.id, updatedNote)
      .then((response) => {
        console.log('Note updated successfully', response);
        updateNotes(note.id); // Elimina la nota archivada de la lista
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
  };
  
  const handleDelete = () => {
    DeleteNotes(note.id)
      .then((response) => {
        console.log('Note deleted successfully', response);
        updateNotes(note.id); // Elimina la nota borrada de la lista
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };
  
  
  

  const handleTitleClick = () => {
    // Redirigimos a la página de detalles pasando el objeto `note`
    navigate('/notepage', { state: { note } });
  };

  // Definimos los posibles tags
  const tags = [];
  if (note.important) tags.push('Important');
  if (note.study) tags.push('Study');
  if (note.work) tags.push('Work');
  if (note.personal) tags.push('Personal');
  if (note.urgent) tags.push('Urgent');

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
      <div className="flex items-center justify-between mb-2">
        <h3
          onClick={handleTitleClick} // Hacemos el título clickeable
          className="text-2xl font-bold cursor-pointer"
        >
          {note.title.length > 25 ? `${note.title.slice(0, 25)}...` : note.title}
        </h3>
        <button
          onClick={toggleMenu}
          className="text-orange-500 text-2xl focus:outline-none"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      <p className="text-gray-400 mb-2 truncate">{note.note}</p>
      <div className="flex gap-2">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <span
              key={index}
              className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">No tags</span>
        )}
      </div>

      {isMenuOpen && (
        <div className="absolute top-14 right-0 bg-gray-900 text-white w-38 space-y-4 shadow-lg rounded-lg mr-0 z-50">
          <ul>
            <li>
              <button
                onClick={handleEdit}
                className="block py-2 px-4"
              >
                <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                Edit
              </button>
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
                className="block py-2 px-4 text-red-500"
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Delete
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NoteCard;
