package com.workout.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String hello(Model model) {
        model.addAttribute("data", "hello!!");
        return "hello";
    }
}