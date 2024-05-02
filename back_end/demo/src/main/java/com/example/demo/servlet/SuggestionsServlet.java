package com.example.demo.servlet;

import com.example.demo.Dao.ProductDAO;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/api/suggestions")
@CrossOrigin(origins = "http://localhost:3000")
public class SuggestionsServlet {

    @GetMapping
    protected void doGet(@RequestParam("query") String query, HttpServletResponse response) throws IOException {
        try {
            // Gọi phương thức từ DAO để lấy danh sách gợi ý
            List<String> suggestions = ProductDAO.getSearchSuggestions(query);

            // Thiết lập kiểu dữ liệu trả về là JSON
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            // Chuyển danh sách gợi ý thành chuỗi JSON
            String json = convertListToJson(suggestions);

            // Gửi chuỗi JSON chứa danh sách gợi ý về client
            PrintWriter out = response.getWriter();
            out.print(json);
            out.flush();
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            PrintWriter out = response.getWriter();
            out.println("{\"error\": \"" + e.getMessage() + "\"}");
            out.flush();
        }
    }

    // Phương thức để chuyển danh sách gợi ý thành chuỗi JSON
    private String convertListToJson(List<String> suggestions) {
        // Sử dụng Gson để chuyển đổi danh sách thành JSON
        return new Gson().toJson(suggestions);
    }
}
