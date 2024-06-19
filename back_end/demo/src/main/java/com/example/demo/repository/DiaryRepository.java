package com.example.demo.repository;


import com.example.demo.modal.Diary;
import com.example.demo.modal.DiaryEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<DiaryEmployee, Integer> {

        @Query("SELECT d FROM DiaryEmployee d WHERE d.userId = :userId")
        List<DiaryEmployee> findByUserId(@Param("userId") int userId);

}