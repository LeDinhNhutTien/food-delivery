package com.example.demo.controller;

import com.example.demo.service.ShippingFeeService;
import com.example.demo.utils.FreeGNH;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feeGHN")
@CrossOrigin(origins = "http://localhost:3000")
public class FeeGNHController {

    @GetMapping()
    public ResponseEntity<String> calculateShippingFee(@RequestParam("toDistrict") String toDistrict,
                                                       @RequestParam("toWard") String toWard) {
        try {
            int toDistrictId = FreeGNH.getDistrictId(toDistrict);
            int toWardCode = FreeGNH.getDistrictIdOfWard(toWard, toDistrictId);
            System.out.println(toDistrictId+ " "+toWardCode);
            String total = FreeGNH.calculateShippingFee(
                    toDistrictId, String.valueOf(toWardCode),
                    50, 50, 50, 50);

            return ResponseEntity.ok(total);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while calculating shipping fee.");
        }
    }


}
