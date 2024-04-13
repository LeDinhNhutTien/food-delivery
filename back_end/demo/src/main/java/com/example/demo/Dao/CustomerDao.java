package com.example.demo.Dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class CustomerDao {

    public  void sign_up(String user, String pass){
        Connection connection = null;
        PreparedStatement ps = null;
        String query = "INSERT into customer(username, password, first_name, last_name, phone, address, role)\n" +
                "VALUES(?, ?, \"\", \"\", \"\", \"\", \"user\")";
        try {
            // Kết nối đến cơ sở dữ liệu
            connection = DatabaseConnectionTest.getConnection();

            ps = connection.prepareStatement(query);
            ps.setString(1,user);
            ps.setString(2,pass);
            ps.executeUpdate();
        }catch (Exception e){
        }
    }

    public static void main(String[] args) {
        CustomerDao dao = new CustomerDao();

        dao.sign_up("tien bip 2", "123456");
    }
}
