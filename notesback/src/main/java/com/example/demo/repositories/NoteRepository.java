package com.example.demo.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.models.NoteModel;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;



// Repositorio
@Repository
public interface NoteRepository extends CrudRepository<NoteModel, Long> {
    List<NoteModel> findNotesByArchived(Boolean archived);

    // Consulta personalizada para filtrar por 'archived' y tags
    @Query("SELECT n FROM NoteModel n WHERE n.archived = :archived" +
           " AND (:important IS NULL OR n.important = :important)" +
           " AND (:study IS NULL OR n.study = :study)" +
           " AND (:work IS NULL OR n.work = :work)" +
           " AND (:personal IS NULL OR n.personal = :personal)" +
           " AND (:urgent IS NULL OR n.urgent = :urgent)")
    List<NoteModel> findNotesByArchivedAndTags(
        @Param("archived") Boolean archived,
        @Param("important") Boolean important,
        @Param("study") Boolean study,
        @Param("work") Boolean work,
        @Param("personal") Boolean personal,
        @Param("urgent") Boolean urgent
    );
}

