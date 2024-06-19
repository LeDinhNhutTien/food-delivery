package com.example.demo.dao;

import com.example.demo.modal.Diary;
import com.example.demo.modal.DiaryEmployee;
import com.example.demo.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RootDiaryDao {

    @Autowired
    private DiaryRepository diaryEmployeeRepository;

    public List<DiaryEmployee> getAllDiaries() {
        return diaryEmployeeRepository.findAll();
    }

    public List<DiaryEmployee> getDiariesByUserId(int userId) {
        return diaryEmployeeRepository.findByUserId(userId);
    }

    public DiaryEmployee saveDiary(DiaryEmployee diary) {
        diary.setTimeCreate(LocalDateTime.now()); // Set current time when creating a new diary
        return diaryEmployeeRepository.save(diary);
    }
}
