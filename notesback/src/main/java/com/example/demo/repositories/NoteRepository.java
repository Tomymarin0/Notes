package com.example.demo.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.models.NoteModel;

@Repository
public interface NoteRepository extends CrudRepository<NoteModel, Long> {
    List<NoteModel> findNotesByArchived(Boolean archived);
}
