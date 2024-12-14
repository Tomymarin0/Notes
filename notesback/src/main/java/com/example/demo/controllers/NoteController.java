package com.example.demo.controllers;

import com.example.demo.models.NoteModel;
import com.example.demo.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

    @Autowired
    private NoteService noteService;


    @PostMapping
    public ResponseEntity<Object> createNote(@Valid @RequestBody NoteModel note, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        // Si no hay errores, guardamos la nota
        return ResponseEntity.ok(noteService.CreateNote(note));
    }

    // Eliminar una nota por ID
    @DeleteMapping("/{id}")
    public String deleteNote(@PathVariable Long id) {
        return noteService.DeleteNote(id);
    }

    // Actualizar una nota existente
    @PutMapping("/{id}")
    public NoteModel updateNote(@PathVariable Long id, @RequestBody NoteModel updatedNote) {
        return noteService.updateNote(id, updatedNote);
    }

    // Controlador
    @GetMapping
    public List<NoteModel> getNotes(
        @RequestParam Boolean archived,
        @RequestParam(required = false) Boolean important,
        @RequestParam(required = false) Boolean study,
        @RequestParam(required = false) Boolean work,
        @RequestParam(required = false) Boolean personal,
        @RequestParam(required = false) Boolean urgent
    ) {
        return noteService.getNotes(archived, important, study, work, personal, urgent);
    }

    }
