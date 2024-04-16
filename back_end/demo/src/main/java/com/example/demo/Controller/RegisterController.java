package com.example.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.utils.MD5Utils;
import com.example.demo.dao.CustomerDao;

@Controller
public class RegisterController {
//    @RequestMapping()
//    public String display(){
//        return "/register";
//    }


//    @RequestMapping(params = "btnRegister")
    @PostMapping("/register")
    public String register(ModelMap model,
                           @RequestParam("username") String username,
                           @RequestParam("password") String password,
                           @RequestParam("rePassword") String rePassword){
        if (!password.equals(rePassword)){
            model.addAttribute("error", "Mật khẩu không khớp");
            return "error";
            //System.out.println("Register error");
        }
        try {
            // Save user to database or perform registration logic
            // userService.registerUser(username, password);
            String pass = MD5Utils.encrypt(password);
            CustomerDao dao = new CustomerDao();

            dao.sign_up(username, pass);
            return "redirect:/pages/login"; // Redirect to login page after successful registration
        } catch (Exception e) {
            model.addAttribute("error", "Đã xảy ra lỗi khi đăng ký");
            return "error"; // Show error page
        }
    }

}
