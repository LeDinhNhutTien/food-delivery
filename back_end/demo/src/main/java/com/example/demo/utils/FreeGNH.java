package com.example.demo.utils;

import okhttp3.*;
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
    private static final String SHOP_ID = "3860210";

    public static String calculateShippingFee(
                                              int toDistrictId, String toWardCode,
                                              int height, int length, int weight, int width) throws IOException {

        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json");

        // Construct JSON request body
        String jsonBody = "{\n" +
                "    \"from_district_id\":" + 1454 + ",\n" +
                "    \"from_ward_code\":\"" + "21211" + "\",\n" +
                "    \"service_id\":53320,\n" +
                "    \"service_type_id\":null,\n" +
                "    \"to_district_id\":" + toDistrictId + ",\n" +
                "    \"to_ward_code\":\"" + toWardCode + "\",\n" +
                "    \"height\":" + height + ",\n" +
                "    \"length\":" + length + ",\n" +
                "    \"weight\":" + weight + ",\n" +
                "    \"width\":" + width + ",\n" +
                "    \"insurance_value\":10000,\n" +
                "    \"cod_failed_amount\":2000,\n" +
                "    \"coupon\": null\n" +
                "}";

        RequestBody body = RequestBody.create(jsonBody, mediaType);

        Request request = new Request.Builder()
                .url(API_ENDPOINT)
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .addHeader("Token", API_TOKEN)
                .addHeader("ShopId", SHOP_ID)
                .build();

        Response response = client.newCall(request).execute();

        // Đảm bảo phản hồi thành công
        if (!response.isSuccessful()) {
            throw new IOException("Unexpected response code: " + response);
        }

        String jsonResponse = response.body().string();

        // Phân tích chuỗi JSON
        JSONObject jsonObject = new JSONObject(jsonResponse);

        // Trích xuất giá trị "total" từ đối tượng dữ liệu
        JSONObject dataObject = jsonObject.getJSONObject("data");
        String total = String.valueOf(dataObject.getInt("total"));

        return total;
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
    public static int getDistrictIdOfWard(String name, int huyen) {
        int result = -1;
        try {
            URL url = new URL("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Token",API_TOKEN);
            conn.setDoOutput(true);

            JSONObject jsonInput = new JSONObject();
            jsonInput.put("district_id", huyen);

            String jsonInputString = jsonInput.toString();

            conn.getOutputStream().write(jsonInputString.getBytes());

            BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
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
                if (district.getString("WardName").equals(name)) {
                    result =district.getInt("WardCode");
                    break;
                }
            }

            return  result;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }
    public static void main(String[] args) throws IOException {
        System.out.println(calculateShippingFee(1443, "20211",50, 50, 50, 50));
        System.out.println(getDistrictId("Quận 2"));
        System.out.println(getDistrictIdOfWard("Phường Thủ Thiêm",getDistrictId("Quận 2")));
    }
}
