package com.example.demo.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "diaryemployee")
public class DiaryEmployee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "idUser")
    private int userId;

    @Column(name = "content")
    private String content;

    @Column(name = "timeCreate")
    private LocalDateTime timeCreate;

    // Constructors, getters, and setters
}
