package com.example.demo.utils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;

public class FreeGNH {
    private static final String API_ENDPOINT = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
    private static final String API_TOKEN = "274efaf3-b96d-11ed-bcba-eac62dba9bd9";
    private static final String SHOP_ID = "3581210";


    public static String calculateShippingFee(int fromDistrictId, String fromWardCode,
                                              int toDistrictId, String toWardCode,
                                              int height, int length, int weight, int width,
                                              int insuranceValue, int codFailedAmount) throws IOException {

        try {
            // Construct API request URL with query parameters
            String apiUrl = API_ENDPOINT + "?from_district_id=" + fromDistrictId +
                    "&from_ward_code=" + fromWardCode +
                    "&to_district_id=" + toDistrictId +
                    "&to_ward_code=" + toWardCode +
                    "&height=" + height +
                    "&length=" + length +
                    "&weight=" + weight +
                    "&width=" + width +
                    "&insurance_value=" + insuranceValue +
                    "&cod_failed_amount=" + codFailedAmount;

            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Token", API_TOKEN);

            BufferedReader rd = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
            String line;
            StringBuilder response = new StringBuilder();
            while ((line = rd.readLine()) != null) {
                response.append(line);
            }
            rd.close();

            // Parse response to get shipping fee
            JSONObject jsonObject = new JSONObject(response.toString());
            String shippingFee = jsonObject.getString("total");
            return shippingFee;
        } catch (IOException e) {
            e.printStackTrace();
            throw e; // Rethrow exception for handling at a higher level
        }
    }

    public static int getDistrictId(String name) {
        int result = -1;
        try {
            URL url = new URL("https://online-gateway.ghn.vn/shiip/public-api/master-data/district");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Token", API_TOKEN);
            BufferedReader rd = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
            String line;
            StringBuffer response = new StringBuffer();
            while ((line = rd.readLine()) != null) {
                response.append(line);
            }
            rd.close();
            // Phân tích response để lấy DistrictID
            JSONObject jsonObject = new JSONObject(response.toString());

            JSONArray data = jsonObject.getJSONArray("data");

            for (int i = 0; i < data.length(); i++) {
                JSONObject district = data.getJSONObject(i);
                if (district.getString("DistrictName").equals(name)) {
                    result = district.getInt("DistrictID");
                    break;
                }
            }
            return result;
        } catch (Exception e) {
            // TODO: handle exception
        }
        return -1;
    }
    public static void main(String[] args) throws IOException {
       System.out.println(calculateShippingFee(1454, "21211", 1452, "21012", 50, 50, 50, 50, 10000, 2000));
        System.out.println(getDistrictId("Quận Ba Đình"));
    }
}
