package com.example.demo.dao;

import com.example.demo.modal.Diary;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RootDiaryDao {

    public List<Diary> getAllDiary() {
        String query = "SELECT e.id, c.last_name, c.first_name, e.content, e.timeCreate FROM diaryemployee e JOIN customer c\n" +
                "ON e.idUser = c.id_user";
        List<Diary> diaries = new ArrayList<>();
        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt(1);
                String lastName = rs.getString(2);
                String firstName = rs.getString(3);
                String content = rs.getString(4);
                String timeCreate = rs.getString(5);
                Diary a = new Diary(id, lastName,firstName, content, timeCreate);

                diaries.add(a);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return diaries;
    }

    public boolean insertDiary(String content, int id) {
        String query = "INSERT INTO diaryemployee (idUser, content) VALUES (?, ?)";
        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setInt(1, id);
            ps.setString(2, content);

            int result = ps.executeUpdate();
            return result > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
