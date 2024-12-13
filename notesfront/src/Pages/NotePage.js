import React, { useState } from 'react';
import Header from '../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faArchive, faTrash } from '@fortawesome/free-solid-svg-icons';

function NotePage() {
  const availableTags = ['important', 'study', 'work', 'personal', 'urgent'];

  // Estado para controlar la visibilidad del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Funciones para manejar las acciones del menú
  const handleEdit = () => {
    console.log('Edit clicked');
  };

  const handleArchive = () => {

    console.log('Archive clicked');
  };

  const handleDelete = () => {

    console.log('Delete clicked');
  };

  return (
    <div className="bg-black text-white min-h-screen">

      <Header />
      {/* Contenedor principal */}
      <main className="flex flex-col items-center h-full px-4">

        {/* Título */}
        <div className="w-full max-w-4xl mb-4">
          <h1 className="text-3xl font-bold text-center mb-2">
            Sample Note Title
          </h1>
        </div>

        {/* Contenido de la nota */}
        <div className="w-full max-w-4xl mb-4">
          <p className="text-lg text-gray-300 leading-relaxed">
            This is an example of a long note content. You can place multiple paragraphs here to simulate a long note. 
            The content can span several lines and include any information you want to display.
            You can also add more sections or formatting to suit your needs. 
            For example, you could add bullet points, numbered lists, or even links if necessary.
          </p>
        </div>

        {/* Etiquetas */}
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-center flex-wrap gap-2">
            {availableTags.map((tag, index) => (
              <span
                key={index}
                className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
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
                    className="block py-2 px-4 hover:bg-gray-700"
                  >
                    <FontAwesomeIcon icon={faArchive} className="mr-2" />
                    Archive
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
