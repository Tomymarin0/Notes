package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repositories.NoteRepository;
import com.example.demo.models.NoteModel;
import java.util.List;

@Service
public class NoteService {
    @Autowired
    NoteRepository noteRepository;

    // Crear una nueva nota
    public NoteModel CreateNote(NoteModel note){
        return noteRepository.save(note);
    }

    // Eliminar una nota por ID
    public String DeleteNote(Long id) {
        try {
            if (noteRepository.existsById(id)) {
                noteRepository.deleteById(id);
                return "Note deleted";
            } else {
                return "Note not found";
            }
        } catch (Exception err) {
            return "Error occurred while deleting the note: " + err.getMessage();
        }
    }

    // Actualizar una nota existente
    public NoteModel updateNote(Long id, NoteModel updatedNote) {
        NoteModel existingNote = noteRepository.findById(id).orElse(null);
        
        if (existingNote == null) {
            return null;
        }

        existingNote.setTitle(updatedNote.getTitle());
        existingNote.setNote(updatedNote.getNote());
        existingNote.setImportant(updatedNote.getImportant());
        existingNote.setStudy(updatedNote.getStudy());
        existingNote.setWork(updatedNote.getWork());
        existingNote.setPersonal(updatedNote.getPersonal());
        existingNote.setUrgent(updatedNote.getUrgent());
        existingNote.setArchived(updatedNote.getArchived());

        return noteRepository.save(existingNote);
    }

    // Obtener notas por el valor de 'archived'
    public List<NoteModel> getNotes(Boolean archived) {
        return noteRepository.findNotesByArchived(archived);
    }
}
