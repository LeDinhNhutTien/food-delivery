package com.example.demo.service;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.OrderDTO;
import com.example.demo.modal.Orders;
import com.example.demo.repository.HistoryOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HistoryOrdersService{

    private  HistoryOrdersRepository historyOrdersRepository;

    @Autowired
    public HistoryOrdersService(HistoryOrdersRepository historyOrdersRepository) {
        this.historyOrdersRepository = historyOrdersRepository;
    }

    public List<OrderDTO> getAllOrdersByCustomerId(Integer customerId) {
        List<Object[]> results = historyOrdersRepository.findAllOrdersByCustomerId(customerId);
        List<OrderDTO> orders = new ArrayList<>();
        for (Object[] result : results) {
            Integer orderID = (Integer) result[0];
            LocalDate creationDate = ((Date) result[3]).toLocalDate();
            String orderStatus = (String) result[4];
            String productNames = (String) result[1];
            String imageUrls = (String) result[2];
            orders.add(new OrderDTO(orderID, creationDate, orderStatus, productNames, imageUrls));
        }
        return orders;
    }

    public List<OrderDTO> getHistoryById(Integer orderID) {
        List<Object[]> results = historyOrdersRepository.findHistoryById(orderID);
        List<OrderDTO> orders = new ArrayList<>();
        for (Object[] result : results) {
            Integer id = (Integer) result[0];
            String productNames = (String) result[1];
            String imageUrls = (String) result[2];
            LocalDate creationDate = ((Date) result[3]).toLocalDate();
            String orderStatus = (String) result[4];
            String address = (String) result[5];
            double price = (Double) result[6];

            orders.add(new OrderDTO(id, creationDate, orderStatus, productNames, imageUrls,
                    price,address));
        }
        return orders;
    }

    public List<OrderDTO> getHistoryInformationById(Integer orderID) {
        List<Object[]> results = historyOrdersRepository.findHistoryInformationById(orderID);
        List<OrderDTO> orders = new ArrayList<>();
        for (Object[] result : results) {
            String name = (String) result[0];
            int quantity = (Integer) result[1];
            double price = (Double) result[2];
            String url = (String) result[3];


            orders.add(new OrderDTO(name, quantity, price, url));
        }
        return orders;
    }
    public boolean cancelOrder(int orderId) {
        int affectedRows = historyOrdersRepository.cancel(orderId);
        return affectedRows > 0;
    }

    // admin

    public List<OrderDTO> getAllOrdersAdmin() {
        List<Object[]> results = historyOrdersRepository.findAllOrdersAdmin();
        List<OrderDTO> orders = new ArrayList<>();
        for (Object[] result : results) {
            Integer orderID = (Integer) result[0];
            String productNames = (String) result[1];
            String customerName = (String) result[2];
            LocalDate creationDate = ((Date) result[3]).toLocalDate();
            double price = (double) result[4];
            String orderStatus = (String) result[5];
            String imageUrls = (String) result[6];
            String address = (String) result[7];

            orders.add(new OrderDTO(orderID, creationDate, orderStatus, productNames, imageUrls,
                    price, customerName, address));
        }
        return orders;
    }

    public CustomerDTO getCustomer(Integer orderId) {
        List<Object[]> results = historyOrdersRepository.findCustomerById(orderId);
        CustomerDTO customers = null;
        for (Object[] result : results) {
            String username = (String) result[0];
            String address = (String) result[1];
            String phone = (String) result[2];
            
            customers = new CustomerDTO(username, address, phone);
        }
        return customers;
    }

    public boolean updateHistory(int orderId, String state) {
        int updatedRows = historyOrdersRepository.update(orderId, state);
        return updatedRows > 0;
    }
}
