import React, { useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  // Estados para los campos
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  
  // Lista de etiquetas posibles
  const availableTags = ['important', 'study', 'work', 'personal', 'urgent'];

  // Función para manejar la selección de etiquetas
  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Note:', note);
    console.log('Tags:', tags);
    
    setTitle('');
    setNote('');
    setTags([]);
    navigate('/');
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header title={"Create Note"} />
      {/* Contenedor centrado */}
      <div className="flex flex-1 justify-center items-center">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-200 space-y-6 p-2" >
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Nota */}
          <div>
            <label htmlFor="note" className="block text-lg font-medium mb-2">Note</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none"
              placeholder="Enter your note"
              rows="5"
              required
            />
          </div>

          {/* Etiquetas */}
          <div>
            <label htmlFor="tags" className="block text-lg font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
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

          {/* Botón de envío */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
