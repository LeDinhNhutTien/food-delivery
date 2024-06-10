package com.example.demo.controller;

import com.example.demo.dao.RootDiaryDao;
import com.example.demo.modal.Diary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rootDiary")
@CrossOrigin(origins = "http://localhost:3000")
public class RootDiaryController {

    @Autowired
    private RootDiaryDao rootDiaryDao;

    @GetMapping("/all")
    public List<Diary> getAllDiaries() {
        return rootDiaryDao.getAllDiary();
    }

    @PostMapping("/add")
    public boolean addDiary(@RequestBody Map<String, String> requestBody) {
        String content = requestBody.get("content");
        int id = Integer.parseInt(requestBody.get("id"));
        return rootDiaryDao.insertDiary(content, id);
    }


}
