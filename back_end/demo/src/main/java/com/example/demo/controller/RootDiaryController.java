package com.example.demo.controller;

import com.example.demo.service.RootDiaryService;
import com.example.demo.modal.DiaryEmployee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rootDiary")
@CrossOrigin(origins = "http://localhost:3000")
public class RootDiaryController {

    @Autowired
    private RootDiaryService diaryEmployeeService;

    @GetMapping("/all")
    public List<DiaryEmployee> getAllDiaries() {
        return diaryEmployeeService.getAllDiaries();
    }

    @PostMapping("/add")
    public DiaryEmployee addDiary(@RequestBody Map<String, String> requestBody) {
        String content = requestBody.get("content");
        int userId = Integer.parseInt(requestBody.get("userId"));
        DiaryEmployee diary = new DiaryEmployee();
        diary.setContent(content);
        diary.setUserId(userId);
        return diaryEmployeeService.saveDiary(diary);
    }
}
