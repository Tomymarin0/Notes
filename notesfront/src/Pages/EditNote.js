import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { EditNotes } from '../Services/NotesServices';

function EditNote() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la nota pasada a través del estado
  const { note } = location.state || {};

  const [title, setTitle] = useState('');
  const [noteContent, setNote] = useState('');
  const [tagsState, setTagsState] = useState({
    important: false,
    study: false,
    work: false,
    personal: false,
    urgent: false,
  });

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setNote(note.note);
      setTagsState({
        important: note.important,
        study: note.study,
        work: note.work,
        personal: note.personal,
        urgent: note.urgent,
      });
    }
  }, [note]);

  const toggleTag = (tag) => {
    setTagsState((prevState) => ({
      ...prevState,
      [tag]: !prevState[tag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construir el nuevo objeto note con el ID original y los cambios
    const updatedNote = {
      title,
      note: noteContent,
      ...tagsState, 
      archived: note.archived // Añadir el valor de archived
    };
  
    // Mostrar el nuevo objeto note por consola
    console.log('Updated Note:', note.id, updatedNote);
  
    try {
      await EditNotes(note.id, updatedNote);
  
      // Limpiar los campos
      setTitle('');
      setNote('');
      setTagsState({
        important: false,
        study: false,
        work: false,
        personal: false,
        urgent: false,
      });
  
      // Redirigir al inicio
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header title={"Edit Note"} />
      <div className="flex flex-1 justify-center items-center">
        <form onSubmit={handleSubmit} className="w-200 space-y-6 p-2">
          <div>
            <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none"
              placeholder="Enter title"
              maxLength="255"
              required
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-lg font-medium mb-2">Note</label>
            <textarea
              id="note"
              value={noteContent}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none"
              placeholder="Enter your note"
              maxLength="255"
              rows="5"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-lg font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(tagsState).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    tagsState[tag] ? 'bg-orange-500' : 'bg-gray-700'
                  } text-white`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
