package com.example.demo.models;
import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table (name = "note")
@Getter
@Setter
public class NoteModel implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @NotNull(message = "Title cannot be null, needs a string")
    private String title;

    @NotNull(message = "Note cannot be null, needs a string")
    private String note;

    @NotNull(message = "Important cannot be null, needs a boolean")
    private Boolean important;

    @NotNull(message = "Study cannot be null, needs a boolean")
    private Boolean study;

    @NotNull(message = "Work cannot be null, needs a boolean")
    private Boolean work;

    @NotNull(message = "Personal cannot be null, needs a boolean")
    private Boolean personal;

    @NotNull(message = "Urgent cannot be null, needs a boolean")
    private Boolean urgent;

    @NotNull(message = "Archived cannot be null, needs a boolean")
    private Boolean archived;
    
}
