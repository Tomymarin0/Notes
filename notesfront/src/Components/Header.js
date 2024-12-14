import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faStickyNote, faArchive, faPlus } from '@fortawesome/free-solid-svg-icons';

function Header({ title }) {
  // Estado para controlar la visibilidad del menú hamburguesa
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para manejar el cambio de estado (abrir/cerrar el menú)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
  <header className="relative flex items-center justify-between p-4 bg-black sticky top-0 z-10 shadow-lg">
    {/* Título */}
    <h1 className="text-2xl sm:text-2xl font-bold text-center absolute left-1/2 transform -translate-x-1/2">
      {title}
    </h1>

    {/* Botón de menú hamburguesa */}
    <button onClick={toggleMenu} className="focus:outline-none ml-auto">
      <FontAwesomeIcon icon={faBars} className="text-orange-500 text-2xl" />
    </button>

    {/* Menú desplegable */}
    {isMenuOpen && (
      <div className="absolute top-16 right-0 bg-gray-900 text-white w-48 space-y-4 shadow-lg rounded-lg mr-4">
        <ul>
          <li>
            <a href="/" className="block py-2 px-4">
              <FontAwesomeIcon icon={faStickyNote} className="mr-2" /> My Notes
            </a>
          </li>
          <li>
            <a href="/ArchivedNotes" className="block py-2 px-4">
              <FontAwesomeIcon icon={faArchive} className="mr-2" /> Archived Notes
            </a>
          </li>
          <li>
            <a href="/CreateNote" className="block py-2 px-4">
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create Note
            </a>
          </li>
        </ul>
      </div>
    )}
  </header>




  );
}

export default Header;
