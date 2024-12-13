import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPencilAlt, faArchive, faTrash } from '@fortawesome/free-solid-svg-icons'; 

function NoteCard({ note }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleEdit = () => {
    console.log(`Editing note with ID: ${note.id}`);
  };

  const handleArchive = () => {
    console.log(`Archiving note with ID: ${note.id}`);
  };

  const handleDelete = () => {
    console.log(`Deleting note with ID: ${note.id}`);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold">
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
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {isMenuOpen && (
        <div className="absolute top-14 right-0 bg-gray-900 text-white w-38 space-y-4 shadow-lg rounded-lg mr-0 z-50">
          <ul>
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
  );
}

export default NoteCard;
