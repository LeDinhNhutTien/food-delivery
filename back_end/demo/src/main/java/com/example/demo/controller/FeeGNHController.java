package com.example.demo.controller;

import com.example.demo.utils.FreeGNH;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/feeGHN")
@CrossOrigin(origins = "http://localhost:3000")
public class FeeGNHController {

    @GetMapping()
    public ResponseEntity<Map<String, String>> calculateShippingFee(@RequestParam("toDistrict") int toDistrict,
                                                                    @RequestParam("toWard") String toWard) {
        try {

            System.out.println("a"+toDistrict + toWard);
            String total = FreeGNH.calculateShippingFee(
                    toDistrict, toWard,
                    50, 50, 50, 50);
            String time = FreeGNH.calculateShippingTime(toDistrict, toWard);

            // Tạo một đối tượng Map để chứa total và time
            Map<String, String> resultMap = new HashMap<>();
            resultMap.put("total", total);
            resultMap.put("time", time);

            return ResponseEntity.ok(resultMap);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error occurred while calculating shipping fee."));
        }
    }





}
